import React,{useContext,useEffect} from "react";
import "./Nav.css";
import {Link,withRouter} from "react-router-dom";
import {CurUserContext} from "../../../contexts/curUser";
import axios from "axios";

// Navbar component which shows links based on props passed to it ans user login status
const Nav =(props)=>{

    // Used for checking login status
    const {user,setUser} = useContext(CurUserContext);
    useEffect(()=>{
      axios.get("/curUser")
        .then(res=>{
            if(res.data.user){
              setUser({loggedIn:true,superAdmin:res.data.user.superAdmin});
            }else{
              setUser({loggedIn:false,superAdmin:false});
            }
        })
        .catch(err=>{
          setUser({loggedIn:false,superAdmin:false});
          props.history.push("/login");
        })
    },[]);

    // Logs out user and redirects to login page
    const handleLogout = ()=>{
        axios.get("/logout")
          .then(res=>{
            setUser({loggedIn:false,username:"",superAdmin:false});
            props.history.push("/login");
          })
          .catch(err=>{
            console.log(err.message);
          })
    }

    return(
        <nav className={props.show?"navbar navbar-dark navbar-expand-lg profile-nav show  " : "navbar navbar-dark navbar-expand-lg profile-nav"}>
           {props.menu || user.loggedIn ?(
               <React.Fragment>
                   <Link className="navbar-brand" to="/">Profiles Generator</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">

                        {user.loggedIn?(
                            <React.Fragment>
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/profiles">Profiles</Link>
                                </li>
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/createProfile">Create Profile</Link>
                                </li>
                                {user.superAdmin?(
                                    <li className="nav-item ">
                                        <Link className="nav-link" to="/adminDashboard">Dashboard</Link>
                                    </li>
                                ):null}
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/content">Content</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="#" onClick={handleLogout} > Logout </Link>
                                </li>
                            </React.Fragment>):(
                            <li className="nav-item active">
                                <Link className="nav-link" to="/login">Login </Link>
                            </li>)}
                        </ul>
                    </div>
               </React.Fragment>
           ):(
            <React.Fragment>
            <div>
                <div className="navImg profileImg" >
                    <div style={{backgroundImage:props.dp}}></div>
                </div>
            </div>
            <div className="navTitleCont">
                <h1 className="navTitle"> {props.name} </h1>
            </div>
            </React.Fragment>)}


            {/* <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/profiles">Home <span className="sr-only">(current)</span></Link>
                </li>

                </ul>
            </div> */}
        </nav>
    )

};

export default withRouter(Nav);
