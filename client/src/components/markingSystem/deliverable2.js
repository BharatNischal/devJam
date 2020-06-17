import React from 'react';
import Nav from '../profile/Nav/Nav';
import UserImg from "../profile/CLIP.png";
import Select from "react-select";

function deliverable2(props) {
    return (
        <React.Fragment>
            <Nav show={true} />
            <div className="bgwhiteoverlay" ></div>
            <div className="container text-left" style={{marginTop:"100px"}}>
                <div className="row">
                    <div className="col-12 p-3">
                    <div className=" p-3  shadow" style={{borderRadius:"18px",backgroundColor:"rgb(255, 235, 249)"}}>
                        <h2 className="topicTitle mainH text-left text-pink" style={{display:"flex",justifyContent:"space-between"}}>
                                <div> Deliverable Title  </div>
                                <div className="p-lg-3 p-2 bg-grad text-white rounded-circle shadow " style={{fontSize:"20px",maxHeight:"54px"}}> 50 </div>
                        </h2>
                            <span className="cursor-pointer p-2 pb-4" onClick={()=>props.history.push("/marks")}><i className="fa fa-arrow-left anim-hil text-pink"></i> Go Back</span><br/>
                    </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="mt-3 p-0 p-md-3 d-flex ">
                            <div className="px-2 px-md-3">
                                <span className="bg-grad text-center text-white text-center rounded-circle shadow py-1" style={{fontSize:"19px",height:"39px",width:"39px",display:"inline-block"}}> <i className="fas fa-clipboard-check"> </i> </span>
                                <b className="pl-1 pl-md-2">50 Points</b>
                            </div>
                            <div className="px-2 px-md-3">
                                <span className="bg-grad text-center text-white text-center rounded-circle shadow py-1" style={{fontSize:"19px",height:"39px",width:"39px",display:"inline-block"}}> <i className="fa fa-calendar-alt"> </i> </span>
                                <b className="pl-1 pl-md-2">16, June, 2020</b>
                            </div>
                            
                        </div>
                        <div className="mt-3 pl-2 resp-70">
                            <h3>Description</h3>
                            <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                        </div>

                        <div className="mt-3 pl-2">
                            <h3 className="mb-0">Submissions</h3>
                        </div>

                    </div>
                    <div className="col-lg-4 mt-1 order-lg-2">
                        <div className="p-3 shadow mt-lg-5" style={{borderRadius:"18px",minHeight:"150px",backgroundColor:"#f8f8f8"}}>
                            <h4 className="mb-2">Filters</h4>
                            
                            <Select
                                className="mb-2" 
                                placeholder="Sort "
                             />
                            <Select/>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-1 mb-5 " >
                        <div className="p-2" style={{position:"relative"}}>
                        
                        <div className="row delTable mt-2  resp-70 ml-md-3" >
                            <div className="col-6 p-2 border headTable"> Name </div>
                            <div className="col-6 p-2 border headTable"> Marks </div>
                            <div className="col-6 p-2 border item"> Manjot </div>
                            <div className="col-6 p-2 border item"> 50 </div>
                            
                            <div className="col-6 p-2 border item"> Manjot </div>
                            <div className="col-6 p-2 border item"> 50 </div>
                            
                            <div className="col-6 p-2 border item"> Manjot </div>
                            <div className="col-6 p-2 border item"> 50 </div>
                            
                            <div className="col-6 p-2 border item"> Manjot </div>
                            <div className="col-6 p- border item"> 50 </div>
                            
                        </div>
                        </div>
                   -
                    </div>
                    
                    
                </div>
            </div>
        </React.Fragment>
    )
}



export default deliverable2

