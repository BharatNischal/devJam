import React,{useState} from 'react';
import "./liveTest.css";
import placeholder from "../Placeholder.png";
import MCQ from './mcq';
import Paragraph from './paragraph';
import MGrid from './mGrid';
import axios from "axios";
import { withRouter } from 'react-router-dom';

function Question(props) {

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return `${h}:${m}:${s}`;
}

    function handleFinishTest() {
      axios.put(`/testSubmission/${props.submissionId}/complete`)
        .then(res=>{
          if(res.data.success){
            props.history.push('/test/finished');
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
           <div className="d-flex justify-content-between">
               <h1 className="timer">{secondsToHms(props.timer)}</h1>
               <div> <button className="btn btn-outline-grad" onClick={handleFinishTest}> Finish </button></div>
           </div>
           <hr/>
           <div className="progress" style={{height:"15px",backgroundColor:"#dabec2"}}>
                <div className="progress-bar progress-bar-striped bgd-gradient" style={{width:`${props.attempted/props.totalQues*100}%`}} role="progressbar"  aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
           </div>
           <div className="text-left p-3"> Question <b>{props.curIndex+1}/{props.totalQues}</b></div>
           {props.question.type=="mcq"?<MCQ question={props.question} setCurIndex={props.setCurIndex} curIndex={props.curIndex} totalQues={props.totalQues} setAnswers={props.setAnswers} answers={props.answers} />
         :(props.question.type=="mcqGrid"?<MGrid question={props.question} setCurIndex={props.setCurIndex} curIndex={props.curIndex} totalQues={props.totalQues} setAnswers={props.setAnswers} answers={props.answers} />
       :<Paragraph question={props.question} setCurIndex={props.setCurIndex} curIndex={props.curIndex} totalQues={props.totalQues} setAnswers={props.setAnswers} answers={props.answers} />)}

            <div className="navigator row mt-5">
                <div className="col-md-4 text-left">
                    <div><span className="onlyind submitted-q" style={{width:"30px",height:"30px",padding:"0"}}> &nbsp; </span> Submitted </div>
                    <div><span className="onlyind not-submitted-q" style={{width:"30px",height:"30px",padding:"0"}}> &nbsp; </span> Not Submitted </div>

                    <h5 className="mt-2" >Filter</h5>
                    <select className="form-control">
                        <option value="all"> All</option>
                        <option value="submitted"> Submitted</option>
                        <option value="notSubmitted"> Not Submitted</option>
                    </select>
                </div>
                <div className="col-md-8 d-flex flex-wrap">
                  {props.answers.map((ans,i)=>(
                    <div className={ans.answer?"ind submitted-q":"ind not-submitted-q"} onClick={()=>props.setCurIndex(i)}>{i+1}</div>
                  ))}
                </div>
            </div>
       </React.Fragment>
    )
}


export default withRouter(Question);
