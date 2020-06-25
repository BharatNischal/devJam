import React,{useEffect,useState,useRef} from 'react';
import TopBar from "../../learnerPlatform/TopBar";
import "./liveTest.css";
import StartPage from './startPage';
import Question from './question';
import axios from "axios";
import TestFinished from './testFinished';

function LiveTest(props) {

  const [test,setTest] = useState({title:"Title",instructions:"",duration:-1});
  const [err,setErr] = useState("");
  const [startupPage,setStartupPage] = useState(true);
  const [questions,setQuestions] = useState([]);
  const [answers,setAnswers] = useState([]);
  const [curIndex,setCurIndex] = useState(0);
  const [submission,setSubmission] = useState({startTime:0,_id:""});
  const [attempted,setAttempted] = useState(0);
  const [timer,setTimer] = useState(0); //Time in seconds
  const timerRef = useRef(null);
  let timeLeft=0;


    // Function to shuffle an array
    function shuffle(obj1, obj2) {
    var index = obj1.length;
    var rnd, tmp1;

    while (index) {
      rnd = Math.floor(Math.random() * index);
      index -= 1;
      tmp1 = obj1[index];
      obj1[index] = obj1[rnd];
      obj1[rnd] = tmp1;
    }
  }


    // Function to shuffle questions based on answers
    function shuffle2(ans, ques) {
    var questions = [];
    ans.forEach(a=>{
      let ind = ques.findIndex((q)=>q._id == a.questionId);
      questions.push(ques[ind]);
    })
    return questions;
  }


  useEffect(()=>{
    axios.get(`/livetest/${props.match.params.id}/new`)
      .then(res=>{
        if(res.data.success){
          // Already started Test
          if(res.data.testSubmission){
            const {_id,startTime,onTime} = res.data.testSubmission;

                // Timer
                const curtime = new Date();
                const starttime = new Date(startTime);
                let timeDiff = Math.floor((curtime.getTime()-starttime.getTime())/1000);
                timeLeft = res.data.test.duration*60-timeDiff;
                if((res.data.test.duration!=-1 && res.data.test.duration*60<=timeDiff) ||onTime ){
                  props.history.push('/test/finished');
                }else{
                  // Starting timer
                  if(res.data.test.duration!=-1 ){  //Not a timed test for -1
                    setTimer(+res.data.test.duration*60-timeDiff);
                    timerRef.current =setInterval(()=>{
                      setTimer(--timeLeft)
                    },1000);
                  }
                }


                if(res.data.test.shuffle){  //Shuffle the questions

                      // If the student has not submitted any answer previously
                      if(!res.data.testSubmission.answers||res.data.testSubmission.answers.length==0){
                        // Shuffle the questions
                        shuffle(res.data.test.questions);
                        setAnswers(res.data.test.questions.map(q=>(
                          {questionId:q._id,answer:""}
                        )));
                        setQuestions(res.data.test.questions);
                      }else{
                        // Shuffle both questions and answers
                        shuffle(res.data.testSubmission.answers);
                        setQuestions(shuffle2(res.data.testSubmission.answers,res.data.test.questions));
                        setAnswers(res.data.testSubmission.answers);
                      }

                }else{
                  setQuestions(res.data.test.questions);
                  setAnswers(res.data.testSubmission.answers&&res.data.testSubmission.answers.length>0?res.data.testSubmission.answers
                                                                                                      :res.data.test.questions.map(q=>(
                                                                                                      {questionId:q._id,answer:""}
                  )));
                }
                setSubmission({_id,startTime});
                // Calculate questions attempted
                let attempt=0;
                res.data.testSubmission.answers.forEach(ans=>{
                  if(ans.answer){
                    attempt++;
                  }
                });
                setAttempted(attempt);
                setStartupPage(false);
          }
          const {title,instructions,duration} = res.data.test;
          setTest({title,instructions,duration});
        }else{
          setErr(res.data.msg);
        }
      })
      .catch(err=>{
        console.log(err.message);
      })
  },[])


  // Save the progress and change the questions done
  useEffect(()=>{
    if(submission._id){
      // Calculate questions attempted
      let attempt=0;
      answers.forEach(ans=>{
        if(ans.answer){
          attempt++;
        }
      });
      setAttempted(attempt);
      // Save the progress
      axios.put(`/testsubmission/${submission._id}`,{answers})
        .then(res=>{
          if(res.data.success){
            console.log("saved progress");
          }else{
            alert(res.data.msg);
          }
        })
        .catch(err=>{
          alert(err.message);
        })
    }
  },[answers])

  useEffect(()=>{
    if(timer<0){
      clearInterval(timerRef.current);
      props.history.push('/test/finished');
    }
  })

  function startTest() {
    axios.get(`/test/${props.match.params.id}/testSubmission/new`)
      .then(res=>{
          if(res.data.success){
            const {_id,startTime} = res.data.testSubmission;
            if(res.data.test.duration!=-1){
              // Starting timer
              timeLeft = +res.data.test.duration*60;
              setTimer(+res.data.test.duration*60);
              timerRef.current =setInterval(()=>{
                setTimer(--timeLeft)
              },1000);
            }

            // Shuffle the questions
            if(res.data.test.shuffle){
                shuffle(res.data.test.questions);
            }
            setQuestions(res.data.test.questions);
            setAnswers(res.data.test.questions.map(q=>(
              {questionId:q._id,answer:""}
            )));
            setSubmission({_id,startTime});
            setStartupPage(false);
          }else{
            console.log("setErr");
            setErr(res.data.msg);
          }
      })
      .catch(err=>{
        setErr(err.message);
      })
  }


    return (
        <React.Fragment>
            <TopBar/>

            <div className="bgwhiteoverlay"></div>

                <div className="frame p-4">

                    {/* Start Page Should only be shown when user has not started test yet, not when he refresh page */}
                     {startupPage?<StartPage title={test.title} instruction={test.instructions} duration={test.duration==-1?"Infinite":test.duration} err={err} startTest={startTest}/>
                   :<Question question={questions[curIndex]} curIndex={curIndex} totalQues={questions.length} setCurIndex={setCurIndex} setAnswers={setAnswers} answers={answers} attempted={attempted} timer={timer} submissionId={submission._id}/>}
                </div>

        </React.Fragment>
    )
}



export default LiveTest
