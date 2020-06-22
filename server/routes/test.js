const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../models/index");
const middleware = require("../middleware");


// Route to get all the tests
router.get('/tests',function (req,res) {
  db.Test.find({})
    .then(tests=>{
      res.json({success:true,tests});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
});

// Route to create new test
router.get('/test/new'function (req,res) {
  db.Test.create({})
    .then(test=>{
      res.json({success:true,test});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
});


// Route to save a test as draft or publish it depending upon data sent from frontend
router.post('/publish/:id',function (req,res) {
    // Handles publish
    if(req.body.test.students){
      const students = req.body.test.students;
      req.body.test.students.userId = students;
      req.body.test.state = "Publish";
    }else{
      req.body.test.state = "Draft";
    }
    // Create all the questions in DB and save their order


    db.Test.findByIdandUpdate(req.params.id,req.body.test)
      .then(test=>{
        res.json({success:true});
      })
      .catch(err=>{
        res.json({success:false,msg:err.message});
      })
});

// Route to close a test and evaluate marks for each submission
router.get('/test/close/:id',function (req,res) {
  db.Test.findByIdandUpdate(req.params.id,{state:"Closed"})
    .then(test=?{
        test.students.forEach(student=>{
          if(!student.testSubmissionId){  //Not attempted
            continue;
          }
          let marks=0;
          test.questions.forEach((question,i)=>{
              if(question.mcq){
                          // -1 means not attempted
                if(Number(student.testSubmissionId.answers[i])>=0 && Number(student.testSubmissionId.answers[i])==question.correctOption){
                  marks++;
                }
              }else{
                marks++;
              }
          })
          student.testSubmissionId.marks = marks;
        })
        test.save();
        res.json({success:true});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
});

// Create a new testSubmission when a user starts a test
router.get('/test/:id/testSubmission/new',function (req,res) {
  db.TestSubmission.create({userId:req.user._id,testId:req.params.id})
    .then(testSubmission=>{
      // Save the testSubmission to the test for given student
      db.Test.findById(req.params.id)
        .then(test=>{
          const ind = test.students.findIndex(student=>student.userId==req.user._id);
          if(ind!=-1){
            test.students.testSubmissionId = testSubmission._id;
            test.save();
          }
          // Store maxMarks for a test
          testSubmission.maxMarks = test.questions.length;
          testSubmission.save();
          res.json({success:true,testSubmission});
        })
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// To save the test Progress. **Send the answers array in the correct format
router.post('/testsubmission/:id',function (req,res) {
  db.TestSubmission.findByIdandUpdate(req.params.id,{answers:req.body.answers})
    .then(testSubmission=>{
      res.json({success:true,testSubmission});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

module.exports =router;
