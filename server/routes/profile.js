const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../models/index");
const multer = require('multer');
const path = require('path');
const middleware = require("../middleware");
const dotenv = require('dotenv');
dotenv.config();

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


// Cloud service to store images
var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api ,
  api_secret: process.env.secret
});




// Profile routes

// To get all the developer profiles
router.get("/Profiles", middleware.isAdmin ,(req,res)=>{
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
router.post("/createProfile",upload,(req,res)=>{
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
router.get("/profile/:id",(req,res)=>{
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
router.put("/editProfile/:id",upload,(req,res)=>{
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
router.post("/search",(req,res)=>{
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

// Function to make regular expression
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = router;
