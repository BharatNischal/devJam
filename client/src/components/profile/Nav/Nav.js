import React from "react";
import "./Nav.css";

const Nav =(props)=>{

    return(
        <nav className={props.show?"profile-nav show" : "profile-nav"}>
            <div>
                <div className="navImg profileImg" >
                    <div style={{backgroundImage:props.dp}}></div>
                </div>
            </div>
            <div className="navTitleCont">
                <h1 className="navTitle"> {props.name} </h1>
            </div>
        </nav>
    )

};

export default Nav;