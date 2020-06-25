const mongoose = require("mongoose");

const testSubmissionSchema = new mongoose.Schema({
    // To get the questions
    testId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'test'
    },
    // To get all the tests for a particular student
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    marks:Number,   //Autograde marks
    finalMarks:Number,
    maxMarks:Number,
    answers:[{  //Incase of mcq it will be index, in case of mcqGrid ','separated column index for eachrow and for paragraph its the answer
      questionId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'question'
      },
      answer:String,
      marks:Number,
      feedback:String//individual feedback for questions
    }],
    onTime:{  //Refering to submission time
      type:Boolean,
      default: false
    },
    startTime:{
      type:Date,
      default:Date.now
    },
    released:{
      type:Boolean,
      default: false
    }
});

module.exports = mongoose.model("testSubmission",testSubmissionSchema);
