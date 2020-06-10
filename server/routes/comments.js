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
router.post('/video/:id/new',middleware.isAdmin,(req,res)=>{
  db.Comment.create({text:req.body.text,author:req.user._id})
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
  db.Comment.create({text:req.body.text,author:req.user._id})
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

// Delete a main comments
router.delete('/comment/:id',(req,res)=>{
  db.Comment.findById(req.params.id)
    .then(comment=>{
      Promise.all([db.Comment.deleteMany({'_id':{'$in':comment.subComments}}),db.Comment.findByIdAndDelete(req.params.id)])
        .then(result=>{
          res.json({success:true});
        })
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Delete a subComment from main comments
router.delete('/comment/:id/subComment/:subCommentId',(req,res)=>{
  db.Comment.findById(req.params.id)
    .then(comment=>{
        const ind = comment.subcomments.findIndex((subComment)=>(subComment._id == req.params.subCommentId));
        if(ind!=-1)
          comment.subcomments.splice(ind,0);
        comment.save();
        db.Comment.findByIdAndDelete(req.params.subCommentId)
          .then(subComment=>{
            res.json({success:true});
          })
    })
    .catch(err=>{
        res.json({success:false,msg:err.message});
    })
})
