import React from 'react';
import BellImg  from "./bellLogo.png";

function Notification(props) {
    return (
        <React.Fragment>
            <div className="d-backdrop" onClick={props.close}></div>
            <div className="dropdown" style={{width:"280px" ,height:"400px",overflow:"hidden",top:"80px"}}>
                <div className="p-2" style={{width:"100%",height:"100%",overflowY:"scroll"}}>

                    {props.data?props.data.map((notification,i)=>(
                         <div key={i} className={notification.read?"d-flex p-2 mb-3 notification-card":"d-flex p-2 mb-3 notification-card unread" }>
                            <div>
                            <img alt="icon" src={BellImg} style={{width:"60px"}}/>
                            </div>
                            <div className="text-left ml-1" style={{fontSize:"12px"}}>
                                <p className="m-0"> {notification.notification?notification.notification.title:""} </p>
                                <div className="text-right" > <a className="btn btn-grad p-1" style={{fontSize:"14px"}} target="_blank" href={notification.notification?notification.notification.link:""} onClick={()=>{props.changeStatus(i)}} > 
                                {notification.notification?
                                    (notification.notification.type?
                                        (notification.notification.type=="test"?"Give Test"
                                            :notification.notification.type=="result"?"View Results":"View Course"):""):""} 
                                </a> </div>
                            </div>
                        </div>
                    )):null}



                </div>
            </div>
        </React.Fragment>
    )
}


export default Notification
