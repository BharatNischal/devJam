var mongoose=require("mongoose");

const deliverableSchema=new mongoose.Schema({
    title:{
        type:String
    },
    instruction:{
        type:String
    },
    points:{
        type:Number
    },
    dueDate:{
        type:Date
    },
    comments:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Comment'
    }],
    submissions:[{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        submissionId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"submission"
        }
    }],
    timestamp:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("deliverable",deliverableSchema);
