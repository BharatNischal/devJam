const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../models/index");
const middleware = require("../middleware");

// Add a new notification to a user
router.post('/notification/new/:userId',function (req,res) {
  db.User.findById(req.params.id)
    .then(user=>{
      if(user.student){
        db.Notification.create({req.body.notification})
          .then(notification=>{
            user.notifications.push(notification._id);
            res.json({success:true,notification});
          })
      }else{
        res.json({success:false,msg:"Feature coming soon for admins as well:)"})
      }
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
});

// Update the status of a notification from unread to read
router.update('/notification/:id',function (req,res) {
  db.Notification.findByIdandUpdate({read:true})
    .then(notification=>{
      res.json({success:true,notification});
    })
    .catch(err=>{
      res.json({success:true,msg:err.message});
    })
});


module.exports =router;
