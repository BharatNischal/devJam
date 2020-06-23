import React from 'react';
import "../test.css";
import placeholder from "../Placeholder.png";
import MCQ from './mcq/mcq';
import MGrid from './mGrid';
import Paragraph from './paragraph';
import axios from 'axios';

function Question(props) {

    // To add a new question by default mcq
    function addQuestion() {
        axios.get('/question/mcq/new')
          .then(res=>{
            if(res.data.success){
              props.add(props.index,res.data.question);
            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
    }

    // Duplicate a Question
    function duplicateQuestion(question) {
        axios.get(`/question/${question.type}/new`)
          .then(res=>{
            if(res.data.success){
              const newQuestion = JSON.parse(JSON.stringify(question));  //Deep copy
              newQuestion._id = res.data.question._id;
              props.add(props.index,newQuestion);
            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
    }

    // Update the state of option
    function handleUpdate(e,data,type="option",del=false) {
      const question = JSON.parse(JSON.stringify(props.question));
      if(e){  //Updation for input tags
        question[`${e.target.name}`] = e.target.value;
      }else{  //Updation for ading/removing options/rows/cols
          if(del){
            question[`${type}`].splice(data,1);
          }else{
            question[`${type}`].push(data);
          }
      }
      props.update(props.index,question);
    }

    // Autograde update
    function autoGradeUpdate(value) {
      const question = JSON.parse(JSON.stringify(props.question));;
      question.autoGrade = value;
      console.log("autoGrade",question,props.index);
      props.update(props.index,question);
    }

    // To delete a question
    function deleteQuestion() {
      axios.delete(`/question/${props.question._id}`)
        .then(res=>{
          if(res.data){
            props.remove(props.index);
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    }

    return (
        <div className="row my-4">
            <div className="col-10 col-lg-11">
                <div style={{border:"1px solid #c1c1c1",backgroundColor:"#f9f9f9", borderRadius:"18px",padding:"20px"}} >
                    <div className="row p-0 " style={{alignItems:"center"}} >
                        <div className="col-md-7 col-lg-8">
                        <input type="text" name="question" value={props.question.question?props.question.question:""} onChange={handleUpdate} placeholder="Enter Question" className="w-100 comment-inp"/>
                        </div>
                        <div className="col-md-5 col-lg-4 mt-2 mt-md-0">
                            <span className="pointer hover-pink" style={{fontSize:"24px"}} ><i className="fa fa-image"></i></span>
                            <select name="type" className="form-control d-inline ml-2" style={{maxWidth:"200px"}} value={props.question.type} onChange={handleUpdate}>
                                <option value="mcq">Multiple Choice</option>
                                <option value="mcqGrid">Multiple Choice Grid</option>
                                <option value="paragraph">Paragraph</option>
                            </select>
                        </div>

                    </div>
                    <div className="qImg mt-3"  >
                       <span > <img src={props.question.img} style={{maxHeight:"200px"}} className="img-fluid" /></span>
                    </div>
                    {props.question.type=="mcq"?<MCQ id={props.id} options={props.question.options} autoGrade={props.question.autoGrade} handleUpdate={handleUpdate} correctOption={props.question.correctOption} autoGradeUpdate={autoGradeUpdate} />:null}
                    {props.question.type=="mcqGrid"?<MGrid rows={props.question.rows} cols={props.question.options} handleUpdate={handleUpdate}/>:null}
                    {props.question.type=="paragraph"? <Paragraph/> :null}
                </div>
            </div>
            <div className="col-2 col-lg-1 px-2">
                  <div className="round py-2 qOpt" >
                    <div className=" pointer hover-pink" onClick={()=>duplicateQuestion(props.question)}><i className="fa fa-copy"></i></div>
                    <div className=" pointer hover-pink" onClick={addQuestion}> <i className="fa fa-plus-circle" ></i> </div>
                    {props.disableDel?null:<div className="text-danger pointer" onClick={deleteQuestion}> <i className="fa fa-trash" ></i> </div>}
                  </div>
            </div>
        </div>
    )
}

export default Question
