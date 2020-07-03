const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../models/index");
const middleware = require("../middleware");
const axios = require("axios");


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

// Route to make a new coding question
router.get('/coding/question/new',middleware.isAdmin,function (req,res) {
  db.CodingQuestion.create({})
    .then(question=>{
      res.json({success:true,question});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})


// To get a specific question
router.get('/coding/question/:id',function (req,res) {
  db.CodingQuestion.findById(req.params.id).populate(['students.userId','students.submissionId'])
    .then(question=>{
      res.json({success:true,question});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})




// Route to update a question
router.put('/coding/question/:id',middleware.isAdmin,function (req,res) {
  db.CodingQuestion.findByIdAndUpdate(req.params.id,req.body.question)
    .then(question=>{
      res.json({success:true,question});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Route to change the status of a question
router.put('/coding/question/:id/status',middleware.isAdmin,function (req,res) {
  db.CodingQuestion.findByIdAndUpdate(req.params.id,{status:req.body.status})
    .then(question=>{
      res.json({success:true});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Router to get a question along with student data
router.get('/taketest/:id',function (req,res) {
  db.CodingQuestion.findById(req.params.id)
    .populate(['students.userId','students.submissions'])
    .then(question=>{
        const index = question.students.findIndex(s=>s.userId.equals(req.user._id));
        if(index!=-1){
          res.json({success:true,question,userIndex:index});
        }else{
          question.students.push({userId:req.user._id});
          question.save();
          res.json({success:true,question,userIndex:question.students.length})
        }
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Router to start the timer
router.get('/codingtest/:id/timer',middleware.isStudent,function (req,res) {
  db.CodingQuestion.findById(req.params.id)
    .populate(['students.userId','students.submissions'])
    .then(question=>{
      const index = question.students.findIndex(s=>s.userId.equals(req.user._id));
      if(index!=-1){
        question.students[index].startTime = new Date();
        question.save();
        res.json({success:true});
      }
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Route to submit code and get tokens
router.post('/coding/question/:id/submission',function (req,res){
    console.log(req.body);
    db.CodingQuestion.findById(req.params.id)
      .then(question=>{

        var postPromise=[];
        var tests=[]
        if(req.body.type=="run"){
          tests = question.testCases.filter(tc=>!tc.hidden)
        }else{
          tests = question.testCases;
        }

        tests.forEach(testCase => {
          console.log(testCase);
          postPromise.push(
            axios({
              "method":"POST",
              "url":"https://judge0.p.rapidapi.com/submissions",
              "headers":{
              "content-type":"application/json",
              "x-rapidapi-host":"judge0.p.rapidapi.com",
              "x-rapidapi-key":"645aff6160msh4ef1fb0de5086abp1d2e75jsn3f5f6f56c58a",
              "accept":"application/json",
              "useQueryString":true
              },
              "data":{
                "language_id":req.body.lang,
                "source_code":req.body.sourceCode,
              "stdin":testCase.input,
              "expected_output":testCase.output,
              "cpu_time_limit": question.timeLimit+0.0
              }
              })
          )
        });
        Promise.all(postPromise)
          .then(responses=>{
            res.json({success:true,responses:responses.map(res=>res.data)})
          })
          .catch(err=>{
            console.log(err.message);
            res.json({success:false,msg:err.message});
          })
      })
      .catch(err=>{
        res.json({success:false,msg:err.message});
      })
})

//Route to create a submission when a student submit a question
router.post('/coding/question/:id/evaluation',middleware.isAdmin,function (req,res) {
  // Save in database (code and languageCode)
  if(req.body.type=="run"){
    let getPromise=[];
    req.body.responses.forEach((response,i)=>{
      if(response.token){
        console.log(response.token);
          getPromise.push(
            axios({
              "method":"GET",
              "url":`https://judge0.p.rapidapi.com/submissions/${response.token}`,
              "headers":{
              "content-type":"application/octet-stream",
              "x-rapidapi-host":"judge0.p.rapidapi.com",
              "x-rapidapi-key":"645aff6160msh4ef1fb0de5086abp1d2e75jsn3f5f6f56c58a",
              "useQueryString":true
              }
              })
          )
      }
      if(i==req.body.responses.length-1){
        var results=[];

        Promise.all(getPromise)
        .then(responses=>{
            res.json({success:true,results:responses.map(resp=>resp.data)})
        })
        .catch(err=>{
          res.json({success:false,msg:err.message});
        })
      }
    })
  }else{
  db.CodingSubmission.create({sourceCode:req.body.sourceCode,languageCode:req.body.lang,userId:req.user._id,testId:req.params.id})
    .then(submission=>{
      db.CodingQuestion.findById(req.params.id)
        .then(question=>{

          // Evaluate marks
          getPromise = [];
          req.body.responses.forEach((response,i)=>{
            if(response.token){
              console.log(response.token);
            getPromise.push(
              axios({
                "method":"GET",
                "url":`https://judge0.p.rapidapi.com/submissions/${response.token}`,
                "headers":{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"judge0.p.rapidapi.com",
                "x-rapidapi-key":"645aff6160msh4ef1fb0de5086abp1d2e75jsn3f5f6f56c58a",
                "useQueryString":true
                }
                })
            )
            }
            if(i==req.body.responses.length-1){
              var results=[];

              Promise.all(getPromise)
              .then(responses=>{
                  responses.forEach((response,i)=>{
                    results.push(response.data);
                    if(i==responses.length-1){

                      const index = question.students.findIndex(s=>s.userId.equals(req.user._id));
                      if(index!=-1){
                        question.students[index].submissions.push(submission._id);
                      }else{
                        question.students.push({
                          userId:req.user._id,
                          submissions:[submission._id]
                        })
                      }
                      let correct = 0;
                      const testCases = results.map(r=>{
                        if(r.status.id==3){
                          correct++;
                        }
                        return r.status.id==3;
                      });
                      const marks = ((correct/question.testCases.length)*question.points).toFixed(2);
                      const TestCases = testCases;
                      console.log("marks",marks);
                      question.students[index].maxMarks = Math.max(marks,question.students[index].maxMarks?question.students[index].maxMarks:0)
                      question.save();
                      // Save marks
                      console.log(submission);
                      db.CodingSubmission.findByIdAndUpdate(submission._id,{marks:marks,TestCases:TestCases})
                        .then(sub=>{
                            res.json({success:true,results});
                        })
                        .catch(err=>{
                          res.json({success:false,msg:err.message});
                        })
                    }
                  });
              })
              .catch(err=>{
                res.json({success:false,msg:err.message});
              })
            }
          })


        })
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
  }
})


router.post('/submit/custom/testcase',function (req,res) {
  console.log("input",req.body.input);
  axios({
    "method":"POST",
    "url":"https://judge0.p.rapidapi.com/submissions",
    "headers":{
    "content-type":"application/json",
    "x-rapidapi-host":"judge0.p.rapidapi.com",
    "x-rapidapi-key":"645aff6160msh4ef1fb0de5086abp1d2e75jsn3f5f6f56c58a",
    "accept":"application/json",
    "useQueryString":true
    },
    "data":{
      "language_id":req.body.lang,
      "source_code":req.body.sourceCode,
      "stdin":req.body.input,
    }
    })
    .then(response=>{
      setTimeout(()=>{
        axios({
          "method":"GET",
          "url":`https://judge0.p.rapidapi.com/submissions/${response.data.token}`,
          "headers":{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"judge0.p.rapidapi.com",
          "x-rapidapi-key":"645aff6160msh4ef1fb0de5086abp1d2e75jsn3f5f6f56c58a",
          "useQueryString":true
          }
          })
          .then(result=>{
            res.json({success:true,result:result.data});
          })
          .catch(err=>{
            res.json({success:false,msg:err.message});
          })
      },3000)
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

router.post("/submitcodingquestion/:quesId",function(req,res){
    const testCases=req.body.testCases.map(tc=>({input:tc.input,output:tc.output}));
    var postPromise=[];

    testCases.forEach(testCase => {
      postPromise.push(
        axios({
          "method":"POST",
          "url":"https://judge0.p.rapidapi.com/submissions",
          "headers":{
          "content-type":"application/json",
          "x-rapidapi-host":"judge0.p.rapidapi.com",
          "x-rapidapi-key":"645aff6160msh4ef1fb0de5086abp1d2e75jsn3f5f6f56c58a",
          "accept":"application/json",
          "useQueryString":true
          },
          "data":{
            "language_id":req.body.lang,
            "source_code":req.body.sourceCode,
          "stdin":testCase.input,
          "expected_output":testCase.output
          }
          })
      )
    });

    var getPromise=[];

    Promise.all(postPromise)
    .then(responses=>{
      setTimeout(()=>{
        responses.forEach((response,i)=>{
          if(response.data.token){
            console.log(response.data.token);
          getPromise.push(
            axios({
              "method":"GET",
              "url":`https://judge0.p.rapidapi.com/submissions/${response.data.token}`,
              "headers":{
              "content-type":"application/octet-stream",
              "x-rapidapi-host":"judge0.p.rapidapi.com",
              "x-rapidapi-key":"645aff6160msh4ef1fb0de5086abp1d2e75jsn3f5f6f56c58a",
              "useQueryString":true
              }
              })
          )
          }
          if(i==responses.length-1){
            var results=[];
            Promise.all(getPromise)
            .then(responses=>{
                responses.forEach((response,i)=>{
                  results.push(response.data);
                  if(i==responses.length-1){
                    res.json({success:true,results:results});
                  }
                });
            })
          }
        })
      },5000);
    }).catch(err=>{
      res.json({success:false,msg:err.message});
      console.log("POST Promise",err);
    });

});

router.get('/leaderboard/question/:id',function (req,res) {
  db.CodingQuestion.findById(req.params.id)
    .populate('students.userId')
    .then(question=>{
      const students = question.students.slice();
      students.sort(function (first,second) {
        return second.maxMarks?second.maxMarks:0-first.maxMarks?first.maxMarks:0
      })
      res.json({success:true,students});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

router.get('/submissions/question/:id',function (req,res) {
  db.CodingQuestion.findById(req.params.id)
    .populate('students.submissions')
    .then(question=>{
      const user = question.students.filter(st=>req.user._id.equals(st.userId))
      res.json({success:true,submissions:user[0].submissions?user[0].submissions:[]});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})


module.exports = router;
