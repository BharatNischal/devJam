import React, { useState,useContext} from "react";
import "./learnerStyle.css";
import Dp from "../profile/CLIP.png";
import Dropdown from "./dropdown";
import {CurUserContext} from "../../contexts/curUser";

const TopBar = (props)=>{
    const [showDropDown,setShowDropDown] = useState(false);
    const {setUser,user} = useContext(CurUserContext);
    return(
        <React.Fragment>
        <div className="topBar">
            <h1 >LrnrHub</h1>
            <div className="dpWrapper cursor-pointer" onClick={()=>setShowDropDown(true)}> <img alt="profilePic" src={user.profilePic?user.profilePic:Dp} /></div>
        </div>
            {showDropDown?<Dropdown close={()=>setShowDropDown(false)} />:null}
        </React.Fragment>
    )
};


export default TopBar;