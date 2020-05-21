import React,{useContext,useEffect} from "react";
import axios from "axios";
import {CurUserContext} from "../contexts/curUser";


const Homepage = (props)=>{

  const {setUser,user} = useContext(CurUserContext);

  useEffect(()=>{
    console.log("USER ",user);
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
