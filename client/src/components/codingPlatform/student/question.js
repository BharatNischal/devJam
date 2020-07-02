import React,{useEffect,useState,useContext,useRef} from 'react';
import {CurUserContext} from '../../../contexts/curUser';
import axios from "axios";
import TopBar from '../../learnerPlatform/TopBar';
import Problem from './Problem';

export default function StudentQuestion(props) {

  const [mySubmissions,setMySubmissions] = useState([]);
  const [question,setQuestion] = useState({title:"",description:"<div> this is <b>description</b>  </div>",constraints:"",inputFormat:"<p> Single Line of String Input. For Ex : </p> <code>Manjot</code> ", outputFormat:"",sample:"",testCases:[],points:0});
  const [limits,setLimits] = useState({timeLimit:0,memoryLimit:0})
  const [editorial,setEditorial] = useState({solution:"",editorial:"",editorialLang:"javascript"})
  const [students,setStudents] = useState([]);
  const [starterCode,setStarterCode] = useState([])
  const [testCases,setTestCases] = useState([])
  const {user} = useContext(CurUserContext);
  const [timer,setTimer] = useState(0); //Time in seconds
  const timerRef = useRef(null);
  let timeLeft=0;

  //UI STATES
  const [activeTab,setActiveTab] = useState("problem");

  useEffect(()=>{

    axios.get(`/taketest/${props.match.params.id}`)
      .then(res=>{
        if(res.data.success){
          console.log(res.data.question);

          setStudents(res.data.question.students);
          setTestCases(res.data.question.testCases)

          // user has already started the test yet
          if(res.data.question.time && res.data.question.students[res.data.userIndex].startTime){

            // Timer
            const curtime = new Date();
            const starttime = new Date(res.data.question.students[res.data.userIndex].startTime);
            let timeDiff = Math.floor((curtime.getTime()-starttime.getTime())/1000);
            timeLeft = res.data.question.time*60-timeDiff;
            if(timeLeft<=0){
              // Test is over
              props.history.push('/test/finished');
            }else{
              timerRef.current =setInterval(()=>{
                setTimer(--timeLeft)
              },1000);
            }
          }

          const {title,description,constraints,outputFormat,sample,testCases,points,time} = res.data.question;
          setQuestion({title,description,constraints,outputFormat,sample,testCases,points,time});

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

  },[])


  function startTimer() {
    axios.get(`/codingtest/:id/timer`)
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
      timeLeft = question.time;
      timerRef.current =setInterval(()=>{
        setTimer(--timeLeft)
      },1000);
  }

  useEffect(()=>{
    if(timer<0){
      clearInterval(timerRef.current);
      props.history.push('/test/finished');
    }
  },[timer])

  return (
    <div>
      <TopBar/>
      <div className="bgwhiteoverlay"> </div>
      <div className="container-fluid" style={{marginTop:"100px"}} >
        <div className=" p-3 text-left m-4  shadow" style={{borderRadius:"18px",backgroundColor:"rgb(255, 235, 249)"}}>
            <h2 className="topicTitle mainH text-left text-pink" >
                    {question.title}
            </h2>
                <span className="cursor-pointer p-2 pb-4" ><i className="fa fa-arrow-left anim-hil text-pink"></i> Go Back</span><br/>
        </div>
        <div className="row">
          <div className="col-lg-9 p-3 ml-4">
            <div className="tabs mb-5">
              <div className="d-flex tabH" style={{flexGrow:"1"}}>
                <div className={activeTab=="problem"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("problem")} > Problem </div>
                <div className={activeTab=="submissions"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("submissions")} > Submissions </div>
                <div className={activeTab=="leaderboard"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("leaderboard")} > Leaderboard </div>
                <div className={activeTab=="editorial"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("editorial")} > Editorial </div>
              </div>
              <div className="tabCont p-3">
                {activeTab=="problem"?
                  <Problem question={question} starterCode={starterCode} setStarterCode={setStarterCode} testCases={testCases}/>

                :null}

                {activeTab=="submissions"?
                  <h1>Submissions</h1>
                :null}

                {activeTab=="leaderboard"?
                  <h1>leaderboard</h1>
                :null}

                {activeTab=="editorial"?
                  <h1>editorial</h1>
                :null}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
