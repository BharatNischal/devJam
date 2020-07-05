import React, { useState,useContext} from "react";
import "./learnerStyle.css";
import Dp from "../profile/CLIP.png";
import Dropdown from "./dropdown";
import {CurUserContext} from "../../contexts/curUser";
import BellImg  from "./bellLogo.png";
import Notification from "./Notification";
import Axios from "axios";
import { Link } from "react-router-dom";

const TopBar = (props)=>{
    const [showDropDown,setShowDropDown] = useState(false);
    const [showNotification,setShowNotification] = useState(false);
    const {setUser,user} = useContext(CurUserContext);

    function changeStatus(index){
        if(!user.notifications[user.notifications.length-index-1].read){
            const duplicate=JSON.parse(JSON.stringify(user));
            duplicate.notifications[user.notifications.length-index-1].read=true;
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
            <Link to="/home" ><h1 >LrnrHub</h1></Link>
            <div>
                <span className="mr-2 "> <Link to="/codingQuestions" className="text-white"> <b>Programming</b> </Link> </span>
                <span className="mr-2 "> <Link to="/uiQuestions" className="text-white"> <b>Frontend</b> </Link> </span>
                <span className="mr-2 "> <Link to="/learner/courses" className="text-white"> <b>Courses</b> </Link> </span>
                <span className="mr-2 "> <Link to="/allTests" className="text-white"> <b>Tests</b> </Link> </span>
                <div className="dpWrapper cursor-pointer mr-2 d-inline-block" style={{position:"relative"}} onClick={()=>setShowNotification(true)} >
                     <img alt="profilePic" src={BellImg} />
                     <span className="numIndicator rounded-circle" > {user.notifications?user.notifications.filter(n=>n.read==false).length:""} </span> </div>
                <div className="dpWrapper cursor-pointer d-inline-block" onClick={()=>setShowDropDown(true)}> <img alt="profilePic" src={user.profilePic?user.profilePic:Dp} /></div>
            </div>
        </div>
            {showNotification?<Notification close={()=>setShowNotification(false)} changeStatus={changeStatus} data={user.notifications.slice().reverse()} />:null}
            {showDropDown?<Dropdown close={()=>setShowDropDown(false)}  />:null}
        </React.Fragment>
    )
};


export default TopBar;
