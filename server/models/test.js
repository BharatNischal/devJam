const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    title:String,
    status:{
      type:String, //Published/Closed/Draft
      default:"Draft"
    },
    instructions:String,
    duration:{
      type:Number,
      default: -1   //Default state for unlimited time
    },
    shuffle:{
      type: Boolean,
      default: false
    },
    questions:[{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'question'
    }],
    // Authorized Students
    students:[{
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      testSubmissionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'testSubmission'
      }
    }]
});

module.exports = mongoose.model("test",testSchema);
