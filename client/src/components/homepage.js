import React,{useContext,useEffect} from "react";
import axios from "axios";
import {CurUserContext} from "../contexts/curUser";


const Homepage = (props)=>{

  const {setUser,user} = useContext(CurUserContext);

  useEffect(()=>{
      axios.get("http://localhost:8080/curUser")
        .then(res=>{
          console.log(res);
          if(res.data.user){
            setUser({loggedIn:true,superAdmin:res.data.user.superAdmin});
            props.history.push("/profiles");
          }else{
            setUser({loggedIn:false,superAdmin:""});
            props.history.push("/login");
          }
        })
        .catch(err=>{
          setUser({loggedIn:false,superAdmin:""});
          props.history.push("/login");
        })
  },[]);

    return (
      <React.Fragment>
      </React.Fragment>
    );
}

export default Homepage;
