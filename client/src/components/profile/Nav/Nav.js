import React from "react";
import "./Nav.css";
import {Link} from "react-router-dom";

const Nav =(props)=>{

    return(
        <nav className={props.show?"navbar navbar-dark navbar-expand-lg profile-nav show  " : "navbar navbar-dark navbar-expand-lg profile-nav"}>
           {props.menu?(
               <React.Fragment>
                   <Link className="navbar-brand" to="/login">Profile Generator</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                        
                        {props.isLogin?(
                            <React.Fragment>
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/profiles">Profiles</Link>
                                </li>
                                <li className="nav-item ">
                                    <Link className="nav-link" to="/createProfile">Create Profile</Link>
                                </li>
                                {props.isSuperAdmin?(
                                    <li className="nav-item ">
                                        <Link className="nav-link" to="/adminDashboard">Dashboard</Link>
                                    </li>
                                ):null}
                                <li className="nav-item">
                                    <Link className="nav-link" to="#" onClick={props.logout} > Logout </Link>
                                </li>
                            </React.Fragment>):(
                            <li className="nav-item active">
                                <Link className="nav-link" to="/login">Login </Link>
                            </li>)}
                        </ul>
                    </div>
               </React.Fragment>
           ):(
            <React.Fragment>
            <div>
                <div className="navImg profileImg" >
                    <div style={{backgroundImage:props.dp}}></div>
                </div>
            </div>
            <div className="navTitleCont">
                <h1 className="navTitle"> {props.name} </h1>
            </div>
            </React.Fragment>)}
            

            {/* <a className="navbar-brand" href="#">Navbar</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                    <Link className="nav-link" to="/profiles">Home <span className="sr-only">(current)</span></Link>
                </li>
                
                </ul>
            </div> */}
        </nav>
    )

};

export default Nav;