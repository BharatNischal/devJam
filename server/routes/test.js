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
router.get('/test/new',function (req,res) {
  db.Test.create({})
    .then(test=>{
      res.json({success:true,test});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
});

// To get the details of a test
router.get('/test/:id',function (req,res) {
  db.Test.findById(req.params.id).populate('questions')
    .then(test=>{
      res.json({success:true,test});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Route to save a test as draft and publish based on data recieved
router.put('/test/:id',function (req,res) {
    // Save the questions
    let questionIds=[],promises=[];
    req.body.questions.forEach(question=>{
      promises.push(db.Question.findByIdAndUpdate(question._id,question));
      questionIds.push(question._id);
    })
    req.body.test.questions = questionIds;
    console.log(req.body.test);
    Promise.all([...promises,db.Test.findByIdAndUpdate(req.params.id,req.body.test)])
      .then(responses=>{
        res.json({success:true});
      })
      .catch(err=>{
        res.json({success:false,msg:err.message});
      })
});

// Route to give authorizaion to students for test after publish
router.put('/test/publish/:id',function (req,res) {
    db.Test.findById(req.params.id)
      .then(test=>{
        const newStudents = req.body.students.map(student=>({userId:student}));
        test.students = newStudents;
        test.save();
        res.json({success:true,test});
      })
      .catch(err=>{
        res.json({success:false,msg:err.message});
      })
})

// Route to close a test and evaluate marks for each submission
router.put('/test/close/:id',function (req,res) {
  db.Test.findByIdAndUpdate(req.params.id,{status:"Closed"})
    .then(test=>{
        test.students.forEach(student=>{
          if(!student.testSubmissionId){  //Not attempted
            continue;
          }
          let marks=0;
          test.questions.forEach((question,i)=>{
              if(question.mcq){
                          // -1 means not attempted
                if(Number(student.testSubmissionId.answers[i])>=0 && Number(student.testSubmissionId.answers[i])==question.correctOption-1){
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

// For Live test startup page
router.get('/livetest/:id',middleware.isStudent,function (req,res) {
  db.Test.findById(req.params.id)
    .then(test=>{
      const ind = test.students.findIndex(student=>student.userId==req.user._id);
      if(ind!=-1 && test.status=="Published"){
            res.json({success:true,test});
      }else{
        res.json({success:false,msg:"Either you are not Authorized or the test is not live"});
      }
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Create a new testSubmission when a user starts a test
router.get('/test/:id/testSubmission/new',function (req,res) {
  // Checking if the student is authorized and that test is open
  db.Test.findById(req.params.id)
    .then(test=>{
      const ind = test.students.findIndex(student=>student.userId==req.user._id);
      if(ind!=-1){
        db.TestSubmission.create({userId:req.user._id,testId:req.params.id})
          .then(testSubmission=>{
                test.students[ind].testSubmissionId = testSubmission._id;
                test.save();
              // Store maxMarks for a test
              testSubmission.maxMarks = test.questions.length;
              testSubmission.save();
              res.json({success:true,testSubmission});
            })
      }else{
        res.json({success:false,msg:"Not Authorized"});
      }
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// To save the test Progress. **Send the answers array in the correct format
router.put('/testsubmission/:id',function (req,res) {
  db.TestSubmission.findByIdAndUpdate(req.params.id,{answers:req.body.answers})
    .then(testSubmission=>{
      res.json({success:true,testSubmission});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
});

// Submit the test
router.put('/testSubmission/:id/complete',function (req,res) {
  db.TestSubmission.findByIdAndUpdate(req.params.id,{onTime:true})
  .then(testSubmission=>{
    res.json({success:true,testSubmission});
  })
  .catch(err=>{
    res.json({success:false,msg:err.message});
  })
})


// To get all the tests that the student has given
router.get('/allTests',function (req,res) {
    db.TestSubmission.find({user:req.user._id}).populate('testId')
      .then(testSubmissions=>{
        res.json({success:true,testSubmissions});
      })
      .catch(err=>{
        res.json({success:false,msg:err.message});
      })
})

module.exports =router;
