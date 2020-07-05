import React,{useEffect,useState,useContext,useRef} from 'react';
import {CurUserContext} from '../../../contexts/curUser';
import axios from "axios";
import TopBar from '../../learnerPlatform/TopBar';
import Problem from './Problem';
import Leaderboard from './Leaderboard';
import Editorial from './Editorial';
import Submission from './submission/submission';

export default function StudentQuestion(props) {

  const [mySubmissions,setMySubmissions] = useState([]);
  const [question,setQuestion] = useState({title:"",description:"",constraints:"",inputFormat:"", outputFormat:"",sample:"",testCases:[],points:0});
  const [limits,setLimits] = useState({timeLimit:0,memoryLimit:0})
  const [editorial,setEditorial] = useState({solution:"",editorial:"",editorialLang:"javascript"})
  const [starterCode,setStarterCode] = useState([])
  const [testCases,setTestCases] = useState([])
  const {user} = useContext(CurUserContext);
  const [timer,setTimer] = useState(0); //Time in seconds
  const [allowed,setAllowed] = useState(true);
  const [started,setStarted] = useState(false)
  const [time,setTime] = useState(null);
  const [maxScore,setMaxScore] = useState(0);
  const [editorialAlert,setEditorialAlert] = useState(false);
  const timerRef = useRef(null);
  const [marksAlert,setMarksAlert] = useState(false);
  const [marksScored,setMarksScored] = useState(0);
  let timeLeft=0;

  //UI STATES
  const [activeTab,setActiveTab] = useState("problem");

  useEffect(()=>{
    if(user.loggedIn){

      axios.get(`/taketest/${props.match.params.id}`)
        .then(res=>{
          if(res.data.success){
            console.log(res.data.question);

            setTestCases(res.data.question.testCases)

            // user has already started the test yet
            setTime(res.data.question.time);
            setMaxScore(res.data.question.students[res.data.userIndex].maxMarks?res.data.question.students[res.data.userIndex].maxMarks:0);
            if(res.data.question.time && res.data.question.students[res.data.userIndex].startTime){

              // Timer
              setStarted(true);
              const curtime = new Date();
              const starttime = new Date(res.data.question.students[res.data.userIndex].startTime);
              let timeDiff = Math.floor((curtime.getTime()-starttime.getTime())/1000);
              timeLeft = res.data.question.time*60-timeDiff;
              if(timeLeft<=0){
                // Test is over
                setAllowed(false);
              }else{
                timerRef.current =setInterval(()=>{
                  setTimer(--timeLeft)
                },1000);
              }
            }

            const {title,description,constraints,inputFormat,outputFormat,sample,points,time} = res.data.question;
            setQuestion({title,description,constraints,inputFormat,outputFormat,sample,points,time});

            const {timeLimit,memoryLimit} = res.data.question;
            setLimits({timeLimit,memoryLimit});

            const {solution,editorial,editorialLang} = res.data.question;
            setEditorial({solution,editorial,editorialLang});

            setStarterCode(res.data.question.starterCode);

          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })

    }else{
      props.history.push('/login');
    }


  },[])


  function startTimer() {
    console.log("start timer called");
    axios.get(`/codingtest/${props.match.params.id}/timer`)
      .then(res=>{
        if(res.data.success){
          console.log("success");
        }else{
          console.log(res.data.msg);
        }
      })
      .catch(err=>{
        console.log(err.message);
      })
      if(question.time&&question.time>0){
        timeLeft = question.time*60;
        timerRef.current =setInterval(()=>{
          setTimer(--timeLeft)
        },1000);
      }
  }

  useEffect(()=>{
    if(timer<0){
      clearInterval(timerRef.current);
      setAllowed(false);
    }
  },[timer])

  return (
    <div>
      <TopBar/>
      <div className="bgwhiteoverlay"> </div>
        {marksAlert?<div className="custom-alert"> You Scored {marksScored} Marks </div>:null}
      <div className="container-fluid" style={{marginTop:"100px"}} >
        {editorialAlert?<div className="custom-alert"> You need to get full marks to unlock the Editorial </div>:null}
        <div className=" p-3 text-left m-4  shadow" style={{borderRadius:"18px",backgroundColor:"rgb(255, 235, 249)"}}>
            <h2 className="topicTitle mainH text-left text-pink" >
                    {question.title}
                    <div className="px-2 px-md-3 float-right">
                        <b className="pl-1 pl-md-2">{question.points} Points</b>
                    </div>
            </h2>
                <span className="cursor-pointer p-2 pb-4" onClick={()=>props.history.push('/codingQuestions')}><i className="fa fa-arrow-left anim-hil text-pink" ></i> Go Back</span><br/>
        </div>
        <div className="row">
          <div className="col-lg-9 p-3 ml-4">
            <div className="tabs mb-5">
              <div className="d-flex tabH" style={{flexGrow:"1"}}>
                <div className={activeTab=="problem"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("problem")} > Problem </div>
                <div className={activeTab=="submissions"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("submissions")} > Submissions </div>
                <div className={activeTab=="leaderboard"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("leaderboard")} > Leaderboard </div>
                <div className={activeTab=="editorial"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>{maxScore==question.points?setActiveTab("editorial"):setEditorialAlert(true);setTimeout(()=>{setEditorialAlert(false)},2000)}} > Editorial </div>
              </div>
              <div className="tabCont p-3">
                {activeTab=="problem"?
                  <Problem time={time} setMarksAlert={setMarksAlert} setMarksScored={setMarksScored} allowed={allowed} question={question} starterCode={starterCode} setStarterCode={setStarterCode} testCases={testCases} startTimer={startTimer} started={started} setStarted={setStarted} timer={timer} limits={limits}/>

                :null}

                {activeTab=="submissions"?
                  <Submission/>
                :null}

                {activeTab=="leaderboard"?
                  <Leaderboard/>
                :null}

                {activeTab=="editorial"?
                  <Editorial editorial={editorial} />
                :null}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
