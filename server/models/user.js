var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var userSchema=new mongoose.Schema({
    profilePic:{
      type:String,
      default:""
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
    resetPasswordExpires: Date
});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);
