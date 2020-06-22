const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title:String,
  read:{
    type:Boolean,
    default:false
  },
  link:String
});

module.exports = mongoose.model("notification",notificationSchema);
