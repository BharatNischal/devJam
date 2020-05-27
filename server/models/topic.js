const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
    title:String,
    descrition:String,
    items:[{
        video:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Video'
        },
        deliverable:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'deliverable'
        }
    }]
});

module.exports = mongoose.model("topic",topicSchema);