const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
    topics:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'topic'
    }]
});

module.exports = mongoose.model("content",ContentSchema);