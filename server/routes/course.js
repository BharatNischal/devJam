const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../models/index");
const middleware = require("../middleware");


// Router to get all the courses
router.get('/courses',function (req,res) {
    db.Course.find({})
      .then(courses=>{
        res.json({success:true,courses});
      })
      .catch(err=>{
        res.json({success:false,msg:err.message});
      })
})
