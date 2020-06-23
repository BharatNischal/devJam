import React, { useState } from 'react';
import Nav from '../profile/Nav/Nav';
import placeholder from "./Placeholder.png";

function PublishTest(props) {
    
    //UI STATES
    const [focusInp,setFocusInp] = useState(false);

    return (
        <React.Fragment>
            <Nav show={true}/>
            <div className="bgwhiteoverlay" ></div>
            <div className="container text-left" style={{marginTop:"100px"}}>
                <div className="row">
                    <div className="col-12 p-3">
                        <div className=" p-3  shadow" style={{borderRadius:"18px",backgroundColor:"rgb(255, 235, 249)"}}>
                            <h2 className="topicTitle mainH text-left text-pink" >
                                    Test Title 
                            </h2>
                                <span className="cursor-pointer p-2 pb-4" onClick={()=>props.history.push("/test")}><i className="fa fa-arrow-left anim-hil text-pink"></i> Go Back</span><br/>
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <div className="round border p-3" style={{minHeight:"200px",backgroundColor:"#fcfcfc"}}>
                            <div className="d-flex justify-content-between align-content-center ">
                                <h2> Students </h2>
                                <div><button className="btn btn-outline-grad"> Publish </button></div>
                            </div>
                            <div className="row align-content-center justify-content-center mt-3">
                                <div className="col-md-3 pt-2">
                                    <div className="custom-control custom-checkbox d-inline" >
                                        <input type="checkbox" className="custom-control-input" id="isSelectAll"   />
                                        <label className="custom-control-label" htmlFor="isSelectAll" >Select All</label>
                                    </div>

                                </div>
                                <div className="col-md-9">
                                    <div className={focusInp?"srch focus w-100 ml-0":"srch w-100 ml-0"} style={{height:"40px"}}>
                                        <input type="text" onFocus={()=>{setFocusInp(true)}} onBlur={()=>{setFocusInp(false)}}   placeholder="Type to Search Topics" ></input>
                                        <span className="float-right pr-3 srchIcon"><i className="fa fa-search"></i></span>
                                    </div>
                                </div>
                                <div className="col-md-6  pl-5" style={{height:"500px"}}>
                                    <div className="custom-control custom-checkbox mt-3" >
                                        <input type="checkbox" className="custom-control-input" id="user1"   />
                                        <label className="custom-control-label" htmlFor="user1" >
                                            <img src={placeholder} style={{width:"40px",height:"40px",objectFit:"cover"}} className="rounded-circle" /> 
                                            &nbsp;&nbsp; Manjot Singh   
                                        </label>
                                    </div>

                                    
                                    <div className="custom-control custom-checkbox mt-3" >
                                        <input type="checkbox" className="custom-control-input" id="user1"   />
                                        <label className="custom-control-label" htmlFor="user1" >
                                            <img src={placeholder} style={{width:"40px",height:"40px",objectFit:"cover"}} className="rounded-circle" /> 
                                            &nbsp;&nbsp; Manjot Singh   
                                        </label>
                                    </div>

                                    <div className="custom-control custom-checkbox mt-3" >
                                        <input type="checkbox" className="custom-control-input" id="user1"   />
                                        <label className="custom-control-label" htmlFor="user1" >
                                            <img src={placeholder} style={{width:"40px",height:"40px",objectFit:"cover"}} className="rounded-circle" /> 
                                            &nbsp;&nbsp; Manjot Singh   
                                        </label>
                                    </div>

                                    <div className="custom-control custom-checkbox mt-3" >
                                        <input type="checkbox" className="custom-control-input" id="user1"   />
                                        <label className="custom-control-label" htmlFor="user1" >
                                            <img src={placeholder} style={{width:"40px",height:"40px",objectFit:"cover"}} className="rounded-circle" /> 
                                            &nbsp;&nbsp; Manjot Singh   
                                        </label>
                                    </div>


                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}


export default PublishTest;

