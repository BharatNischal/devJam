import React,{useState,useEffect} from "react";
import Nav from "./profile/Nav/Nav";
import axios from "axios";

const Dashboard = (props)=>{
  const [err,setErr] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [btnclick,setBtnClick] = useState(false);
  const [admins,setAdmins] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/admins")
      .then(res=>{
        setAdmins(res.data);
      })
      .catch(err=>{
        console.log(err.message);
      })
  },[])

  const handleSubmit = (e)=>{
    e.preventDefault();
    setBtnClick(true);
    setErr("");
    console.log(username,password);
    if(username==""){
      setErr("Email can't be empty");
      setBtnClick(false);
    }else if(password==""){
      setErr("Password can't be empty");
      setBtnClick(false);
    }else{
      const email = username;
      axios.post("http://localhost:8080/register",{username,password})
        .then(res=>{
          console.log("res",res);
          if(res.success||res.data.success){
            setTimeout(()=>{
                setBtnClick(false);
                setAdmins([...admins,{username:email}]);
            },1000);
          }else{
            // Show message
            setTimeout(()=>{
                setBtnClick(false);
                setErr(" Email Already Exist");
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
  }

  let button;
  if(!btnclick){
    button =  <button type="submit" className="btn btn-block btn-lg text-white color-pink-shade">Create</button>;
  }else{
    button =  <div type="submit" className="btn btn-block btn-lg text-white color-pink-shade col-12"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" className="loader"/></div>;
  }

  let list = admins.map(admin=>(
    <li className="font-weight-bold">{admin.username}</li>
  ))


  return (
    <React.Fragment>
    <Nav menu={true} isLogin={true} show={true}/>
    <div className="container" style={{marginTop:"10vh"}}>
      <h1 className="text-white">Super Admin Dashboard</h1>
      <div className="row mt-5">
        <div className="col-md-5 col-12 card shadow-pink px-3 py-3 mb-5">
          <h3 className="" style={{color:"#a44bb3"}}>Total Admins: {admins.length}</h3>
          <br/>
          <div className="container">
            <ol className="mt-2 text-left">
              {list}
            </ol>
          </div>
        </div>
        <div className="col-md-2 col-0 mt-4"></div>
        <div className="col-md-5 col-12 card height-fixed shadow-pink">
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4 position-img">
            <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png" className="img-fluid" />
            </div>
            <div className="col-4"></div>
          </div>
          <div className="card-body">
            <h3 style={{color:"#de3d5a"}}>Create New Admin</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="email" className="form-control form-control-lg text-center" value={username} onChange={e=>{setUsername(e.target.value)}} id="email" placeholder="Email" required/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control form-control-lg text-center" value={password} onChange={e=>{setPassword(e.target.value)}} id="password" placeholder="Password" required/>
              </div>
              {button}
            </form>
            <p className="text-danger">{err}</p>
        </div>
      </div>
    </div>
  </div>
</React.Fragment>
  );

}

export default Dashboard;
