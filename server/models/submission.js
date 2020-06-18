const mongoose= require("mongoose");

const submissionSchema = new mongoose.Schema({
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
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
        default:-1
    },
    comment:String,
    feedback:String
});

module.exports=mongoose.model("submission",submissionSchema);
