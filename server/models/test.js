const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    title:String,
    state:String, //Publish/Closed/Draft
    instructions:String,
    duration:{
      type:Number,
      default: -1   //Default state for unlimited time
    },
    shuffle:{
      type: Boolean,
      default: false
    },
    // Students can access the test or not
    active:{
      type:Boolean,
      default:true
    },
    questions:[{
        mcq:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'mcq'
        },
        mcqGrid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'mcqGrid'
        },
        paragraph:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'paragraph'
        }
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
