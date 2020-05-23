const          express = require('express'),
              passport = require("passport"),
         localStrategy = require("passport-local"),
 passportLocalMongoose = require("passport-local-mongoose"),
                    db = require("./models/index"),
               session = require("express-session"),
            bodyParser = require("body-parser"),
                  cors = require("cors"),
                   app = express(),
                multer = require("multer"),
           mailFunction = require("./mail"),
                 async = require("async"),
                crypto = require("crypto"),
                path   = require("path");



// Setting Up Dotenv for .env files environment variable
const dotenv = require('dotenv');
dotenv.config();

// Session setup
app.use(session({
  secret:"JS is cool",
  resave:false,
  saveUninitialized:false
}));

//passport Auth setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

// Cors setup
app.use(cors({
  origin:['http://localhost:3000'],
  methods:['GET','POST','PUT','DELETE'],
  credentials: true // enable set cookie
}));

// bodyParser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//Muler upload

const storage = multer.diskStorage({
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});
const upload = multer({
   storage: storage,
   limits:{fileSize: 10000000000}
}).single("image");


// Cloud service to store images
var cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'bharatnischal',
  api_key: process.env.api ,
  api_secret: process.env.secret
});



// Profile Routes

// To get all the developer profiles
app.get("/Profiles", isAdmin ,(req,res)=>{
    if(req.user){
      db.Developer.find({})
        .then(profiles=>{
            res.json({profiles:profiles,success:true});
        })
        .catch(err=>{
          console.log("error",err);
          res.send({success:false,msg:err.message})
        })
    }else{
      res.json({err:"not logged in",success:false});
    }
});


// To create new profile
app.post("/createProfile",upload,(req,res)=>{
  if(req.user){
    console.log("file recieved",req.file,"body",req.body);
    const profile = req.body;
    for(key in profile){
      if(profile[key]==="undefined"){
        delete profile[key];
      }else{

        profile[key]=JSON.parse(profile[key]);
      }
    }

    if(req.file){
      cloudinary.uploader.upload(req.file.path, (result)=> {
        db.Developer.create({...profile,profilePic:result.secure_url})
          .then(newProfile=>{
              res.json({...newProfile,success:true});
          })
          .catch(err=>{
            console.log("error",err);
            res.send({success:false,msg:err.message});
          })
      });
    }else{
      db.Developer.create(profile)
        .then(newProfile=>{
            res.json({...newProfile,success:true});
        })
        .catch(err=>{
          console.log("error",err);
          res.send({success:false,msg:err.message});
        })
    }
  }else{
    res.json({err:"not logged in",success:false});
  }
});


// To get profile of the developer
app.get("/profile/:id",(req,res)=>{
  db.Developer.findById(req.params.id)
    .then(profile=>{
        res.json({data:profile,success:true});
    })
    .catch(err=>{
      console.log("error",err);
      res.json({success:false,msg:err.message});
    })
});

// To update profile of the developer
app.put("/editProfile/:id",upload,(req,res)=>{
    if(req.user){
      console.log("file recieved",req.file,"body",req.body);
      const profile = req.body;
      for(key in profile){
        if(profile[key]==="undefined"){
          delete profile[key];
        }else{

          profile[key]=JSON.parse(profile[key]);
        }
      }
      console.log("REACHED INSIDE PUT");
      console.log(profile);
      if(req.file){
        cloudinary.uploader.upload(req.file.path, (result)=> {
          db.Developer.findByIdAndUpdate(req.params.id,{...profile,profilePic:result.secure_url})
            .then(updatedProfile=>{
              res.json({...updatedProfile,success:true});
            })
            .catch(err=>{
              console.log("error",err);
              res.json({success:false,msg:err.message});
            })
        });
      }else{
        db.Developer.findByIdAndUpdate(req.params.id,profile)
          .then(updatedProfile=>{
            console.log(updatedProfile);
            res.json({...updatedProfile,success:true});
          })
          .catch(err=>{
            console.log("error",err);
            res.json({success:false,msg:err.message});
          })
      }
    }else{
      res.json({err:"not logged in",success:false});
    }
});


// Search Profiles based on names
app.post("/search",(req,res)=>{
  const {name} = req.body;
  const regex = new RegExp(escapeRegex(name), 'gi');
  db.Developer.find({ $or: [ {'personalInfo.firstName': regex }, {'personalInfo.lastName':  regex} ] })
  .then(profiles=>{
      res.json({profiles:profiles,success:true});
  })
  .catch(err=>{
    console.log("error",err);
    res.send({success:false,msg:err.message})
  })
})




//Authentication routes

app.post("/register",isSuperAdmin,(req,res)=>{
    console.log("user",req.body);
    db.User.register(new db.User({username:req.body.username}),req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            res.json({err:err.message,success:false});
        }
        res.json({
            success:true,
            user:user,
        });
    });
});

app.get("/logout",(req,res)=>{
  req.logout();
  res.json({msg:"You log out successfully!!!"});
});

app.post("/login",passport.authenticate("local",{
      failureRedirect:"/api/err"
  }),(req,res)=>{
      res.json({
        success:true,
        msg:"You logged in successfully with username "+req.user.username,
        user:req.user
      });
});


// To get all the admins for super-admin Dashboard
app.get("/admins",(req,res)=>{
  db.User.find({})
    .then(admins=>{
      res.json(admins);
    })
    .catch(err=>{
      console.log("error",err);
      res.json({success:false,msg:err.message});
    })
})

// forgot password
app.post('/forget', function(req, res, next) {
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

      mailFunction(msg,(err,info)=>{
        done(err,'done');
      });

    }
  ], function(err) {
    if (err)     res.json({msg:err.message,success:false});
    res.json({success:true,msg:"Mail has been Sent"});
  });
});

app.post('/reset/:token', function(req, res) {
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
      mailFunction(msg,(err,info)=>{
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
app.get("/curUser",(req,res)=>{
  res.json({user:req.user});
})


app.get("/api/err",(req,res)=>{
  res.json({success:false});
});

// Function to make regular expression
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(__dirname+'/../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..' , 'client', 'build', 'index.html'));
  });
// }

const port = process.env.PORT || 8080;
app.listen(port,()=>{
  console.log("Listening on port ",port);
});


// MIDDLEWARE DEFINATIONS
function isAdmin(req,res,next){
  if(req.user){
    console.log("MIDDLEWARE logined",req.user);
    return next();
  }
  return res.json({success:false,err:"NOt Logined From Middleware"});
}

function isSuperAdmin(req,res,next){
  if(req.user&&req.user.superAdmin){
    console.log("MIDDLEWARE logined",req.user);
    return next();
  }
  return res.json({success:false,err:"NOt Logined From Middleware"});
}
