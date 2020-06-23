const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question:String,
    img:String,
    type:{
      type: String,
      default: "mcq"
    },
    autoGrade:{
      type:Boolean,
      default: false
    },
    options:[{  //Cols for mcqGrid
      title:String,
      img:String
    }],
    rows:[String],
    correctOption:Number, //Only for mcq
});

module.exports = mongoose.model("question",questionSchema);
