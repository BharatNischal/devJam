const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../../models/index");

// Deliverable Routes

//--route to generate empty deliverable and passing empty object to frontend
router.get("/topic/:topicId/createDeliverable",(req,res)=>{
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

router.get("/deliverable/:id",(req,res)=>{
  db.Deliverable.findById(req.params.id)
  .then(deliverable=>{
    res.json({data:deliverable,success:true});
  }).catch(err=>{
    res.json({msg:err.message,success:false});
  })
})
//--route to edit deliverable
router.put("/deliverable/:id",(req,res)=>{
  db.Deliverable.findByIdAndUpdate(req.params.id,req.body)
  .then(updatedDeliverable=>{
    res.json({data:updatedDeliverable,success:true});
  }).catch(err=>{
    res.json({msg:err.message,success:false});
  })

});

// Route to delete a deliverable from topic as well as database for given deliverableId
router.delete("/topic/:topicId/deliverable/:deliverableId",(req,res)=>{
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



module.exports=router;
