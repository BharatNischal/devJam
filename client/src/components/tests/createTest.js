import React, { useState,useEffect } from 'react';
import Nav from '../profile/Nav/Nav';
import Question from './question/question';
import axios from "axios";
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';


function CreateTest(props) {

    //UI STATES
    const [isTimed,setIsTimed] = useState(false);
    // Data State
    const [questions,setQuestions] = useState([]);
    const [test,setTest] = useState({title:"",status:"Draft",instructions:"",duration:-1,shuffle:false});
    const [preview,setPreview] = useState(false);

    useEffect(()=>{
      axios.get(`/test/${props.match.params.id}`)
        .then(res=>{
          if(res.data.success){
              if(!res.data.test.questions || res.data.test.questions.length==0){
                // If there is no question add one
                axios.get('/question/mcq/new')
                  .then(res=>{
                    setQuestions([res.data.question]);
                  })
                  .catch(err=>{
                    console.log(err.message);
                  })
              }else{
                setQuestions(res.data.test.questions);
              }
              const {title,status,instructions,duration,shuffle} = res.data.test;
              if(duration>-1){
                setIsTimed(true);
              }
              setTest({title,status,instructions,duration,shuffle});
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    },[])

    function saveTest(type) {
      axios.put(`/test/${props.match.params.id}`,{test,questions})
        .then(res=>{
          if(res.data.success){
            if(type=="publish"){
              props.history.push(`/publish/test/${props.match.params.id}`);
            }
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    }

    function addQuestion(index,ques) {
      const newQuestions = JSON.parse(JSON.stringify(questions)); //Deep copy
      newQuestions.splice(index+1,0,ques);
      setQuestions(newQuestions);
    }

    function delQuestion(index) {
      const newQuestions = JSON.parse(JSON.stringify(questions)); //Deep copy
      newQuestions.splice(index,1);
      setQuestions(newQuestions);
    }

    function handleClose() {
        axios.put(`/test/close/${props.match.params.id}`)
          .then(res=>{
            if(res.data.success){
              console.log("Closed");
              setTest({...test,status:"Closed"});
            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
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
    }


    // Function to handle change of indices on sorting
        const onSortEnd = ({oldIndex, newIndex}) => {
            setQuestions(question => (
                arrayMove(question, oldIndex, newIndex)
            ));
        };

    // React HOC for drag and drop items
        const SortableItem = sortableElement(({question,i}) => (<Question index={i} id={i} add={addQuestion} remove={delQuestion} update={updateQuestion} question={question} disableDel={questions.length==1?true:false} test={test} preview={preview}/>));

    // React HOC for drag and drop items
        const SortableContainer = sortableContainer(({children}) => {
          return <div>{children}</div>;
        });

    return (
        <React.Fragment>
            <Nav show={true} menu={true}/>
            <div className="bgwhiteoverlay"></div>
            <div className="container" style={{marginTop:"120px"}} >

                <div className="d-flex justify-content-between">
                  <h1 className="topicTitle mainH text-left text-pink">Create Test  <span style={{fontSize:"16px"}} >( {questions.length} Questions )</span></h1>
                  <div>
                    {test.status=="Draft"&&!preview?[<span className="h3" style={{position:"relative", top:"5px" }} > <i className="fa fa-eye  hover-pink pointer" onClick={()=>setPreview(!preview)} ></i></span>,
                      <button className="btn btn-outline-grad ml-2" onClick={saveTest}> Save </button>,
                        <button className="btn bg-grad text-white ml-2" onClick={()=>saveTest("publish")}> Publish  </button>]
                        :(test.status=="Published"?
                            <button className="btn bg-grad text-white ml-2" onClick={handleClose}> Close  </button>
                            :[<span className="h3" style={{position:"relative", top:"5px" }} > <i className="fa fa-eye-slash  hover-pink pointer" onClick={()=>setPreview(!preview)} ></i></span>,<button className="btn bg-grad text-white ml-2" onClick={()=>props.history.push(`/result/test/${props.match.params.id}`)}> Results  </button>])}

                  </div>
                </div>

                <div className="row my-5" >
                    <div className="col-12" >
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-pencil" ></i></div>
                            <input type="text" className="form-control" value={test.title?test.title:""} onChange={(e)=>setTest({...test,title:e.target.value})}  placeholder="Enter Test Title" readOnly={test.status=="Draft"&&!preview?false:true}  />
                        </div>
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-align-justify" ></i></div>
                            <textarea rows="5" value={test.instructions?test.instructions:""} onChange={(e)=>setTest({...test,instructions:e.target.value})} placeholder="Enter Test Instructions " className="form-control" readOnly={test.status=="Draft"&&!preview?false:true}></textarea>

                        </div>
                        <div className="row text-left">
                            <div className="col-md-6  px-lg-5">
                                <div className="custom-control custom-checkbox d-inline" >
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" checked={isTimed} onChange={(e)=> setIsTimed(e.target.checked)} disabled={test.status=="Draft"&&!preview?false:true}/>
                                    <label className="custom-control-label" htmlFor="customCheck1">Timed</label>
                                </div>
                                {isTimed?<input type="number"  value={test.duration==-1?0:test.duration} onChange={(e)=>setTest({...test,duration:e.target.value})} min="0" className="form-control d-inline" style={{width:"80px",marginLeft:"10px",height:"25px"}} readOnly={test.status=="Draft"&&!preview?false:true} ></input>:null}
                            </div>
                            <div className="col-md-6">
                                <div className="custom-control custom-checkbox d-inline" >
                                    <input type="checkbox" checked={test.shuffle} onChange={(e)=>setTest({...test,shuffle:e.target.checked})} className="custom-control-input" id="customCheck2" disabled={test.status=="Draft"&&!preview?false:true}/>
                                    <label className="custom-control-label" htmlFor="customCheck2">Shuffled</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 my-5" >

                      <SortableContainer onSortEnd={onSortEnd} distance={1} lockAxis="y">
                        {questions.map((question,i)=>(
                          <SortableItem key={question._id} index={i} question={question} i={i}/>
                        ))}
                      </SortableContainer>




                    </div>

                </div>

            </div>
        </React.Fragment>
    )
}

export default CreateTest;
