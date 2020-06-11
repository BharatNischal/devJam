import React,{useState,useContext,useEffect} from "react";
import "../loginForm/loginForm.css";
import axios from "axios";
import {CurUserContext} from "../../contexts/curUser";

// Component for Signup page for students
const SignupForm = (props)=>{

    //State to store data
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    // UI states
    const [err,setErr] = useState("");
    const [btnclick,setBtnClick] = useState(false);
    // State to get the login status of user
    const{setUser} = useContext(CurUserContext);

    // Check if the user is alredy loggedIn , In this case redirect to profiles page
    useEffect(()=>{
      axios.get("/curUser")
        .then(res=>{
            if(res.data.user){
              setUser({loggedIn:true,superAdmin:res.data.user.superAdmin,name:res.data.user.name,profilePic:res.data.user.profilePic,student:res.data.user.student});
              res.data.user.student?props.history.push("/studDash"):props.history.push("/profiles");
            }else{
              setUser({loggedIn:false,superAdmin:false});
            }
        })
        .catch(err=>{
          setUser({loggedIn:false,superAdmin:false});
        })
    },[])

    // Registeration Api
    const handleSubmit = (e)=>{
      e.preventDefault();
      setBtnClick(true);
      setErr("");
      axios.post("/register",{username,password,name,student:true})
        .then(res=>{
            if(res.data.success){
              props.history.push("/studDash");
            }else{
              setErr(res.msg);
            }
        })
        .catch(err=>{
          setErr(err.message);
        })
      setUsername("");
      setPassword("");
      setName("");
    }

    // Logic to display loader or Login Button
    let button;
    if(!btnclick){
      button =  <button type="submit" className="btn btn-block btn-lg text-white color-pink-shade">Sign Up</button>;
    }else{
      button =  <div type="submit" className="btn btn-block btn-lg text-white color-pink-shade col-12"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" className="loader"/></div>;
    }

    return (
        <div className="row vertical-allign">
          <div className="col-lg-4 col-1"></div>
          <div className="col-lg-4 col-10 card height-fixed  shadow-pink" style={{borderRadius:"23px"}}>
            <div className="row">
              <div className="col-4"></div>
              <div className="col-4 position-img">
              <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png" className="img-fluid" />
              </div>
              <div className="col-4"></div>
            </div>
            <div className="card-body">
              <div className="row mb-2 tab-head-div" >
                <div className="col-12 text-center font-weight-bold"><p className="pointer m-0 active-cls text-center" >Student SignUp</p></div>
              </div>
              <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" className="form-control form-control-lg text-center" value={name} onChange={e=>{setName(e.target.value)}} id="name" placeholder="Name" required/>
              </div>
                <div className="form-group">
                  <input type="email" className="form-control form-control-lg text-center" value={username} onChange={e=>{setUsername(e.target.value)}} id="email" placeholder="Email" required/>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control form-control-lg text-center" value={password} onChange={e=>{setPassword(e.target.value)}} id="password" placeholder="Password" required/>
                </div>
                {button}


              </form>
              <p className="text-danger">{err}</p>
              <hr className="mt-4 mb-2"/>
              <p> Or Directly Sign Up With: </p>
              <div><a href="http://localhost:8080/auth/google" className="btn btn-block btn-outline-grad py-2" > <i className="fa fa-google text-danger h4"></i> &nbsp;&nbsp;Sign With Google </a></div>
              <div className="mt-2"><a href="http://localhost:8080/auth/github" className="btn btn-block btn-outline-grad py-2" > <i className="fa fa-github h4"></i> &nbsp;&nbsp;Sign With Github </a></div>
          </div>
        </div>
        <div className="col-lg-4 col-1">
          <div className="col-3">
          </div>
        </div>
      </div>
    );
}

export default SignupForm;
