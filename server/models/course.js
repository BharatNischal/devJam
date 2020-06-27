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
        userId:{
          type:mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      }],
    startTime:Date,
    endTime:Date
});

module.exports = mongoose.model("course",courseSchema);
