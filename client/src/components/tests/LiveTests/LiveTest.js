import React,{useEffect,useState} from 'react';
import TopBar from "../../learnerPlatform/TopBar";
import "./liveTest.css";
import StartPage from './startPage';
import Question from './question';
import axios from "axios";

const lorem ="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

function LiveTest(props) {

  const [test,setTest] = useState({title:"Title",instructions:"",duration:-1});
  const [err,setErr] = useState("");
  const [startupPage,setStartupPage] = useState(true);
  const [questions,setQuestions] = useState([]);
  const [answers,setAnswers] = useState([]);
  const [curIndex,setCurIndex] = useState(0);
  const [submission,setSubmission] = useState({startTime:0,_id:""})


  useEffect(()=>{
    axios.get(`/livetest/${props.match.params.id}`)
      .then(res=>{
        console.log(res.data.testSubmission.answers);
        if(res.data.success){
          if(res.data.testSubmission){
            const {_id,startTime} = res.data.testSubmission;
            setQuestions(res.data.test.questions);
            setAnswers(res.data.testSubmission.answers);
            setSubmission({_id,startTime});
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

  function startTest() {
    axios.get(`/test/${props.match.params.id}/testSubmission/new`)
      .then(res=>{
          if(res.data.success){
            const {_id,startTime} = res.data.testSubmission;
            setSubmission({_id,startTime});
            setAnswers(res.data.test.questions.map(q=>(
              {questionId:q._id,answer:""}
            )));
            setQuestions(res.data.test.questions);
            setStartupPage(false);
          }else{
            setErr(res.data.msg);
          }
      })
      .catch(err=>{
        setErr(err.message);
      })
  }

  function handleSaveProgress() {
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


    return (
        <React.Fragment>
            <TopBar/>
            
            <div className="bgwhiteoverlay"></div>

                <div className="frame p-4">

                    {/* Start Page Should only be shown when user has not started test yet, not when he refresh page */}
                     {startupPage?<StartPage title={test.title} instruction={test.instructions} duration={test.duration==-1?"Infinite":test.duration} err={err} startTest={startTest}/>
                   :<Question question={questions[curIndex]} curIndex={curIndex} totalQues={questions.length} setCurIndex={setCurIndex} setAnswers={setAnswers} answers={answers} save={handleSaveProgress}/>}
                </div>

        </React.Fragment>
    )
}



export default LiveTest
