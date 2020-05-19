import React,{useState} from "react";

const LoginForm = (props)=>{

    const [resetClass,setResetClass] = useState("form-group");

    return (
      <div className="container">
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <div className="row">
        <div className="col-lg-4 col-sm-1"></div>
        <div className="col-lg-4 col-sm-10">
          <div className="row" >
            <div className="col-sm-6 pointer"onClick={()=>{setResetClass("fade-in form-group")}}><h4>Login</h4></div>
            <div className="col-sm-6 text-right pointer" onClick={()=>{setResetClass("fade-out")}}><h4>Reset</h4></div>
          </div>
          <form>
            <div className="form-group">
              <input type="email" className="form-control form-control-lg text-center" id="exampleInputEmail1" placeholder="Email"/>
            </div>
            <div className={resetClass}>
              <input type="password" className="form-control form-control-lg text-center" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">Log In</button>
          </form>
        </div>
        <div className="col-lg-4 col-sm-1"></div>
        </div>
      </div>
    );
}

export default LoginForm;
