const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../../models/index");
const middleware = require("../../middleware");


// Topic Routes

// To get topic with given id and its contents
router.get("/content/topic/:id",middleware.isAdmin,(req,res)=>{
  db.Topic.findById(req.params.id).populate('items.video').populate('items.deliverable').exec((err,topic)=>{
      if(err){
        res.json({success:false,msg:err.message});
      }else{
        res.json({success:true,data:topic});
      }
  })
});

// To update the new sequence of video/deliverables inside a topic
router.put("/content/topic/:id",middleware.isAdmin,(req,res)=>{
    console.log(req.body);
    db.Topic.findByIdAndUpdate(req.params.id,req.body)
      .then(result=>{
        res.json({success:true});
      })
      .catch(err=>{
        res.json({success:false,msg:err.message});
      })
})

// To delete a topic and all its contents with given topicId
router.delete("/content/topic/:topicId",middleware.isAdmin,(req,res)=>{
    db.Topic.findById(req.params.topicId)
      .then(topic=>{
          const delVideo = topic.items.filter(topic=>topic.video).map(topic=>(topic.video._id));
          const delDeliverable = topic.items.filter(topic=>topic.deliverable).map(topic=>(topic.deliverable._id));
          console.log("video",delVideo,"deliverable",delDeliverable);
          Promise.all([db.Video.deleteMany({'_id':{'$in':delVideo}}),db.Deliverable.deleteMany({'_id':{'$in':delDeliverable}}),db.Topic.findByIdAndDelete(req.params.topicId)])
            .then(result=>{
              console.log("removed all");

              res.json({success:true});
            })
      })
      .catch(err=>{
        res.json({success:false,msg:err.message});
      })
})



module.exports = router;
