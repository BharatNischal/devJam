var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");

var userSchema=new mongoose.Schema({
    username:String,
    password:String,
    superAdmin:{
      type:Boolean,
      default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);
