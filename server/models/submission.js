const mongoose= require("mongoose");

const submissionSchema = new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    deliverableId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"deliverable",
        required:true
    },
    fileURL:{
        type:String,
        required:true
    },
    timestamp:{
        type: Date,
        default: Date.now
    },
    marks:{
        type:Number,
        default:0
    },
    comment:String
});

module.exports=mongoose.model("submission",submissionSchema);
