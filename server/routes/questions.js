const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../models/index");
const middleware = require("../middleware");


// Route to create a mcq
router.get('/mcq/new',function (req,res) {
  db.Mcq.create({})
    .then(question=>{
      res.json({success:true,question});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
});


// Route to create a mcqGrid
router.get('/mcqGrid/new',function (req,res) {
  db.McqGrid.create({})
    .then(question=>{
      res.json({success:true,question});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
});

// Route to create a paragraph question
router.get('/paragraph/new',function (req,res) {
  db.Paragraph.create({})
    .then(question=>{
      res.json({success:true,question});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
});

// Route to delete a mcq
router.delete('/mcq/:id',function (req,res) {
  db.Mcq.findByIdAndDelete(req.params.id)
    .then(question=>{
      res.json({success:true});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Route to delete a mcqGrid
router.delete('/mcqGrid/:id',function (req,res) {
  db.McqGrid.findByIdAndDelete(req.params.id)
    .then(question=>{
      res.json({success:true});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

// Route to delete a paragraph question
router.delete('/paragraph/:id',function (req,res) {
  db.Paragraph.findByIdAndDelete(req.params.id)
    .then(question=>{
      res.json({success:true});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

module.exports =router;
