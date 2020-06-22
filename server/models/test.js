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
    studens:[{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
});

module.exports = mongoose.model("test",testSchema);
