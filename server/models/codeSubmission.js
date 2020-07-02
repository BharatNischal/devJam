var mongoose=require("mongoose");

var codingSubmissionSchema=new mongoose.Schema({
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    testId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'codingtest'
    },
    testCases:[{
      passed:Boolean
    }],
    marks:Number,
    sourceCode:String,
    languageCode:Number,
    token:String,
    timeStamp:{
      type:Date,
      default:Date.now
    }
});

module.exports=mongoose.model("codingtest",codingSubmissionSchema);
