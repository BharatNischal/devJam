// all the middleare goes here
var middlewareObj = {};

middlewareObj.isAdmin = function(req,res,next){
  if(req.user){
    return next();
  }
  return res.json({success:false,msg:"NOt Logined From Middleware"});
}

middlewareObj.isStudent = function (req,res,next) {
    if(req.user && req.user.student){
      return next();
    }
    return res.json({success:false,msg:"NOt Logined From Middleware"});
}

middlewareObj.isSuperAdmin = function(req,res,next){
  if(req.user&&req.user.superAdmin){
    return next();
  }
  return res.json({success:false,err:"NOt Logined From Middleware"});
}


module.exports = middlewareObj;
