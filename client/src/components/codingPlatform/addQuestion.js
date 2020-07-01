import React, { useState,useEffect } from 'react';
import Nav from "../profile/Nav/Nav";
import "./codingPlatform.css";
import Description from './description';
import TestCases from './TestCases';
import InputOutput from './inputOutput';
import SampleCases from './sampleCases';
import axios from 'axios';


function AddQuestion(props) {
    const [activeTab,setActiveTab] =useState("description");
    const [title,setTitle] = useState("");
    const [points,setPoints] = useState(0);


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
                    </div>
                    <div className="col-md-4">
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-1 f-20 " ><b> Points </b></div>
                            <input type="number" className="form-control"   placeholder="Enter Points" value={points} onChange={(e)=>setPoints(e.target.value)} />
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
                        <div className={activeTab=="solution"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("limits")} > Solution </div>
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
                            <React.Fragment>
                                <h2 className="topicTitle text-pink mb-2"  ><b>Constraints</b></h2>
                                <Editor
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="constraintWrapper"
                                    editorClassName="editorClassName"
                                    editorState={sampleEditorState}
                                    onEditorStateChange={(editorState)=>setSampleEditorState(editorState)}
                                    toolbar={{
                                        options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'emoji', 'remove', 'history']
                                    }}
                                />
                                <div className=" row my-4">
                                    <div className="col-md-6">
                                        <h4 className="text-pink"> <b>Time Limit (Seconds) </b> </h4>
                                        <div className="form-group input-group px-lg-4">
                                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " > <i className="fa fa-clock"></i> </div>
                                            <input type="number" className="form-control"   placeholder="Enter Time" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <h4 className="text-pink"> <b>Memory Limit (KB) </b> </h4>
                                        <div className="form-group input-group px-lg-4">
                                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " > <i className="fas fa-memory"></i> </div>
                                            <input type="number" className="form-control"   placeholder="Enter Memory Limit" />
                                        </div>
                                    </div>

                                </div>
                                
                            </React.Fragment>
                        :null}
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default AddQuestion;
