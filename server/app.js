const          express = require('express'),
              passport = require("passport"),
         localStrategy = require("passport-local"),
 passportLocalMongoose = require("passport-local-mongoose"),
                    db = require("./models/index"),
               session = require("express-session"),
            bodyParser = require("body-parser"),
                  cors = require("cors"),
                   app = express(),
                multer = require("multer");
                //  async = require("async"),
                // crypto = require("crypto"),
                // path   = require("path");


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
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});



// Profile Routes

// To get all the developer profiles
app.get("/profiles",(req,res)=>{
    db.Developer.find({})
      .then(profiles=>{
          res.json(profiles);
      })
      .catch(err=>{
        console.log("error",err);
        res.send({success:false,msg:err.message})
      })
});


// To create new profile
app.post("/createProfile",upload,(req,res)=>{

  console.log("file recieved",req.file,"body",req.body);
  const profile = req.body;
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
});


// To get profile of the developer
app.get("/profile/:id",(req,res)=>{
  db.Developer.findById(req.params.id)
    .then(profile=>{
        res.json({...profile,success:true});
    })
    .catch(err=>{
      console.log("error",err);
      res.json({success:false,msg:err.message});
    })
});

// To update profile of the developer
app.put("/editProfile/:id",(req,res)=>{
    const profile = req.body;
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
          res.json({...updatedProfile,success:true});
        })
        .catch(err=>{
          console.log("error",err);
          res.json({success:false,msg:err.message});
        })
    }
});



//Authentication routes

app.post("/register",(req,res)=>{
    console.log("user",req.body);
    db.User.register(new db.User({username:req.body.username}),req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            res.json({err:err.message,success:"false"});
        }
        passport.authenticate("local")(req,res,()=>{
            res.json({
                success:"true",
                user:req.user,
            });
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
        success:"true",
        msg:"You logged in successfully with username "+req.user.username,
        user:req.user
      });
});

// To get the current user
app.get("/curUser",(req,res)=>{
  res.json({user:req.user});
})


app.get("/api/err",(req,res)=>{
  res.json({success:"false"});
});



app.listen(8080,()=>{
  console.log("Listening on port",8080);
})
