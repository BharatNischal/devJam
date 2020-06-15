import React,{useContext,useEffect} from "react";
import Content from "./learnerPlatform/content";
import {CurUserContext} from "../contexts/curUser";

const StDash = (props)=>{
    const {user} = useContext(CurUserContext);

    // Frontend Authorization
    useEffect(()=>{
      if(!user.loggedIn)
        props.history.push("/login");
    },[])

      return(<Content/>);
}

export default StDash;
