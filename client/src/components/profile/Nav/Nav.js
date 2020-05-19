import React from "react";
import "./Nav.css";

const Nav =(props)=>{

    return(
        <nav className={props.show?"profile-nav show" : "profile-nav"}>

        </nav>
    )

};

export default Nav;