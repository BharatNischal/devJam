const mongoose = require("mongoose");

const gEventSchema = new mongoose.Schema({
    title:{
      type:String,
      default:""
    },
    description:String,
    startTime:String,
    endTime:String
});

module.exports = mongoose.model("gEvent",gEventSchema);
