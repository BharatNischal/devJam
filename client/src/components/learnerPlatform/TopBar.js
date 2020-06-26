import React, { useState,useContext} from "react";
import "./learnerStyle.css";
import Dp from "../profile/CLIP.png";
import Dropdown from "./dropdown";
import {CurUserContext} from "../../contexts/curUser";
import BellImg  from "./bellLogo.png";
import Notification from "./Notification";
import Axios from "axios";

const TopBar = (props)=>{
    const [showDropDown,setShowDropDown] = useState(false);
    const [showNotification,setShowNotification] = useState(false);
    const {setUser,user} = useContext(CurUserContext);

    function changeStatus(index){
        if(!user.notifications[index].read){
            const duplicate=JSON.parse(JSON.stringify(user));
            duplicate.notifications[index].read=true;
            Axios.post(`/changeNotificationStatus`,{user:duplicate})
            .then(res=>{
                if(res.data.success){
                    setUser(duplicate);
                }else{
                    console.log(res.msg);
                }
            }).catch(err=>{
                console.log(err.message);
            })
        }
    }

    return(
        <React.Fragment>
        <div className="topBar">
            <h1 >LrnrHub</h1>
            <div>
                <div className="dpWrapper cursor-pointer mr-2 d-inline-block" style={{position:"relative"}} onClick={()=>setShowNotification(true)} >
                     <img alt="profilePic" src={BellImg} /> 
                     <span className="numIndicator rounded-circle" > {user.notifications?user.notifications.length:""} </span> </div>
                <div className="dpWrapper cursor-pointer d-inline-block" onClick={()=>setShowDropDown(true)}> <img alt="profilePic" src={user.profilePic?user.profilePic:Dp} /></div>
            </div>
        </div>
            {showNotification?<Notification close={()=>setShowNotification(false)} changeStatus={changeStatus} data={user.notifications} />:null}
            {showDropDown?<Dropdown close={()=>setShowDropDown(false)}  />:null}
        </React.Fragment>
    )
};


export default TopBar;