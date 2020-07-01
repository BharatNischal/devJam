import React, { useState,useEffect } from 'react';
import Nav from "../profile/Nav/Nav";
import "./codingPlatform.css";
import Description from './description';
import TestCases from './TestCases';
import InputOutput from './inputOutput';
import SampleCases from './sampleCases';
import axios from 'axios';
import Limits from './limits';
import Solution from './Solution';
import StarterCode from './starterCode';
import Select from 'react-select';


function AddQuestion(props) {
    const [activeTab,setActiveTab] =useState("description");
    const [title,setTitle] = useState("");
    const [points,setPoints] = useState(0);
    const [isTimed,setIsTimed] = useState(false);

    // Get data from database
    useEffect(()=>{

      axios.get(`/coding/question/${props.match.params.id}`)
        .then(res=>{
          if(res.data.success){

          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })

    },[])


    return (
        <React.Fragment>
            <Nav show={true} menu={true}/>
            <div className="bgwhiteoverlay"> </div>
            <div className="container" style={{marginTop:"120px"}} >
                <div className="d-flex justify-content-between">
                    <h1 className="topicTitle mainH text-left text-pink">Add Question</h1>
                    <div>
                        <span className="h3" style={{position:"relative", top:"5px" }}  > <i className="fa fa-eye  hover-pink pointer" ></i></span>

                        <button className="btn btn-outline-grad ml-2" > Save </button>
                        <button className="btn btn-outline-grad ml-2" > Publish </button>


                    </div>
                </div>
                <div className="pl-2 text-left"> <span className="cursor-pointer p-2 pb-4" ><i className="fa fa-arrow-left anim-hil text-pink"></i> Go Back</span><br/></div>
                <div className="row my-5" >
                    <div className="col-md-8">
                        <div className="form-group input-group ">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-pencil" ></i></div>
                            <input type="text" className="form-control"   placeholder="Enter Question Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="mr-2 text-left" style={{width:"100px"}} > <b> Select Topics </b> </div>
                            <div style={{minWidth:"200px"}}>
                                <Select
                                    options={[{value:"Algo",label:"Algo"},{value:"Algo1",label:"Algo1"},{value:"Algo2",label:"Algo2"}]}
                                    isMulti
                                    onChange={(e)=>{console.log(e)}}
                                    
                                />
                            </div>
                        </div>
                        <div className="d-flex mt-2 align-items-center" >
                            <div className="mr-2 text-left" style={{width:"100px"}} > <b> Difficulty </b> </div>
                            <div style={{ minWidth:"200px" }} >
                                <select className="form-control"  >
                                    <option value="easy" > Easy </option>
                                    <option value="medium" > Medium </option>
                                    <option value="hard" > Hard </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-1 f-20 " ><b> Points </b></div>
                            <input type="number" className="form-control"   placeholder="Enter Points" value={points} onChange={(e)=>setPoints(e.target.value)} />
                        </div>
                        <div className="text-left px-lg-4">
                            <div className="custom-control custom-checkbox d-inline" >
                                <input type="checkbox" className="custom-control-input" id="customCheck1" checked={isTimed} onChange={(e)=> setIsTimed(e.target.checked)} />
                                <label className="custom-control-label" htmlFor="customCheck1">Timed</label>
                            </div>
                            {isTimed?<input type="number"  className="form-control d-inline" placeholder="Minutes" style={{width:"100px",marginLeft:"10px",height:"25px"}} />:null} 
                        </div>
                    </div>
                </div>
                <div className="tabs mb-5">
                    <div className="d-flex tabH" style={{flexGrow:"1"}}>
                        <div className={activeTab=="description"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("description")} > Description </div>
                        <div className={activeTab=="sampleCases"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("sampleCases")} > Sample Cases </div>
                        <div className={activeTab=="inputOutput"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("inputOutput")} > Input / Output </div>
                        <div className={activeTab=="testCases"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("testCases")} > Test Cases </div>
                        <div className={activeTab=="limits"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("limits")} > Limits & Constraints </div>
                        <div className={activeTab=="solution"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("solution")} > Solution </div>
                        <div className={activeTab=="starterCode"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("starterCode")} > Starter Code </div>
                    </div>
                    <div className="tabCont p-3">
                        {activeTab=="description"?
                            <Description />
                        :null}
                        {activeTab=="sampleCases"?
                            <SampleCases />
                        :null}
                        {activeTab=="inputOutput"?
                            <InputOutput />
                        :null}
                        {activeTab=="testCases"?
                            <TestCases />
                        :null}
                        {activeTab=="limits"?
                            <Limits/>
                        :null}
                        {activeTab=="solution"?
                            <Solution/>
                        :null}
                        {activeTab=="starterCode"?
                            <StarterCode/>
                        :null}
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default AddQuestion;
