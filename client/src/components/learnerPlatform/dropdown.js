import React,{useContext} from "react";
import "./learnerStyle.css";
import Dp from "../profile/CLIP.png";
import {CurUserContext} from "../../contexts/curUser";
import axios from "axios";
import { withRouter } from "react-router-dom";


const Dropdown =(props)=>{
    const {setUser,user} = useContext(CurUserContext);

    // Logs out user and redirects to login page
    const logoutHandler = ()=>{
        axios.get("/logout")
          .then(res=>{
            setUser({loggedIn:false,username:"",superAdmin:false,profilePic:null,name:""});
            props.history.push("/login");
          })
          .catch(err=>{
            console.log(err.message);
          })
    }

    return(
        <React.Fragment>
        <div className="d-backdrop" onClick={props.close}></div>
        <div className="dropdown">
            <div className="dpWrapper dpWrapper2" > <img alt="profilePic" src={user.profilePic?user.profilePic:Dp} /></div>
            <h2 className="title">Hi, {user.name?user.name:""} !</h2>
            <hr className="mb-0"/>
            <div className="btns p-2" onClick={logoutHandler} >  Logout <i className="fa fa-power-off"></i> </div>
        </div>
        </React.Fragment>
    )
};

export default withRouter(Dropdown);