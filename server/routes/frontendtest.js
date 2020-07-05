const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../models/index");
const middleware = require("../middleware");
const nodeHtmlToImage = require('node-html-to-image');
const deepai = require('deepai');
const fs= require("fs");
deepai.setApiKey(process.env.deepai);
var https = require('https');
const axios = require('axios');
const multer = require('multer');

var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api ,
  api_secret: process.env.secret
});

const storage = multer.diskStorage({
   filename: function(req, file, cb){
      cb(null,"FILE-" + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limits:{fileSize: 10000000000}
}).single("image");


// To get all the tests whether published or unpublished
router.get('/frontend/questions/all',function (req,res) {
  db.FrontendQuestion.find({})
    .then(questions=>{
      res.json({success:true,questions});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
});


// To get all the tests which are published
router.get('/frontend/questions/published/all',middleware.isStudent,function (req,res) {
  db.FrontendQuestion.find({status:"Published"})
    .then(questions=>{
      res.json({success:true,questions});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
});

// Route to make a new frontend question
router.get('/frontend/question/new',middleware.isAdmin,function (req,res) {
  db.FrontendQuestion.create({})
    .then(question=>{
      res.json({success:true,question});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})


// To get a specific question
router.get('/frontend/question/:id',function (req,res) {
  db.FrontendQuestion.findById(req.params.id)
    .then(question=>{
      res.json({success:true,question});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})




// Route to update a question
router.put('/frontend/question/:id',middleware.isAdmin,function (req,res) {
  db.FrontendQuestion.findByIdAndUpdate(req.params.id,req.body.question)
    .then(question=>{
      res.json({success:true,question});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Route to change the status of a question
router.put('/frontend/question/:id/status',middleware.isAdmin,function (req,res) {
  db.FrontendQuestion.findByIdAndUpdate(req.params.id,{status:req.body.status})
    .then(question=>{
      res.json({success:true});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Router to get a question when user starts a question
router.get('/frontend/taketest/:id',function (req,res) {
  db.FrontendQuestion.findById(req.params.id)
    .then(question=>{
        const index = question.students.findIndex(s=>s.userId.equals(req.user._id));
        if(index!=-1){
          res.json({success:true,question,userIndex:index});
        }else{
          question.students.push({userId:req.user._id});
          question.save();
          res.json({success:true,question,userIndex:question.students.length-1})
        }
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})
// new Date().toLocaleTimeString()
// Router to start the timer
router.get('/frontendtest/:id/timer',middleware.isStudent,function (req,res) {
  db.FrontendQuestion.findById(req.params.id)
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


//Route to create a submission when a student submit a question
router.post('/frontend/question/:id/evaluation',middleware.isAdmin,function (req,res) {

  db.FrontendSubmission.create({html:req.body.html,css:req.body.css,js:req.body.js,userId:req.user._id,testId:req.params.id})
    .then(submission=>{
      db.FrontendQuestion.findById(req.params.id)
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


          // Evaluation
          const imgName=new Date().getTime();
            nodeHtmlToImage({
              output: `./${imgName}.png`,
              html: `<html>
              <head>
                <style>
                ${req.body.css}
                </style>
              </head>
              <body>
                ${req.body.html}
              </body>
              </html>`,
              puppeteerArgs:{
                args:['--no-sandbox','--disable-setuid-sandbox',]
              }
            })
            .then(temp=>{

              cloudinary.uploader.upload(`./${imgName}.png`,
                function(error, result) {
                  if(error){
                    res.json({success:false,msg:error.message});
                  }else{

                    deepai.callStandardApi("image-similarity", {
                            image1: question.sampleUrl,
                            image2: result.secure_url
                    })
                    .then(resp=>{
                      console.log(resp);

                      const marks = resp.output.distance>40?0:(((40-resp.output.distance)/40)*question.points).toFixed(2);
                      console.log("marks",marks);
                      question.students[index].maxMarks = Math.max(marks,question.students[index].maxMarks?question.students[index].maxMarks:0)
                      question.save();
                      db.FrontendSubmission.findByIdAndUpdate(submission._id,{marks:marks})
                        .then(sub=>{
                            res.json({success:true,marks});
                        })
                        .catch(err=>{
                          res.json({success:false,msg:err.message});
                        })
                    })
                    .catch(err=>{
                      console.log(err.message);
                    })

                  }

                });


            })
            .catch(err=>{
              console.log(err.message);
            })

        })
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

router.post('/frontend/question/:id/evaluation/dynamic',function (req,res) {
  db.FrontendSubmission.create({html:req.body.html,css:req.body.css,js:req.body.js,userId:req.user._id,testId:req.params.id})
    .then(submission=>{
      db.FrontendQuestion.findById(req.params.id)
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
          const marks = ((+req.body.checks/question.checks)*question.points).toFixed(2);
          console.log(req.body.checks,question.checks,question.points,marks);
          question.students[index].maxMarks=Math.max(question.students[index].maxMarks?question.students[index].maxMarks:0,marks);
          question.save();
          db.FrontendSubmission.findByIdAndUpdate(submission._id,{marks})
            .then(sub=>{
              res.json({success:true,marks})
            })
            .catch(err=>{
              res.json({success:false,msg:err.message})
            })
        })
        .catch(err=>{
          res.json({success:false,msg:err.message})
        })
    })
    .catch(err=>{
      res.json({success:false,msg:err.message})
    })
})

router.get('/leaderboard/frontendquestion/:id',function (req,res) {
  db.FrontendQuestion.findById(req.params.id)
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

router.get('/submissions/frontendquestion/:id',function (req,res) {
  db.FrontendQuestion.findById(req.params.id)
    .populate('students.submissions')
    .then(question=>{
      const user = question.students.filter(st=>req.user._id.equals(st.userId))
      res.json({success:true,submissions:user[0].submissions?user[0].submissions:[]});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

router.get('/frontend/submissions/all/test/:id',function (req,res) {
    db.FrontendQuestion.findById(req.params.id)
      .populate(['students.submissions','students.userId'])
      .then(question=>{
        res.json({success:true,submissions:question.students});
      })
      .catch(err=>{
        res.json({success:false,msg:err.message});
      })
})



function saveImageToDisk(url,imgName) {
  return new Promise(function(resolve,reject){
    var request = https.get(url, function(response) {
      const contentType = response.headers['content-type'].split('/');
      const ext = contentType[contentType.length-1];
      var file = fs.createWriteStream(`./sample${imgName}.${ext}`);
      response.pipe(file);
      resolve(ext);
    });
  })
}
module.exports = router;
