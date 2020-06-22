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
    marks:Number,
    maxMarks:Number,
    answers:[String]  //Incase of mcq it will be index in case of mcqGrid ','separated column index for eachrow and for paragraph its the answer
});

module.exports = mongoose.model("testSubmission",testSubmissionSchema);
