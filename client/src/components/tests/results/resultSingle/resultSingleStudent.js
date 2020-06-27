import React, { useState,useEffect,useContext } from 'react';
import Nav from '../../../profile/Nav/Nav';
import UserImg from "../../../profile/CLIP.png";
import Placeholder from "../../Placeholder.png";
import Question from "./question2";
import axios from "axios";
import TopBar from '../../../learnerPlatform/TopBar';
import {CurUserContext} from "../../../../contexts/curUser";

function ResultSingle(props) {


    const [questions,setQuestions] = useState([]);
    const [answers,setAnswers] = useState([]);
    const [title,setTitle] = useState("");
    const [notAttempt,setNotAttempt] = useState(false);
    const [totalMarks,setTotalMarks] = useState(0);
    const [marks,setMarks] = useState(0);

    // Login State
    const {user} = useContext(CurUserContext)

    // Get data from database
    useEffect(()=>{
      if(!user.loggedIn){
        props.history.push('/login');
      }
      else if(props.match.params.testId=="Undefined"||props.match.params.testId=="undefined"){
        setNotAttempt(true);
      }else{
        axios.get(`/testResults/individual/${props.match.params.testId}`)
          .then(res=>{
            if(res.data.success){
              console.log(res.data.test);
              let newQuestions=[];
              res.data.test.answers.forEach(ans=>{
                newQuestions.push(ans.questionId);
              });
              setQuestions(newQuestions);
              setAnswers(res.data.test.answers);
              setTitle(res.data.test.testId.title);
              setTotalMarks(res.data.test.testId.questions.length);
              setMarks(res.data.test.finalMarks);
            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
      }
    },[])


    return (
      <React.Fragment>
        {answers.length>0?
          <React.Fragment>
              <TopBar/>
              <div className="bgwhiteoverlay" ></div>
              <div className="container text-left" style={{marginTop:"100px"}}>
                  <div className="row">
                      <div className="col-12 px-3 py-2">
                      <div className=" p-3  shadow" style={{borderRadius:"18px",backgroundColor:"rgb(255, 235, 249)"}}>
                          <h2 className="topicTitle mainH text-left text-pink" style={{display:"flex",justifyContent:"space-between"}}>
                              <div> {title} </div>
                          </h2>
                          <span className="cursor-pointer p-2 pb-4" onClick={()=>props.history.push("/studDash")}><i className="fa fa-arrow-left anim-hil text-pink"></i> Go Back</span><br/>
                      </div>
                      </div>


                      <div className="col-lg-6 mt-2 mt-lg-3 d-flex align-items-center justify-content-between">
                          <div className="ml-4 ml-lg-0"></div>

                          <div className="d-flex">
                              <div className="text-center mr-4"></div>

                              <div className="text-center">
                                  <div>Score</div>
                                  <h4><b> {marks}/ {totalMarks}</b></h4>
                              </div>
                          </div>

                      </div>

                      <div className="col-12 my-5" >

                          {/* Question Starts Here */}

                            {questions.map((question,ind)=>(
                                <Question question={question} key={ind} answer={answers[ind]} isStudent={true}/>
                          ))}


                      </div>
                  </div>
              </div>
          </React.Fragment>:
          <React.Fragment>
                <TopBar/>
                <div className="bgwhiteoverlay" ></div>
                <div className="container text-left" style={{marginTop:"100px"}}>
                  {notAttempt?
                    [<h2 className="text-center">You Did not take the test.</h2>,
                    <h2 className="text-center">Your Score: 0</h2>]
                  :null}
                </div>
          </React.Fragment>
        }
        </React.Fragment>
    )
}



export default ResultSingle;
