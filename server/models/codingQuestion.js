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
    status:{
      type:String,
      default:"Draft"
    },
    points:Number,
    timeLimit:{
      type:Number,
      default:5
    },
    memoryLimit:{
      type:Number,
      default:1024
    },
    topic:String,
    difficulty:{
      type:String,
      default:"easy"
    },
    time:Number,
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
        ref: 'codingsubmission'
      }],
      startTime:Date,
      maxMarks:Number
    }],
    solution:String,
    editorial:String,
    editorialLang:String,
    starterCode:[{
      code:String,
      lang:String
    }]
});

module.exports=mongoose.model("codingquestion",codingQuestionSchema);
