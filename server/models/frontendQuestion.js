var mongoose=require("mongoose");

var frontendQuestionSchema=new mongoose.Schema({
    title:String,
    description:String,
    sampleUrl:String,
    points:Number,
    time:Number,
    timeStamp: {
      type:Date,
      default:Date.now
    },
    status:{
      type:String,
      default:"Draft"
    },
    isDynamic:{
      type:Boolean,
      default:false
    },
    students:[{
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      submissions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'frontendsubmission'
      }],
      startTime:Date,
      maxMarks:Number
    }],
    test:String,
    points:{
      type:Number,
      default:1
    }
});

module.exports=mongoose.model("frontendquestion",frontendQuestionSchema);
