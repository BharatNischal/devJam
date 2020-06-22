const mongoose = require("mongoose");

const mcqGridSchema = new mongoose.Schema({
    question:String,
    img:String,
    rows:[String],
    cols:[String],
    choices:[Number]  //Index for each row
});

module.exports = mongoose.model("mcqGrid",mcqGridSchema);
