const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../../models/index");
const middleware = require("../../middleware");


// Content Routes

// Get all the topics and their vieos/deliverables for the content page
router.get("/getContent",middleware.isAdmin,(req,res)=>{
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
router.get("/content/createTopic",middleware.isAdmin,(req,res)=>{
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
router.put("/content",middleware.isAdmin,(req,res)=>{
  db.Content.findOneAndUpdate({},{topics:req.body.data})
  .then(updatedContent=>{
    res.json({content:updatedContent,success:true});
  }).catch(err=>{
    res.json({msg:err.message,success:false});
  });
});

module.exports = router;
