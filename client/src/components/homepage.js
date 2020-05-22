import React,{useEffect,useContext} from "react";
import axios from "axios";
import {CurUserContext} from "../contexts/curUser";


const Homepage = (props)=>{

  const{user} = useContext(CurUserContext);
  useEffect(()=>{
    if(user.loggedIn){
      props.history.push("/profiles");
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
