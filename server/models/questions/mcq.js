const mongoose = require("mongoose");

const mcqSchema = new mongoose.Schema({
    question:String,
    img:String,
    autoGrade:{
      type:Boolean,
      default: false
    },
    options:[{
      title:String,
      img:String
    }],
    correctOption:Number
});

module.exports = mongoose.model("mcq",mcqSchema);
