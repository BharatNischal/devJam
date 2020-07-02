import React,{useEffect,useState,useContext} from 'react';
import {CurUserContext} from '../../../contexts/curUser';
import axios from "axios";

export default function StudentQuestion(props) {

  const [mySubmissions,setMySubmissions] = useState([]);
  const [question,setQuestion] = useState({title:"",description:"",constraints:"",outputFormat:"",sample:"",testCases:[],points:0);
  const [limits,setLimits] = useState({timeLimit:0,memoryLimit:0})
  const [editorial,setEditorial] = useState({solution:"",editorial:"",editorialLang:"javascript"})
  const [students,setStudents] = useState([]);
  const [starterCode,setStarterCode] = useState([])
  const {user} = useContext(CurUserContext);
  const [timer,setTimer] = useState(0); //Time in seconds
  const timerRef = useRef(null);
  let timeLeft=0;

  useEffect(()=>{

    axios.get(`/taketest/${props.match.params.id}`)
      .then(res=>{
        if(res.data.success){

          setStudents(res.data.question.students);

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

          setStarterCode(res.data.starterCode);

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
          console.log(success);
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
    <div>MyComponent</div>
  )
}
