const mongoose = require("mongoose");

const paragraphSchema = new mongoose.Schema({
    question:String,
    img:String,
    answer:String
});

module.exports = mongoose.model("paragraph",paragraphSchema);
