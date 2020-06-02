const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const multer = require('multer');
const db=require("../../models/index");
const path   = require("path");
const middleware = require("../../middleware");


// Multer configurations
const storage = multer.diskStorage({
   filename: function(req, file, cb){
      cb(null,"FILE-" + Date.now() + path.extname(file.originalname));
   }
});

const uploadVideo = multer({storage:storage}).single("video");


// Cloud service to store videos
var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'bharatnischal',
  api_key: process.env.api ,
  api_secret: process.env.secret
});


// There are the Video Routes

// Video upload link to get the url from video
router.post("/topic/video",middleware.isAdmin,uploadVideo,(req,res)=>{
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


//Get details of video for a particular video
router.get("/topic/video/:id",(req,res)=>{
  db.Video.findById(req.params.id)
    .then(video=>{
      res.json({success:true,video});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Create a dummy video id ,add it to topic with given id and return the id
router.get("/topic/:topicId/createVideo",middleware.isAdmin,(req,res)=>{
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
router.put("/topic/video/:id",middleware.isAdmin,(req,res)=>{
  db.Video.findByIdAndUpdate(req.params.id,req.body.details)
    .then(updatedVideo=>{
      res.json({success:true,video:updatedVideo});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})


// Delte the video from both topic and database for given videoId
router.delete("/topic/:topicId/video/:videoId",middleware.isAdmin,(req,res)=>{
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


module.exports=router;
