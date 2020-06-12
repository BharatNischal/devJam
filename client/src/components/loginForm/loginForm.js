import React,{useState,useContext,useEffect} from "react";
import "./loginForm.css";
import axios from "axios";
import {Link} from "react-router-dom";
import {CurUserContext} from "../../contexts/curUser";

// Component for Login and reset Page
const LoginForm = (props)=>{

    //State to store data
    const [reset,setReset] = useState(false);
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
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

    // Fxn to take care of login or reset and send the data to relevant route
    const handleSubmit = (e)=>{
      e.preventDefault();
      setBtnClick(true);
      setErr("");
      if(!reset){
          console.log(username,password);
          axios.post("/login",{username,password})
            .then(res=>{
              if(!res.data.success){
                setTimeout(()=>{
                    setBtnClick(false);
                    setErr("Invalid Username or Password");
                },1000);
              }else{
                setTimeout(()=>{
                  setBtnClick(false);
                  setUser({loggedIn:true,superAdmin:res.data.user.superAdmin,name:res.data.user.name,profilePic:res.data.user.profilePic,student:res.data.user.student,username:res.data.user.username});
                  res.data.user.student?props.history.push("/studDash"):props.history.push("/profiles");
                },1000);
              }
            })
            .catch(err=>{
              console.log(err.msg);
              setBtnClick(false);
              // Show the message
              setErr("Server Error");
            })
      }else{
          axios.post("/forget",{username})
            .then(res=>{
                console.log(res);
                setTimeout(()=>{
                    setBtnClick(false);
                    setErr(res.data.msg)
                },1000);
            })
            .catch(err=>{
              setBtnClick(false);
              setErr(err.msg);
            })
      }
      setUsername("");
      setPassword("");
    }

    // Logic to display loader or Login Button
    let button;
    if(!btnclick){
      button =  <button type="submit" className="btn btn-block btn-lg text-white color-pink-shade">Log In</button>;
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
                <div className={reset?"col-6 text-center":"col-6 text-center font-weight-bold"}><span className="pointer active-cls m-0" onClick={()=>{setReset(false);setErr("")}}>Login</span></div>
                <div className={reset?"col-6 text-center font-weight-bold":"col-6 text-center"}><span className="pointer active-cls m-0" onClick={()=>{setReset(true);setErr("")}}>Reset</span></div>
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
              <hr className="mt-4 mb-2"/>
              <div className="row px-2"><div className="col-6"><Link to="/signup">Register as a Student</Link></div><div className="text-right col-6"> Or Directly Login With: &nbsp;</div></div>
              <div><a href={ `${window.location.host=="localhost:3000"?"http://localhost:8080":""}/auth/google`} className="btn btn-block btn-outline-grad py-2" > <i className="fa fa-google text-danger h4"></i> &nbsp;&nbsp;Login With Google </a></div>
              <div className="mt-2"><a href={`${window.location.host=="localhost:3000"?"http://localhost:8080":""}/auth/github`} className="btn btn-block btn-outline-grad py-2" > <i className="fa fa-github h4"></i> &nbsp;&nbsp;Login With Github </a></div>
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
