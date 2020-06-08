// all the middleare goes here
var middlewareObj = {};

middlewareObj.isAdmin = function(req,res,next){
  if(req.user){
    console.log("MIDDLEWARE logined",req.user);
    return next();
  }
  return res.json({success:false,err:"NOt Logined From Middleware"});
}

middlewareObj.isSuperAdmin = function(req,res,next){
  if(req.user&&req.user.superAdmin){
    console.log("MIDDLEWARE logined",req.user);
    return next();
  }
  return res.json({success:false,err:"NOt Logined From Middleware"});
}


module.exports = middlewareObj;
