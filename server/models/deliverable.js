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
    }]
});

module.exports = mongoose.model("deliverable",deliverableSchema);
