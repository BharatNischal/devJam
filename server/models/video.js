const mongoose=require("mongoose");

const videoSchema = new mongoose.Schema({
  title:{
    type: String,
    default: "Title"
  },
  description: String,
  url: String,
  filename: String,
  duration: String,
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Comment'
  }]
})

module.exports = mongoose.model("Video",videoSchema);
