import React,{useState} from "react";
import "./loginForm.css";
import axios from "axios";

const LoginForm = (props)=>{

    const [reset,setReset] = useState(false);
    const [err,setErr] = useState("");
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [btnclick,setBtnClick] = useState(false);

    const handleSubmit = (e)=>{
      e.preventDefault();
      setBtnClick(true);
      setErr("");
      console.log(username,password);
      axios.post("http://localhost:8080/login",{username,password})
        .then(res=>{

          if(res.success||res.data.success){
            setTimeout(()=>{
                setBtnClick(false);
                props.history.push("/profiles");
            },1000);
          }else{
            // Show message
            setTimeout(()=>{
                setBtnClick(false);
                setErr("Invalid Username or Password");
            },1000);
          }
        })
        .catch(err=>{
          console.log(err.message);
          setBtnClick(false);
          // Show the message
          setErr("Server Error");
        })
        setUsername("");
        setPassword("");
    }

    let button;
    if(!btnclick){
      button =  <button type="submit" className="btn btn-block btn-lg text-white color-pink-shade">Log In</button>;
    }else{
      button =  <div type="submit" className="btn btn-block btn-lg text-white color-pink-shade col-12"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" className="loader"/></div>;
    }

    return (
        <div className="row vertical-allign">
          <div className="col-lg-4 col-1"></div>
          <div className="col-lg-4 col-10 card height-fixed  shadow-pink">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-4 position-img">
              <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png" className="img-fluid" />
              </div>
              <div className="col-4"></div>
            </div>
            <div className="card-body">
              <div className="row mb-2 tab-head-div" >
                <div className="col-6 text-center  tab-head"><h6 className={reset?"pointer m-0 ":"pointer active-cls m-0"} onClick={()=>{setReset(false);setErr("")}}>Login</h6></div>
                <div className="col-6 text-center tab-head"><h6 className={reset? "pointer active-cls m-0":" pointer m-0 "} onClick={()=>{setReset(true);setErr("")}}>Reset</h6></div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className={reset?"form-group tool-tip2 tool-tip":"form-group tool-tip"}>
                  <input type="email" className="form-control form-control-lg text-center" value={username} onChange={e=>{setUsername(e.target.value)}} id="email" placeholder="Email"/>
                </div>
                <div className={reset?" d-none form-group":" form-group"}>
                  <input type="password" className="form-control form-control-lg text-center" value={password} onChange={e=>{setPassword(e.target.value)}} id="password" placeholder="Password"/>
                </div>
                {button}
              </form>
              <p className="text-danger">{err}</p>
          </div>
        </div>
        <div className="col-lg-4 col-1">
          <div className="col-3">
          </div>
        </div>
      </div>
    );
}

export default LoginForm;
