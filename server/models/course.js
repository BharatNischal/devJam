const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title:{
      type:String,
      default:""
    },
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
      items:[{
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
          },
          event:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'gEvent'
          }
      }]
    }],
    startMonth:Number,
    endMonth:Number
});

module.exports = mongoose.model("course",courseSchema);
