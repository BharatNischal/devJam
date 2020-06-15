const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text:String,
    author: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'User'
    },
    timestamp:{
      type: Date,
      default: Date.now
    },
    subComments: [{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Comment'
    }]
});

module.exports = mongoose.model("Comment",commentSchema);
