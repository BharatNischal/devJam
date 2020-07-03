var mongoose=require("mongoose");

var frontendSubmissionSchema=new mongoose.Schema({
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    testId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'codingtest'
    },
    marks:Number,
    html:String,
    css:String,
    js:String,
    timeStamp:{
      type:Date,
      default:Date.now
    }
});

module.exports=mongoose.model("frontendsubmission",frontendSubmissionSchema);
