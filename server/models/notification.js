const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  title:String,
  link:String,
  type:String
});

module.exports = mongoose.model("notification",notificationSchema);
