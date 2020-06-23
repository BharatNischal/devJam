const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../models/index");
const middleware = require("../middleware");


// Route to create a mcq
router.get('/question/:type/new',function (req,res) {
  db.Question.create({question:"",type:req.params.type})
    .then(question=>{
      res.json({success:true,question});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
});


// Route to delete a question
router.delete('/question/:id',function (req,res) {
  db.Question.findByIdAndDelete(req.params.id)
    .then(question=>{
      res.json({success:true});
    })
    .catch(err=>{
      res.json({success:false,msg:err.message});
    })
})

module.exports =router;
