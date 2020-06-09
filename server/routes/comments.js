const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../models/index");
const middleware = require("../middleware");

// To create a main Comment for deliverable
router.post('/deliverable/:id/new',middleware.isAdmin,(req,res)=>{
  db.Comment.create({text:req.body,author:req.user._id})
    .then(comment=>{
      db.Deliverable.findById(req.params.id)
        .then(deliverable=>{
          deliverable.comments.push(comment._id);
          deliverable.save();
          res.json({success:true,comment});
        })
        .catch(err=>{
          res.json({success:false,msg:err.message});
        })
    })
    .catch(err=>{
      res.json({success:false,msg:err.message})
    })
})

// To create a main Comment for video
router.post('/deliverable/:id/new',middleware.isAdmin,(req,res)=>{
  db.Comment.create({text:req.body,author:req.user._id})
    .then(comment=>{
      db.Video.findById(req.params.id)
        .then(video=>{
          video.comments.push(comment._id);
          video.save();
          res.json({success:true,comment});
        })
        .catch(err=>{
          res.json({success:false,msg:err.message});
        })
    })
    .catch(err=>{
      res.json({success:false,msg:err.message})
    })
})

// To create a Sub Comment
router.post('/comment/:id/new',middleware.isAdmin,(req,res)=>{
  db.Comment.create({text:req.body,author:req.user._id})
    .then(subComment=>{
      db.Comment.findById(req.params.id)
        .then(comment=>{
          comment.subComments.push(subComment._id);
          comment.save();
          res.json({success:true,subComment});
        })
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Delete a comments
router.delete('/comment/:id',(req,res)=>{
  db.Comment.RemoveById(req.params.id)
    .then(comment=>{
      res.json({success:true,comment});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})
