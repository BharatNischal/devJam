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
    }
});

module.exports = mongoose.model("deliverable",deliverableSchema);