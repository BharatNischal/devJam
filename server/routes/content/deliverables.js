const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../../models/index");
const middleware = require("../../middleware");

// Deliverable Routes

//--route to generate empty deliverable and passing empty object to frontend
router.get("/topic/:topicId/createDeliverable",middleware.isAdmin,async function(req,res){
  var submissions=[];
  await db.User.find({student:true}).then(users=>{
    submissions=users.map(u=>({userId:u._id}));
  }).catch(err=>{
    return res.json({msg:err.message,success:false});
  })

  db.Deliverable.create({submissions})
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

router.get("/deliverable/:id",middleware.isAdmin,(req,res)=>{
  db.Deliverable.findById(req.params.id)
  .then(deliverable=>{
    res.json({data:deliverable,success:true});
  }).catch(err=>{
    res.json({msg:err.message,success:false});
  })
})
//--route to edit deliverable
router.put("/deliverable/:id",middleware.isAdmin,(req,res)=>{
  db.Deliverable.findByIdAndUpdate(req.params.id,req.body)
  .then(updatedDeliverable=>{
    res.json({data:updatedDeliverable,success:true});
  }).catch(err=>{
    res.json({msg:err.message,success:false});
  })

});

// Route to delete a deliverable from topic as well as database for given deliverableId
router.delete("/topic/:topicId/deliverable/:deliverableId",middleware.isAdmin,(req,res)=>{
    db.Topic.findById(req.params.topicId)
      .then(topic=>{
        const index = topic.items.findIndex((item)=>item.deliverable == req.params.deliverableId);
        if(index>-1){
          topic.items.splice(index,1);
          topic.save();
        }
        db.Deliverable.findByIdAndDelete(req.params.deliverableId)
          .then(video=>{
              res.json({success:true});
          })
      })
      .catch(err=>{
        console.log(err.message);
        res.json({success:false,msg:err.message});
      })
});

//Route to get first 10 Deliverable with Submission IDs populated and user populatedfunction
router.post("/deliverables",middleware.isAdmin,function(req,res){
  console.log("deliverable before",req.body.date);
  const query={};
  if(req.body.date){
    query.dueDate={$lt:req.body.date};
  }
  db.Deliverable.find(query)
  .populate([{
    path:"submissions.submissionId",
    model:"submission"
  },{
    path:"submissions.userId",
    model:"User"
  }])
  .sort({dueDate:"desc"})
  .limit(10)
  .then(del=>{
    res.json({success:true,deliverables:del});
  }).catch(Err=>{
    console.log(Err);
    res.json({success:false,msg:Err.message});
  });
});

// Route to get details of a particular deliverable with submissions
router.get('/deliverableFull/:id',middleware.isAdmin,function (req,res) {
    db.Deliverable.findById(req.params.id)
    .populate([{
      path:"submissions.submissionId",
      model:"submission"
    },{
      path:"submissions.userId",
      model:"User"
    }])
      .then(del=>{
          res.json({success:true,deliverable:del});
      })
      .catch(err=>{
        res.json({success:false,msg:Err.message});
      })
})


module.exports=router;
