import React, { useState } from 'react';
import Nav from "../profile/Nav/Nav";
import "./codingPlatform.css";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function AddQuestion(props) {
    const [activeTab,setActiveTab] =useState("description");
    const [descriptionEditorState,setDescriptionEditorState] = useState(EditorState.createEmpty());
    const [sampleEditorState,setSampleEditorState] = useState(EditorState.createEmpty());

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
                            <input type="text" className="form-control"   placeholder="Enter Question Title" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-1 f-20 " ><b> Points </b></div>
                            <input type="number" className="form-control"   placeholder="Enter Points" />
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
                            <React.Fragment>
                                <h2 className="topicTitle text-pink mb-2"  ><b>Description</b></h2>
                                
                                <Editor
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    editorState={descriptionEditorState}
                                    onEditorStateChange={(editorState)=>setDescriptionEditorState(editorState)}
                                    toolbar={{
                                        options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history']
                                    }}
                                />
                                
                            </React.Fragment>
                        :null}
                        {activeTab=="sampleCases"?
                            <React.Fragment>
                                <h2 className="topicTitle text-pink mb-2"  ><b>Sample Cases</b></h2>
                                <Editor
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    editorState={sampleEditorState}
                                    onEditorStateChange={(editorState)=>setSampleEditorState(editorState)}
                                    toolbar={{
                                        options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history']
                                    }}
                                />
                            </React.Fragment>
                        :null}
                        {activeTab=="inputOutput"?
                            <React.Fragment>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h2 className="topicTitle text-pink mb-2"  ><b>Input Format</b></h2>
                                        <Editor
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                            editorState={sampleEditorState}
                                            onEditorStateChange={(editorState)=>setSampleEditorState(editorState)}
                                            toolbar={{
                                                options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history']
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <h2 className="topicTitle text-pink mb-2"  ><b>Output Format</b></h2>
                                        <Editor
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                            editorState={sampleEditorState}
                                            onEditorStateChange={(editorState)=>setSampleEditorState(editorState)}
                                            toolbar={{
                                                options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history']
                                            }}
                                        />
                                    </div>
                                </div>
                            </React.Fragment>
                        :null}
                        {activeTab=="testCases"?
                            <React.Fragment>
                                <h2 className="topicTitle text-pink mb-2"  ><b>Test Cases</b></h2>

                                <div className=" mb-3">
                                    <div className=" row">
                                        <div className="col-md-6">
                                            <h6>Input</h6>
                                            <div className="form-group">
                                                <textarea className="form-control" rows="4" ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <h6> Output</h6>
                                            <div className="form-group">
                                                <textarea className="form-control" rows="4" ></textarea>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="custom-control custom-switch " >
                                            <input type="checkbox" className="custom-control-input" id="isHidden" />
                                            <label className="custom-control-label" htmlFor="isHidden" >Hidden</label>
                                        </div>
                                        <div><button className="btn btn-grad float-right"> Add Test Case </button></div>
                                    </div>
                                    <hr className="mt-2" />
                                </div>
                                <div className=" mb-3">
                                    <h5>  Test Case #1 <i className="fa fa-lock text-pink ml-2 "></i></h5>
                                    <div className=" row">
                                        <div className="col-md-6">
                                            <h6>Input</h6>
                                            <div className="form-group">
                                                <textarea className="form-control" rows="3" disabled={true} ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <h6> Output</h6>
                                            <div className="form-group">
                                                <textarea className="form-control" rows="3" disabled={true}></textarea>
                                            </div>
                                        </div>

                                    </div>
                                    
                                </div>
                                <div className=" mb-3">
                                    <h5>  Test Case #2 <i className="fa fa-unlock text-pink ml-2 "></i>  </h5>
                                    <div className=" row">
                                        <div className="col-md-6">
                                            <h6>Input</h6>
                                            <div className="form-group">
                                                <textarea className="form-control" rows="3" disabled={true} ></textarea>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <h6> Output</h6>
                                            <div className="form-group">
                                                <textarea className="form-control" rows="3" disabled={true}></textarea>
                                            </div>
                                        </div>

                                    </div>
                                    
                                </div>
                            </React.Fragment>
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

