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
    const [isTimed,setIsTimed] = useState(false);
    const [time,setTime] = useState(0);
    const [status,setStatus] = useState("Draft");
    const [question,setQuestion] = useState({});
    const [topic,setTopic] = useState([]);
    const [saveAlert,setSaveAlert] = useState(false);
    const [btnclickSave,setBtnClickSave] = useState(false);
    const [btnclickPublish,setBtnClickPublish] = useState(false);



    // Get data from database
    useEffect(()=>{

      axios.get(`/coding/question/${props.match.params.id}`)
        .then(res=>{
          if(res.data.success){
              setQuestion(res.data.question);
              setStatus(res.data.question.status);
              setTopic(res.data.question.topic?res.data.question.topic.split(" ").map(val=>({label:val,value:val})):[])
              if(res.data.question.time&&res.data.question.time>0){
                setIsTimed(true);
                setTime(res.data.question.time);
              }
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })

    },[])

    // Save the progress
    function handleSave() {
        const newQuestion = {...question};
        newQuestion.topic = topic.map(t=>(t.value)).join(" ");
        if(isTimed){
          newQuestion.time = time;
        }
        axios.put(`/coding/question/${props.match.params.id}`,{question:newQuestion})
          .then(res=>{
            setBtnClickSave(true);
            if(res.data.success){
              console.log("Saved");
              setBtnClickSave(false);
              setSaveAlert(true);
              setTimeout(()=>{ setSaveAlert(false); },2000)
            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
    }

    // Publishes a new Question which is then accessible to students
    function handlePublish() {
      setBtnClickPublish(true);
      axios.put(`/coding/question/${props.match.params.id}/status`,{status:"Published"})
        .then(res=>{
          if(res.data.success){
            setStatus("Published");
            setBtnClickPublish(false);
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    }

    return (
        <React.Fragment>
            <Nav show={true} menu={true}/>
            {saveAlert?<div className="custom-alert"> Question Saved</div>:null}
            <div className="bgwhiteoverlay"> </div>
            <div className="container" style={{marginTop:"120px"}} >
                <div className="d-flex justify-content-between">
                    <h1 className="topicTitle mainH text-left text-pink">Add Question</h1>
                    <div>

                        {btnclickSave?<div type="submit" className="btn btn-grad ml-2"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" className="loader"/></div>:<button className="btn btn-outline-grad ml-2" onClick={handleSave}> Save </button>}
                        {status=="Draft"?(btnclickPublish?<div type="submit" className="btn btn-grad ml-2"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" className="loader"/></div>:<button className="btn btn-outline-grad ml-2" onClick={handlePublish}> Publish </button>):null}


                    </div>
                </div>
                <div className="pl-2 text-left"> <span className="cursor-pointer p-2 pb-4"><i className="fa fa-arrow-left anim-hil text-pink" onClick={()=>props.history.push('/codingQuestions')}></i> Go Back</span><br/></div>
                <div className="row my-5" >
                    <div className="col-md-8">
                        <div className="form-group input-group ">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-pencil" ></i></div>
                            <input type="text" className="form-control"   placeholder="Enter Question Title" value={question&&question.title?question.title:""} onChange={(e)=>setQuestion({...question,title:e.target.value})} />
                        </div>
                        <div className="d-flex align-items-center">
                            <div className="mr-2 text-left" style={{width:"100px"}} > <b> Select Topics </b> </div>
                            <div style={{minWidth:"200px"}}>
                                <Select
                                    options={[{value:"Algo",label:"Algo"},{value:"Algo1",label:"Algo1"},{value:"Algo2",label:"Algo2"}]}
                                    isMulti
                                    value={topic}
                                    onChange={(e)=>setTopic(e)}

                                />
                            </div>
                        </div>
                        <div className="d-flex mt-2 align-items-center" >
                            <div className="mr-2 text-left" style={{width:"100px"}} > <b> Difficulty </b> </div>
                            <div style={{ minWidth:"200px" }} >
                                <select className="form-control" value={question&&question.difficulty?question.difficulty:"easy"} onChange={(e)=>setQuestion({...question,difficulty:e.target.value})} >
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
                            <input type="number" className="form-control"   placeholder="Enter Points" value={question&&question.points?question.points:""} onChange={(e)=>setQuestion({...question,points:e.target.value})} />
                        </div>
                        <div className="text-left px-lg-4">
                            <div className="custom-control custom-checkbox d-inline" >
                                <input type="checkbox" className="custom-control-input" id="customCheck1" checked={isTimed} onChange={(e)=>setIsTimed(e.target.checked)} />
                                <label className="custom-control-label" htmlFor="customCheck1">Timed</label>
                            </div>
                            {isTimed?<input type="number" value={time} onChange={(e)=>setTime(e.target.value)}  className="form-control d-inline" placeholder="Minutes" style={{width:"100px",marginLeft:"10px",height:"25px"}} />:null}
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
                            <Description question={question} setQuestion={setQuestion}/>
                        :null}
                        {activeTab=="sampleCases"?
                            <SampleCases question={question} setQuestion={setQuestion}/>
                        :null}
                        {activeTab=="inputOutput"?
                            <InputOutput question={question} setQuestion={setQuestion}/>
                        :null}
                        {activeTab=="testCases"?
                            <TestCases question={question} setQuestion={setQuestion}/>
                        :null}
                        {activeTab=="limits"?
                            <Limits question={question} setQuestion={setQuestion}/>
                        :null}
                        {activeTab=="solution"?
                            <Solution question={question} setQuestion={setQuestion}/>
                        :null}
                        {activeTab=="starterCode"?
                            <StarterCode question={question} setQuestion={setQuestion}/>
                        :null}
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default AddQuestion;
