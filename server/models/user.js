var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var userSchema=new mongoose.Schema({
    profilePic:{
      type:String,
      default:"https://res.cloudinary.com/bharatnischal/image/upload/v1563524517/czrd2jp9glgoluwm3vpp.png"
    },
    username:String,
    password:String,
    superAdmin:{
      type:Boolean,
      default: false
    },
    name:String,
    student:{
      type:Boolean,
      default:false
    },
    googleId:{
      type:String,
      unique:true
    },
    githubId:{
      type:String,
      unique:true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    canAccess: {
      type: Boolean,
      default: false
    }
});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);
