import React, { useState,useEffect } from 'react';
import Nav from '../../../profile/Nav/Nav';
import UserImg from "../../../profile/CLIP.png";
import Select from "react-select";
import Placeholder from "../../Placeholder.png";
import Question from "./question";
import axios from "axios";


let allQuestions = [];
function ResultSingle(props) {


    const [curIndex,setCurIndex] = useState(0);
    const [students,setStudents] = useState([]);
    const [questions,setQuestions] = useState([]);
    const [title,setTitle] = useState("");
    const [totalMarks,setTotalMarks] = useState(0);
    const [filterBy,setFilterBy] = useState("none");


    // Get data from database
    useEffect(()=>{
      axios.get(`/submissions/testdetails/${props.match.params.testId}`)
        .then(res=>{
          if(res.data.success){
            console.log(res.data.test);
            allQuestions = res.data.test.questions;
            let ques=[];
            for(let i=0;i<res.data.test.questions.length;i++){
              
              
              ques.push(i);
            }
            setQuestions(ques);

            // Make the order of answers same in case of shuffle
            if(res.data.test.shuffle){
              res.data.test.students.forEach((student)=>{
                if(student.testSubmissionId){
                  student.testSubmissionId.answers = shuffle2(res.data.test.questions,student.testSubmissionId.answers);
                }
              })
              setStudents(res.data.test.students);
            }else{
              setStudents(res.data.test.students);
            }
            setTitle(res.data.test.title);
            setTotalMarks(res.data.test.questions.length)
            const stuInd = res.data.test.students.findIndex(s=>s.userId._id==props.match.params.userId);
            setCurIndex(stuInd!=-1?stuInd:0);
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    },[])

    // Shufffle answers acc to questions
    function shuffle2(questions, answers) {
    var ans = [];
    questions.forEach(q=>{
      let ind = answers.findIndex((a)=>a.questionId == q._id);
      ans.push(answers[ind]);
    })
    return ans;
  }


    function handleFilter(choice) {
      setFilterBy(choice);
      // No filtering for student who did not take test
      if(!students[curIndex].testSubmissionId)
        return;
      let newQuestions = [];
      if(choice=="Right"){
        allQuestions.forEach((q,i)=>{
          if(students[curIndex].testSubmissionId.answers[i].marks==1)
            newQuestions.push(i);
        })
      }else if(choice=="Wrong"){
        allQuestions.forEach((q,i)=>{
          if(students[curIndex].testSubmissionId.answers[i].marks==0 && students[curIndex].testSubmissionId.answers[i].answer)
            newQuestions.push(i);
        })
      }else if(choice=="Not Submitted"){
        allQuestions.forEach((q,i)=>{
          if(!students[curIndex].testSubmissionId.answers[i].answer)
            newQuestions.push(i);
        })
      }else{
        for(let i=0;i<allQuestions.length;i++){
          newQuestions.push(i);
        }
      }
      setQuestions(newQuestions);
    }

    function handleUpdate(ind,newMarks,newFeedback) {

        const newStudents = JSON.parse(JSON.stringify(students)).map((s,i)=>{
          if(i==curIndex){
            let finalMarks=0;
            const newAnswer = JSON.parse(JSON.stringify(s.testSubmissionId.answers)).map((ans,j)=>{
              if(j==ind){
                if(newMarks>-1){
                  finalMarks += +newMarks;
                  ans.marks = newMarks;
                }else{
                  ans.feedback = newFeedback;
                }
                return ans;
              }else{
                finalMarks += +ans.marks;
                return ans;
              }
            });
            s.testSubmissionId.answers = newAnswer;
            if(newMarks>-1){
              s.testSubmissionId.finalMarks = finalMarks;
            }
            return s;
          }else{
            return s;
          }
        });
        setStudents(newStudents);
        axios.put(`/testSubmission/result/${newStudents[curIndex].testSubmissionId._id}`,{submission:newStudents[curIndex].testSubmissionId})
          .then(res=>{
            if(res.data.success){
              console.log("Saved");
            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
    }

    // Student marks details
    const options=students.map((student,i)=>(
      {
          value:i,
          label:(
          <div className="d-flex w-100 justify-content-between"><div className="d-flex align-content-center " style={{fontSize:"20px"}}>
              <div className="mr-2"><img src={student.userId.profilePic} style={{width:"30px",height:"30px",objectFit:"cover"}} className="rounded-circle" /> </div>
                  <div>{student.userId.name}</div>
              </div>
              <div className="mr-2" style={{fontSize:"13px"}}><b>{student.testSubmissionId?student.testSubmissionId.finalMarks:-1}/{totalMarks}</b><br/> {student.testSubmissionId?(student.testSubmissionId.onTime?"Completed In Time":"Did not Complete in Time"):"Did Not Submitted"}  </div>
          </div>
      )}
    ));
    const customStyles = {
      control: base => ({
        ...base,
        height: 80,
        padding:5
      }),
      valueContainer: base =>({
        ...base,
        height:70
      })
    };
          
    return (
        <React.Fragment>
        {students.length>0?
          <React.Fragment>
              <Nav show={true} menu={true}/>
              <div className="bgwhiteoverlay" ></div>
              <div className="container text-left" style={{marginTop:"100px"}}>
                  <div className="row">
                      <div className="col-12 px-3 py-2">
                      <div className=" p-3  shadow" style={{borderRadius:"18px",backgroundColor:"rgb(255, 235, 249)"}}>
                          <h2 className="topicTitle mainH text-left text-pink" style={{display:"flex",justifyContent:"space-between"}}>
                              <div> {title} </div>
                          </h2>
                          <span className="cursor-pointer p-2 pb-4" onClick={()=>props.history.push("/test")}><i className="fa fa-arrow-left anim-hil text-pink"></i> Go Back</span><br/>
                      </div>
                      </div>

                      <div className="col-lg-6 mt-3">
                          <Select
                              options={options}
                              isSearchable={false}
                              value={options[curIndex]}
                              onChange={(e)=>{setCurIndex(Number(e.value))}}
                              getOptionLabel={option => option.label}
                              classNamePrefix="react-select"
                              className="p-2"
                              styles={customStyles}
                          />
                      </div>
                      <div className="col-lg-6 mt-2 mt-lg-3 d-flex align-items-center justify-content-between">
                          <div className="ml-4 ml-lg-0">
                              <span style={{fontSize:"25px"}} className={curIndex==0?"mr-4 cursor-disable":"mr-4 hover-pink pointer"} > {curIndex==0?<i className="fa fa-less-than"></i>:<i className="fa fa-less-than" onClick={()=>setCurIndex(curIndex-1)}></i>} </span>
                              <span style={{fontSize:"25px"}} className={curIndex==students.length-1?"mr-4 cursor-disable":"mr-4 hover-pink pointer"} > {curIndex==students.length-1?<i className="fa fa-greater-than"></i>:<i className="fa fa-greater-than" onClick={()=>setCurIndex(curIndex+1)}></i>} </span>
                          </div>

                          <div className="d-flex">
                              <div className="text-center mr-4">
                                  <div>AutoGrade</div>
                                  <h4><b> {students[curIndex].testSubmissionId?students[curIndex].testSubmissionId.marks:-1}/ {totalMarks}</b></h4>
                              </div>

                              <div className="text-center">
                                  <div>Final</div>
                                  <h4><b> {students[curIndex].testSubmissionId?students[curIndex].testSubmissionId.finalMarks:-1}/ {totalMarks}</b></h4>
                              </div>
                          </div>

                      </div>

                      <div className="col-12 d-flex justify-content-between mt-4">
                          <div className="ml-4">
                              <select className="form-control d-inline-block mr-3" style={{width:"200px"}} value={filterBy} onChange={(e)=>handleFilter(e.target.value)}>
                                  <option value="none"> None </option>
                                  <option value="Right"> Right </option>
                                  <option value="Wrong"> Wrong </option>
                                  <option value="Not Submitted"> Not Submitted </option>
                              </select>
                              <button className="btn btn-link" onClick={()=>{setQuestions(allQuestions.map((q,i)=>i))}}>Clear</button>
                          </div>
                          <div>
                              {students[curIndex].released?<button className="btn btn-grad cursor-disable" disabled> Released</button>:<button className="btn btn-grad "> Release</button>}
                          </div>
                      </div>
                      <div className="col-12 my-5" >

                          {/* Question Starts Here */}

                          {students[curIndex].testSubmissionId?
                            allQuestions.map((question,ind)=>(
                              questions.indexOf(ind)!=-1?
                                <Question question={question} key={ind} answer={students[curIndex].testSubmissionId.answers[ind]} index={ind} handleUpdate={handleUpdate}/>
                                :<React.Fragment key={ind}></React.Fragment>
                          )):null}


                      </div>
                  </div>
              </div>
          </React.Fragment>
          :<div></div>}
        </React.Fragment>
    )
}



export default ResultSingle;
