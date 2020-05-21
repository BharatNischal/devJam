import React,{useState} from "react";
import axios from "axios";

const ResetPassword = (props)=>{

  const [btnclick,setBtnClick] = useState(false);
  const [err,setErr] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
    setBtnClick(true);
    setErr("");
    axios.post("http://localhost:8080/reset/"+props.match.params.token,{password})
      .then(res=>{
          setErr(res.data.msg);
          setBtnClick(false);
      })
      .catch(err=>{
        setErr(err.data.msg);
        setBtnClick(false);
      })
      setPassword("");
  }

  let button;
  if(!btnclick){
    button =  <button type="submit" className="btn btn-block btn-lg text-white color-pink-shade">Change Password</button>;
  }else{
    button =  <div type="submit" className="btn btn-block btn-lg text-white color-pink-shade col-12"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" className="loader"/></div>;
  }

    return (
      <div className="container mt-4">
        <h1 className="my-5 text-white">Reset Password</h1>
        <div className="row mt-5">
          <div className="col-lg-4 col-1"></div>
          <div className="col-lg-4 col-10 card shadow-pink">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-4 position-img">
              <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png" className="img-fluid" />
              </div>
              <div className="col-4"></div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="input" className="form-control form-control-lg text-center" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="New Password"/>
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
    </div>
    );
}

export default ResetPassword;
