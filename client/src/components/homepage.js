import React,{useEffect,useContext} from "react";
import axios from "axios";
import {CurUserContext} from "../contexts/curUser";

// A component just to redirect user based on login status
const Homepage = (props)=>{

  const{user} = useContext(CurUserContext);
  useEffect(()=>{
    if(user.loggedIn){
      user.student?props.history.push("/studDash"):props.history.push("/profiles");
    }else{
      props.history.push("/login");
    }
  },[]);

    return (
      <React.Fragment>
      </React.Fragment>
    );
}

export default Homepage;
