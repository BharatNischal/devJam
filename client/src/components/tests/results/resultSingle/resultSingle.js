import React, { useState } from 'react';
import Nav from '../../../profile/Nav/Nav';
import UserImg from "../../../profile/CLIP.png";
import Select from "react-select";
import Placeholder from "../../Placeholder.png";
import MCQ from './mcq';
import MGrid from './mGrid';

function ResultSingle(props) {
    const [curIndex,setCurIndex] = useState(0);

    const options=[
        {
            value:"0",
            label:(
            <div className="d-flex w-100 justify-content-between"><div className="d-flex align-content-center " style={{fontSize:"20px"}}>
                <div className="mr-2"><img src={UserImg} style={{width:"30px",height:"30px",objectFit:"cover"}} className="rounded-circle" /> </div>
                    <div>Manjot Singh</div>
                </div>
                <div className="mr-2" style={{fontSize:"13px"}}> <b> Handed In </b>  </div>
            </div>
        )},
        {
            value:"1",
            label:(
            <div className="d-flex w-100 justify-content-between"><div className="d-flex align-content-center " style={{fontSize:"20px"}}>
                <div className="mr-2"><img src={UserImg} style={{width:"30px",height:"30px",objectFit:"cover"}} className="rounded-circle" /> </div>
                    <div>Manjot </div>
                </div>
                <div className="mr-2" style={{fontSize:"13px"}}> <b> Handed In </b>  </div>
            </div>
        )}
    ];
    return (
        <React.Fragment>
            <Nav show={true} menu={true}/>
            <div className="bgwhiteoverlay" ></div>
            <div className="container text-left" style={{marginTop:"100px"}}>
                <div className="row">
                    <div className="col-12 px-3 py-2">
                    <div className=" p-3  shadow" style={{borderRadius:"18px",backgroundColor:"rgb(255, 235, 249)"}}>
                        <h2 className="topicTitle mainH text-left text-pink" style={{display:"flex",justifyContent:"space-between"}}>
                            <div> Test Name </div>
                        </h2>
                        <span className="cursor-pointer p-2 pb-4" onClick={()=>props.history.push("/test")}><i className="fa fa-arrow-left anim-hil text-pink"></i> Go Back</span><br/>
                    </div>
                    </div>
                
                    <div className="col-lg-6 mt-3">
                        <Select
                            options={options}
                            isSearchable={false}
                            value={options[curIndex]}
                            onChange={(e)=>{setCurIndex(Number(e.value))}}
                            getOptionLabel={option => option.label}
                            classNamePrefix="react-select"
                            className="p-2"
                        />
                    </div>
                    <div className="col-lg-6 mt-2 mt-lg-3 d-flex align-items-center justify-content-between">
                        <div className="ml-4 ml-lg-0">
                            <span style={{fontSize:"25px"}} className="mr-4 hover-pink pointer" > <i className="fa fa-less-than"></i> </span>
                            <span style={{fontSize:"25px"}} className="mr-3 hover-pink pointer" > <i className="fa fa-greater-than"></i> </span>
                        </div>
                        
                        <div className="d-flex">
                            <div className="text-center mr-4">
                                <div>AutoGrade</div>
                                <h4><b> 20 / 30</b></h4>
                            </div>

                            <div className="text-center">
                                <div>Final</div>
                                <h4><b> 29 / 30</b></h4>
                            </div>
                        </div>

                    </div>

                    <div className="col-12 d-flex justify-content-between mt-4">
                        <div className="ml-4">
                            <select className="form-control d-inline-block mr-3" style={{width:"200px"}} >
                                <option value="none"> None </option>
                                <option value="Right"> Right </option>
                                <option value="Wrong"> Wrong </option>
                                <option value="Not Submitted"> Not Submitted </option>
                            </select>
                            <button className="btn btn-link">Clear</button>
                        </div> 
                        <div>                       
                            <button className="btn btn-grad "> Release</button>    
                        </div>
                    </div>
                    <div className="col-12 my-5" >
                        
                        {/* Question Starts Here */}
                        <div className="col-12 my-4">
                        <div style={{border:"1px solid #c1c1c1",backgroundColor:"#f9f9f9", borderRadius:"18px",padding:"20px"}} >
                            <div className="row p-0 " style={{alignItems:"center"}} >
                                <div className="col-md-8 col-lg-9">
                                    <h5 className="text-success" ><b> <i className="fa fa-check mr-1"></i>  Which Of The Following Statements are True? </b></h5>
                                </div>
                                <div className="col-md-4 col-lg-3 text-right">
                                     <input type="number" className="comment-inp text-right" style={{width:"70px"}} />
                                     <span className="h4" > / 50</span>   
                                </div>
                                
                            </div>
                            <hr/>
                            <div className="qImg mb-3 text-center"  >
                                <img src={Placeholder} style={{maxHeight:"200px"}} className="img-fluid" />
                            </div>
                            <MCQ/>
                            <div className="mt-3">
                                <input className="comment-inp w-100" placeholder="Add Individual Feedback " ></input>
                            </div>
                        
                        </div>
                        </div>

                        {/* Question Starts Here */}
                        <div className="col-12 my-4">
                        <div style={{border:"1px solid #c1c1c1",backgroundColor:"#f9f9f9", borderRadius:"18px",padding:"20px"}} >
                            <div className="row p-0 " style={{alignItems:"center"}} >
                                <div className="col-md-8 col-lg-9">
                                    <h5 className="text-success" ><b> <i className="fa fa-check mr-1"></i>  Which Of The Following Statements are True? </b></h5>
                                </div>
                                <div className="col-md-4 col-lg-3 text-right">
                                     <input type="number" className="comment-inp text-right" style={{width:"70px"}} />
                                     <span className="h4" > / 50</span>   
                                </div>
                                
                            </div>
                            <hr/>
                            <div className="qImg mb-3 text-center"  >
                                <img src={Placeholder} style={{maxHeight:"200px"}} className="img-fluid" />
                            </div>
                            <MGrid/>
                            <div className="mt-3">
                                <input className="comment-inp w-100" placeholder="Add Individual Feedback " ></input>
                            </div>
                        
                        </div>
                        </div>
                       
                        {/* Question Starts Here */}
                        <div className="col-12 my-4">
                        <div style={{border:"1px solid #c1c1c1",backgroundColor:"#f9f9f9", borderRadius:"18px",padding:"20px"}} >
                            <div className="row p-0 " style={{alignItems:"center"}} >
                                <div className="col-md-8 col-lg-9">
                                    <h5 className="text-danger" ><b> <i className="fa fa-close mr-1"></i>  Which Of The Following Statements are True? </b></h5>
                                </div>
                                <div className="col-md-4 col-lg-3 text-right">
                                     <input type="number" className="comment-inp text-right" style={{width:"70px"}} />
                                     <span className="h4" > / 50</span>   
                                </div>
                                
                            </div>
                            <hr/>
                            <div className="qImg mb-3 text-center"  >
                                <img src={Placeholder} style={{maxHeight:"200px"}} className="img-fluid" />
                            </div>
                            <div>
                                <h4>Answer: </h4>
                                <p>
                                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.
                                </p>
                            </div>
                            <div className="mt-3">
                                <input className="comment-inp w-100" placeholder="Add Individual Feedback " ></input>
                            </div>
                        
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}



export default ResultSingle;

