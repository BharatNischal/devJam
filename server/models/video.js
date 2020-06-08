const mongoose=require("mongoose");

const videoSchema = new mongoose.Schema({
  title:{
    type: String,
    default: "Title"
  },
  description: String,
  url: String,
  filename: String
})

module.exports = mongoose.model("Video",videoSchema);
