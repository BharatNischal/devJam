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
    topic:{
        type:mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model("deliverable",deliverableSchema);