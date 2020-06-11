const express= require('express');
const mongoose = require("mongoose");
const router=express.Router();
const db=require("../models/index");
const multer = require('multer');
const path = require('path');
const middleware = require("../middleware");
const dotenv = require('dotenv');
dotenv.config();

//Muler upload
const storage = multer.diskStorage({
    filename: function(req, file, cb){
       cb(null,"FILE-" + Date.now() + path.extname(file.originalname));
    }
 });
 const upload = multer({
    storage: storage,
    limits:{fileSize: 10000000000}
 }).single("file");