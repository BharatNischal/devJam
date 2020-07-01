const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../models/index");
const middleware = require("../middleware");


// To get all the tests whether published or unpublished
router.get('/coding/questions/all',middleware.isAdmin,function (req,res) {
  db.CodingQuestion.find({})
    .then(questions=>{
      res.json({success:true,questions});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
});


// To get all the tests which are published
router.get('/coding/questions/published/all',middleware.isStudent,function (req,res) {
  db.CodingQuestion.find({status:"Published"})
    .then(questions=>{
      res.json({success:true,questions});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
});


// To get a specific question
router.get('/coding/question/:id',function (req,res) {
  db.CodingQuestion.findById(req.params.id).populate(['students.userId','students.submissionId'])
    then(question=>{
      res.json({success:true,question});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})


// Route to make a new coding question
router.post('/coding/question/new',function (req,res) {
  db.CodingQuestion.create({})
    .then(question=>{
      res.json({success:true,question});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})



// Route to update a question
router.put('/coding/question/:id',function (req,res) {
  db.CodingQuestion.findByIdAndUpdate(req.params.id,req.body.question)
    .then(question=>{
      res.json({success:true,question});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Route to change the status of a question
router.put('/coding/question/:id/status',function (req,res) {
  db.CodingQuestion.findByIdAndUpdate(req.params.id,{status:req.body.status})
    .then(question=>{
      res.json({success:true});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})


//Route to save a submission
router.get('/coding/question/:id/submission',middleware.isAdmin,function (req,res) {
  db.CodingSubmission.create({...req.body.submission,userId:req.user._id,testId:req.params.id})
    .then(submission=>{
      db.CodingQuestion.findById(req.params.id)
        .then(question=>{
          const index = question.students.findIndex(s=>s.userId.equals(req.user._id));
          if(index!=-1){
            question.students[index].submissions.push(submission._id);
          }else{
            question.students.push({
              userId:req.user._id,
              submissions:[submission._id]
            })
          }
          question.save();
          res.json({success:true,submission});
        })
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})



module.exports = router;
