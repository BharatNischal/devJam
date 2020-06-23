import React, { useState,useEffect } from 'react';
import Nav from '../profile/Nav/Nav';
import Question from './question/question';
import axios from "axios";

function CreateTest(props) {

    //UI STATES
    const [isTimed,setIsTimed] = useState(false);
    // Data State
    const [questions,setQuestions] = useState([{type:"mcq",rows:[],options:[]}]);
    const [test,setTest] = useState({title:"",state:"Draft",instructions:"",duration:-1,shuffle:false});

    function saveTest() {
      axios.put(`/test/${props.params.id}`,{test,questions})
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

    function addQuestion(index,ques) {
      const newQuestions = questions;
      newQuestions.splice(index+1,0,ques);
      setQuestions(newQuestions);
      setTimeout(()=>console.log(questions),2000);
    }

    function delQuestion(index) {
      const newQuestions = questions;
      newQuestions.splice(index,1);
      setQuestions(newQuestions);
      setTimeout(()=>console.log(questions),2000);
    }

    function updateQuestion(index,ques) {
      const newQuestions = questions.map((q,i)=>{
        if(i==index){
          return ques;
        }else{
          return q;
        }
      });
      setQuestions(newQuestions);
      setTimeout(()=>console.log(questions),2000);
    }

    return (
        <React.Fragment>
            <Nav show={true} menu={true}/>
            <div className="bgwhiteoverlay"></div>
            <div className="container" style={{marginTop:"120px"}} >
                <button onClick={saveTest}>Save</button>
                <h1 className="topicTitle mainH text-left text-pink">Create Test  <span style={{fontSize:"16px"}} >( {questions.length} Questions )</span></h1>

                <div className="row my-5" >
                    <div className="col-12" >
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-pencil" ></i></div>
                            <input type="text" className="form-control" value={test.title} onChange={(e)=>setTest({...test,title:e.target.value})}  placeholder="Enter Test Title" />
                        </div>
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-align-justify" ></i></div>
                            <textarea rows="5" value={test.instructions} onChange={(e)=>setTest({...test,instructions:e.target.value})} placeholder="Enter Test Instructions " className="form-control" ></textarea>

                        </div>
                        <div className="row text-left">
                            <div className="col-md-6  px-lg-5">
                                <div className="custom-control custom-checkbox d-inline" >
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" checked={isTimed} onChange={(e)=> setIsTimed(e.target.checked)} />
                                    <label className="custom-control-label" htmlFor="customCheck1">Timed</label>
                                </div>
                                {isTimed?<input type="number"  value={test.duration==-1?0:test.duration} onChange={(e)=>setTest({...test,duration:e.target.value})} min="0" className="form-control d-inline" style={{width:"80px",marginLeft:"10px",height:"25px"}}  ></input>:null}
                            </div>
                            <div className="col-md-6">
                                <div className="custom-control custom-checkbox d-inline" >
                                    <input type="checkbox" checked={test.shuffle} onChange={(e)=>setTest({...test,shuffle:e.target.checked})} className="custom-control-input" id="customCheck2" />
                                    <label className="custom-control-label" htmlFor="customCheck2">Shuffled</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 my-5" >
                      {questions.map((question,i)=>(
                        <Question key={i} index={i} add={addQuestion} remove={delQuestion} update={updateQuestion} question={question}/>
                      ))}
                    </div>

                </div>

            </div>
        </React.Fragment>
    )
}

export default CreateTest;
