const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../models/index");
const mailFunction = require("../mail");
const async = require("async");
const crypto = require("crypto");
const path   = require("path");
const middleware = require("../middleware");
const passport = require("passport");

// Auth Routes


// Register new admins
router.post("/register",(req,res)=>{
    console.log("user",req.body);
    db.User.register(new db.User({username:req.body.username,student:req.body.student?true:false,name:req.body.name}),req.body.password,async (err,user)=>{
        if(err){
            console.log(err);
            return res.json({err:err.message,success:false});
        }
        if(req.body.student){
          await db.Deliverable.find({})
          .then(foundDeliverables=>{
            foundDeliverables.forEach(foundDel=>{
              foundDel.submissions.push({userId:user._id});
              foundDel.save();
            })
          }).catch(Err=>{
            return res.json({msg:Err.message,success:false});
          })
          passport.authenticate("local")(req,res,()=>{
            res.json({success:true,user:user});
          });
        }else{
          res.json({success:true,user:user});
        }
    });
});

// Logut
router.get("/logout",(req,res)=>{
  req.logout();
  res.json({msg:"You log out successfully!!!"});
});

// Login
router.post("/login",passport.authenticate("local",{
      failureRedirect:"/api/err"
  }),(req,res)=>{
      res.redirect('/curUser');
});


// To get all the admins for super-admin Dashboard
router.get("/admins",middleware.isSuperAdmin,(req,res)=>{
  db.User.find({student:false})
    .then(admins=>{
      res.json(admins);
    })
    .catch(err=>{
      console.log("error",err);
      res.json({success:false,msg:err.message});
    })
})

// forgot password
router.post('/forget', function(req, res, next) {
  console.log("Inside forgot route");
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      db.User.findOne({ username: req.body.username }, function(err, user) {
        if (!user) {
          res.json({msg:"No account with that email address exists.",success:false});
        }
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var fullUrl = `${req.protocol}://${req.get('host')}/reset/${token}`;
      const msg = {
        from: '"ProfileGenerator" <manjotsingh16july@gmail.com>', // sender address (who sends)
        to: user.username, // list of receivers (who receives)
        subject: 'Password Reset', // Subject line
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n\n ${fullUrl} \n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };

      mailFunction.mailFunction(msg,(err,info)=>{
        done(err,'done');
      });

    }
  ], function(err) {
    if (err)     res.json({msg:err.message,success:false});
    res.json({success:true,msg:"Mail has been Sent"});
  });
});

router.post("/changeNotificationStatus",function(req,res){
  db.User.findById(req.user._id)
  .then(async (user)=>{
    const notifications=req.body.user.notifications.map(n=>({notification:n.notification._id,read:n.read,_id:n._id}));
    user.notifications=notifications;
    await user.save();
    res.json({success:true,user:user});
  }).catch(err=>{
    res.json({success:false,msg:err.message});
    console.log(err);
  })
})

// Reset password
router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      db.User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          return res.json({msg:'Password reset token is invalid or has expired.'});
        }
          user.setPassword(req.body.password, function(err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          })
      });
    },
    function(user, done) {
      const msg = {
        from: '"ProfileGenerator" <manjotsingh16july@gmail.com>', // sender address (who sends)
        to: user.username, // list of receivers (who receives)
        subject: 'Your password has been changed', // Subject line
        text: `This is a confirmation that the password for your account ${user.username} has just been changed. `
      };
      mailFunction.mailFunction(msg,(err,info)=>{
        done(err,'done');
      });
      res.json({msg:`Success! Your password for username has been changed.`,success:true});
    }
  ], function(err) {
    if(err){return res.json({msg:err.message,success:false});}
    res.json({msg:`Success! Your password for username has been changed.`,success:true});
  });
});

// To get the current user
router.get("/curUser",(req,res)=>{

  res.json({success:true,user:req.user});
})

router.get("/api/err",(req,res)=>{
  res.json({success:false});
});

router.get("/students",function(req,res){
  db.User.find({student:true})
  .then(students=>{
    res.json({success:true,students:students});
  }).catch(Err=>{
    res.json({success:false,msg:err.message});
  })
});

module.exports = router;
