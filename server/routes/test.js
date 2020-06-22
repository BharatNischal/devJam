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
})


module.exports =router;
