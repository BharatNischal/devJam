const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title:String,
    status:{
      type:String, //Published/Closed/Draft
      default:"Draft"
    },
    instructions:String,
    // Authorized Students
    students:[{
          type:mongoose.Schema.Types.ObjectId,
          ref: 'User'
      }],
    events:[{
      date:Date,
      item:{
          video:{
              type:mongoose.Schema.Types.ObjectId,
              ref:'Video'
          },
          deliverable:{
              type:mongoose.Schema.Types.ObjectId,
              ref:'deliverable'
          },
          test:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'test'
          }
      }
    }],
    startTime:Date,
    endTime:Date
});

module.exports = mongoose.model("course",courseSchema);
