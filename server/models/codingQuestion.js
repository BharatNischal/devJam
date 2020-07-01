var mongoose=require("mongoose");

var codingQuestionSchema=new mongoose.Schema({
    title:String,
    description:String,
    inputFormat:String,
    constraints:String,
    outputFormat:String,
    sample:String,
    testCases:[{
      input:String,
      output:String,
      hidden:{
        type:Boolean,
        default:false
      }
    }],
    status:String,
    points:Number,
    timeLimit:Number,
    memoryLimit:Number,
    topic:String,
    difficulty:Number,
    timeStamp: {
      type:Date,
      default:Date.now
    },
    students:[{
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      submissions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'codesubmission'
      }]
    }],
    solution:String,
    editorial:String
});

module.exports=mongoose.model("codingquestion",codingQuestionSchema);
