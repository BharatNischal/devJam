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
      cb(null,"FILE-" + Date.now() + path.extname(file.originalname));
   }
});
const upload = multer({
   storage: storage,
   limits:{fileSize: 10000000000}
}).single("image");

const uploadVideo = multer({storage:storage}).single("video");

// Cloud service to store images
var cloudinary = require('cloudinary').v2;
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
      cloudinary.uploader.upload(req.file.path, (err,result)=> {
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

//------------CONTENT START HERE-------------------------------
app.get("/getContent",(req,res)=>{
  db.Content.findOne({})
  .populate({
    path:"topics",
    model:"topic",
    populate:[{
      path:"items.deliverable",
      model:"deliverable"
    },{
      path:"items.video",
      model:"Video"
    }]
  })
  .then(cont=>{
    if(!cont){
      db.Content.create({})                       //adding topic in topics array
      .then(createdContent=>{
        return res.json({content:[],success:true});
      })
      .catch(err=>{
        console.log(err.message);
        return res.json({msg:err.message,success:false});
      })
    }else{
    return res.json({content:cont,success:true});
  }
  }).catch(err=>{
    res.json({msg:err.message,success:false});
  })
});

//Create Topic Route
app.get("/content/createTopic",(req,res)=>{
  db.Content.findOne({})
  .then(cont=>{
    if(!cont){
      //Empty Content array currently So, Creating one
      db.Topic.create({title:"",description:""})
      .then(topic=>{
          db.Content.create({topics:[topic._id]})                       //adding topic in topics array
          .then(createdContent=>{
            res.json({topicId:topic._id,success:true});
          }).catch(createErr=>{
            res.json({msg:createErr.message,success:false});
          })
      }).catch(topicErr=>{
        res.json({msg:topicErr.message,success:false});
      });
    }else{
      db.Topic.create({title:"",description:""})
      .then(topic=>{

        // pushing topic to topics array in existing content
        cont.topics.push(topic._id);
        cont.save();
        res.json({topicId:topic._id,success:true});

      }).catch(topicErr=>{
        res.json({msg:topicErr.message,success:false});
      })
    }
  }).catch(err=>{
    res.json({msg:err.message,success:false});
  })
});

//Update Content Sort
app.put("/content",(req,res)=>{
  db.Content.findOneAndUpdate({},{topics:req.body.data})
  .then(updatedContent=>{
    res.json({content:updatedContent,success:true});
  }).catch(err=>{
    res.json({msg:err.message,success:false});
  });
});


//------------CONTENT END HERE--------------------------------


//----TOPIC ROUTES START----------------------------

// To get topic with given id and its contents
app.get("/content/topic/:id",(req,res)=>{
  db.Topic.findById(req.params.id).populate('items.video').populate('items.deliverable').exec((err,topic)=>{
      if(err){
        res.json({success:false,msg:err.message});
      }else{
        res.json({success:true,data:topic});
      }
  })
});

// To update the new sequence of video/deliverables inside a topic
app.put("/content/topic/:id",(req,res)=>{
    console.log(req.body);
    db.Topic.findByIdAndUpdate(req.params.id,req.body)
      .then(result=>{
        res.json({success:true});
      })
      .catch(err=>{
        res.json({success:false,msg:err.message});
      })
})


//----DELEVIRABLE ROUTES START----------------------------

//--route to generate empty deliverable and passing empty object to frontend
app.get("/topic/:topicId/createDeliverable",(req,res)=>{
  db.Deliverable.create({})
  .then(deliverable=>{
    db.Topic.findById(req.params.topicId)
      .then(topic=>{
        topic.items.push({deliverable:deliverable._id});
        topic.save();
        res.json({success:true,deliverable});
      })
    }).catch(err=>{
      res.json({msg:err.message,success:false});
    })
});

app.get("/deliverable/:id",(req,res)=>{
  db.Deliverable.findById(req.params.id)
  .then(deliverable=>{
    res.json({data:deliverable,success:true});
  }).catch(err=>{
    res.json({msg:err.message,success:false});
  })
})
//--route to edit deliverable
app.put("/deliverable/:id",(req,res)=>{
  db.Deliverable.findByIdAndUpdate(req.params.id,req.body)
  .then(updatedDeliverable=>{
    res.json({data:updatedDeliverable,success:true});
  }).catch(err=>{
    res.json({msg:err.message,success:false});
  })

});

app.delete("/topic/:topicId/deliverable/:deliverableId",(req,res)=>{
    db.Topic.findById(req.params.topicId)
      .then(topic=>{
        const index = topic.items.findIndex((item)=>item.deliverable == req.params.deliverableId);
        if(index>-1){
          topic.items.splice(index,1);
          topic.save();
        }
        db.Deliverable.RemoveById(req.params.deliverableId)
          .then(video=>{
              res.json({success:true});
          })
      })
      .catch(err=>{
        console.log(err.message);
        res.json({success:false,msg:err.message});
      })
})

//------END OF DELIVERABLE ROUTES---------


// To get the current user
app.get("/curUser",(req,res)=>{
  res.json({user:req.user});
})

// Content Page routes

// Video upload link to get the url from video
app.post("/topic/video",uploadVideo,(req,res)=>{
  if(req.file){
    console.log("Video recieved",req.file);
    cloudinary.uploader.upload(req.file.path,{ resource_type: "video"}, (err,result)=> {
        if(err){
          return res.json({success:false,msg:err.message})
        }else{
          return res.json({result,success:true});
        }
    });
  }else{
    res.json({success:false,msg:"no file found"});
  }
})

//
app.get("/topic/video/:id",(req,res)=>{
  db.Video.findById(req.params.id)
    .then(video=>{
      res.json({success:true,video});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Create a dummy video id ,add it to topic with given id and return the id
app.get("/topic/:topicId/createVideo",(req,res)=>{
  db.Video.create({title:"",description:"",url:"",filename:""})
    .then(video=>{
      db.Topic.findById(req.params.topicId)
        .then(topic=>{
          topic.items.push({video:video._id});
          topic.save();
          res.json({success:true,video});
        })
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Update the video with given ID
app.put("/topic/video/:id",(req,res)=>{
  db.Video.findByIdAndUpdate(req.params.id,req.body.details)
    .then(updatedVideo=>{
      res.json({success:true,video:updatedVideo});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

app.delete("/topic/:topicId/video/:videoId",(req,res)=>{
    db.Topic.findById(req.params.topicId)
      .then(topic=>{
        const index = topic.items.findIndex((item)=>item.video == req.params.videoId);
        if(index>-1){
          topic.items.splice(index,1);
          topic.save();
        }
        db.Video.RemoveById(req.params.videoId)
          .then(video=>{
              res.json({success:true});
          })
      })
      .catch(err=>{
        console.log(err.message);
        res.json({success:false,msg:err.message});
      })
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
