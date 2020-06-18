const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../models/index");
const multer = require('multer');
const path = require('path');
const middleware = require("../middleware");
const dotenv = require('dotenv');
const XMLHttpRequest = require("xhr2");


// console.log(cred);
global.XMLHttpRequest = XMLHttpRequest;
dotenv.config();

var firebase = require("firebase/app");
require("firebase/storage");
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.firebase_apiKey,
    authDomain: process.env.firebase_authDomain,
    databaseURL: process.env.firebase_databaseURL,
    projectId: process.env.firebase_projectId,
    storageBucket:process.env.firebase_storageBucket ,
    appId: process.env.firebase_appId
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  var storageRef = firebase.storage().ref();




//Muler upload

 const upload = multer({
    storage: multer.memoryStorage(),
    limits:{fileSize: 10000000000}
 }).single("zip");


// To get the detail whether user has submited the zip for a given deliverable
 router.get("/issubmitted/:deliverableId",middleware.isAdmin,(req,res)=>{
    db.Submission.find({deliverableId:req.params.deliverableId,studentId:req.user._id})
    .then(re=>{
        if(re.length>0){
            res.json({success:true,isSubmitted:true});
        }else{
            res.json({success:true,isSubmitted:false});
        }
    }).catch(err=>{
        console.log(err);
        res.json({success:false,message:err.message});
    })
});


// Save the Zip file and private comment
router.post("/submission/:deliverableId",upload,middleware.isStudent,(req,res)=>{
    if(req.file){
        console.log(req.file ,"HERE");
        console.log(req.body,"Body");
        storageRef.child(Date.now()+req.file.originalname).put(req.file.buffer).then(async function(snapshot) {

            await snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log(downloadURL,"HERE");

                db.Submission.create({
                    studentId:req.user._id,
                    deliverableId:req.params.deliverableId,
                    fileURL:downloadURL,
                    comment: req.body.comment
                }).then(createdSub=>{
                    db.Deliverable.findById(req.params.deliverableId)
                    .then(async function(del){
                        del.submissions=del.submissions.map(sub=>(sub.userId.equals(req.user._id)?{userId:sub.userId,submissionId:createdSub._id}:sub));
                        await del.save();
                        res.json({success:true,Submission:createdSub});
                    }).catch(delErr=>{
                        return res.json({success:false,msg:delErr.message});
                    })
                    
                   

                }).catch(err=>{
                    res.json({success:false,msg:err.message});
                });

              });
            console.log('File Uploaded');
        }).catch(err=>{
            console.log(err,"ERRR");
            res.json({success:false,msg:err.message});
        })
    }else{
        res.json({success:false,msg:"No file Uploaded"});
    }
});

//Route to update Marks 
router.post("/updateMarks/:submissionId",middleware.isAdmin,function(req,res){
    db.Submission.findById(req.params.submissionId)
    .then(async function(sub){
        sub.marks=req.body.marks;
        await sub.save();
        res.json({success:true,msg:"marks updated successfully"});
    }).catch(err=>{
        res.json({success:false,msg:err.message});
    });
});

//Route to add feedback
router.post("/updateFeedback/:submissionId",middleware.isAdmin,function(req,res){
    db.Submission.findById(req.params.submissionId)
    .then(async function(sub){
        sub.feedback=req.body.feedback;
        await sub.save();
        res.json({success:true,msg:"feedback updated successfully"});
    }).catch(err=>{
        res.json({success:false,msg:err.message});
    });
})




 module.exports = router;
