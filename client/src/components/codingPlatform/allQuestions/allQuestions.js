import React, { useState, useEffect ,useContext} from 'react';
import Nav from "../../profile/Nav/Nav";
import axios from "axios"
import { functions } from 'firebase';
import {CurUserContext} from '../../../contexts/curUser';

let allQuestions=[]

function AllCodingQuestions(props) {
    const [focusInp,setFocusInp] = useState(false);
    const [filteredQuestions,setFilteredQuestions] = useState(allQuestions);
    const [srchResults,setSrchResults] = useState(allQuestions.map(q=>true));
    const [selectedTopics,setSelectedTopics] = useState([]);
    const [selectedDifficulty,setSelectedDifficulty] = useState([]);
    const [srchtxt,setSrchTxt] = useState("");
    const {user} = useContext(CurUserContext);
    const [copyAlert,setCopyAlert] = useState(false);


    useEffect(()=>{

      if(user.loggedIn){

        if(user.student){

          axios.get(`/coding/questions/published/all`)
            .then(res=>{
              if(res.data.success){
                allQuestions = res.data.questions;
                setFilteredQuestions(allQuestions);
              }else{
                console.log(res.data.msg);
              }
            })
            .catch(err=>{
              console.log(err.message);
            })
        }else{

          axios.get(`/coding/questions/all`)
            .then(res=>{
              if(res.data.success){
                allQuestions = res.data.questions;
                setFilteredQuestions(allQuestions);
              }else{
                console.log(res.data.msg);
              }
            })
            .catch(err=>{
              console.log(err.message);
            })
        }


      }else{
        props.history.push('/login');
      }

    },[])

    useEffect(filteringHandler,[selectedTopics,selectedDifficulty]);

    useEffect(()=>{
      setSrchResults(filteredQuestions.map(q=>true));
      setSrchTxt("");

    } ,[filteredQuestions])

    function srchHandler(e){
        setSrchResults(filteredQuestions.map(ques=>{
            return ques.title&&ques.title.toLowerCase().includes(e.target.value.toLowerCase());
        }));
        setSrchTxt(e.target.value);
    }

    function filteringHandler(){
        setFilteredQuestions(allQuestions.filter(function(ques){
            var boolVal=true;
            //Difficulty filtering added
            if(selectedDifficulty.length>0){
                if(selectedDifficulty.includes(ques.difficulty)){
                    boolVal=boolVal && true;
                }
                else{
                    return false;
                }
            }else{
                boolVal=boolVal && true;
            }

            //Topic filtering
            if(selectedTopics.length>0){
                var topicFiltering=false;
                if(ques.topic){
                  for(let i=0;i<selectedTopics.length;i++){
                    if(ques.topic.includes(selectedTopics[i])){
                      topicFiltering=true;
                      break;
                    }
                  }
                }else{
                  topicFiltering=false;
                }
                boolVal= boolVal && topicFiltering;
            }else{
                boolVal=boolVal && true;
            }

            return boolVal;

        }));
    }
    function topicChangeHandler(e){
        if(e.target.checked){
            const newTopics=selectedTopics.slice();
            newTopics.push(e.target.name);
            setSelectedTopics(newTopics);
        }else{
            setSelectedTopics(selectedTopics.filter(topic=>topic!=e.target.name));
        }


    }
    function difficultyChangeHandler(e){
        if(e.target.checked){
            const newDiff=selectedDifficulty.slice();
            newDiff.push(e.target.name);
            setSelectedDifficulty(newDiff);
        }else{
            setSelectedDifficulty(selectedDifficulty.filter(diff=>diff!=e.target.name));
        }

    }

    // Fxn to handle Publish
    function handlePublish(id) {
      axios.put(`/coding/question/${id}/status`,{status:"Published"})
        .then(res=>{
          if(res.data.success){
            console.log("Published");
            allQuestions[allQuestions.findIndex(q=>q._id==id)].status = "Published";
            setFilteredQuestions([...filteredQuestions].map(q=>{
              if(q._id==id){
                q.status="Published";
              }
              return q;
            }));
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    }

    function handleAdd() {
      axios.get(`/coding/question/new`)
        .then(res=>{
          if(res.data.success){
            props.history.push(`/addQuestion/${res.data.question._id}`)
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    }

    const copyToClipBoard=function(id){
      var textField = document.createElement('textarea')
      textField.innerText =`${window.location.host}/coding/question/${id}` ;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
      console.log("Coppied");
      setCopyAlert(true);
      setTimeout(()=>{setCopyAlert(false)},2000);
  }

  function handleClick(id) {
    console.log("Is student",user);
    if(user.student){
      props.history.push(`/coding/question/${id}`);
    }else{
      props.history.push(`/addQuestion/${id}`)
    }
  }

    return (
        <React.Fragment>
            <Nav show={true} menu={true}/>
            {copyAlert?<div className="custom-alert"> Link Coppied to Clibard </div>:null}
            <div className="bgwhiteoverlay"> </div>
            <div className="container" style={{marginTop:"120px"}} >
                <div className="d-flex justify-content-between">
                    <h1 className="topicTitle mainH text-left text-pink">All Coding Questions</h1>

                    <div>
                        {!user.student?<button className="btn btn-outline-grad ml-2" onClick={handleAdd}> Add Question </button>:null}
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col-lg-8  ">

                        <div className={focusInp?"srch focus ml-0 mb-5":"srch ml-0 mb-5"}>
                            <input type="text" onFocus={()=>{setFocusInp(true)}} onBlur={()=>{setFocusInp(false)}} value={srchtxt} onChange={(e)=>{srchHandler(e)}}  placeholder="Type to Search Questions" ></input>
                            <span className="float-right pr-3 srchIcon"><i className="fa fa-search"></i></span>
                        </div>

                        {filteredQuestions.map((ques,i)=>(
                            <div className={srchResults[i]?"p-3 my-3 pointer":"p-3 my-3 pointer d-none"} key={i} style={{position:"relative",borderRadius:"20px", boxShadow:"0px 4px  10px rgba(0,0,0,0.3)"}}  >
                                <div className="align-center" style={{ display:"flex" , justifyContent:"space-between" }} >
                                    <div className="pt-2 hover-pink text-left"  onClick={()=>handleClick(ques._id)}>
                                        <h3 className="topicTitle d-inline mr-2" style={{fontSize:"22px"}} > {ques.title}</h3>
                                        {!user.student?<i style={{fontSize:"14px",color:"#333"}} >{ques.status}</i>:null}<br/>
                                        <span style={{fontSize:"14px",color:"#444" }} >Difficulty:  <b> {ques.difficulty} </b></span>

                                    </div>
                                    <div>
                                        {ques.status=="Published"&&!user.student?<span className="hover-pink pointer" onClick={()=>copyToClipBoard(ques._id)}> <i className="fa fa-copy"></i> </span>:null}
                                        {ques.status=="Draft"?<button className="btn btn-grad ml-2" onClick={()=>handlePublish(ques._id)}>Publish</button>:null}
                                        {user.student?<button className="btn btn-grad ml-2" onClick={()=>handleClick(ques._id)}> Solve </button>:null}
                                    </div>
                                </div>
                            </div>
                        ))}




                    </div>
                    <div className="col-lg-4  ">
                        <div className="border p-3 text-left" style={{borderRadius:"14px"}} >
                            <h4><b>Filters</b></h4>
                            <hr/>
                            <h6><b>Difficulty </b> </h6>
                            <div className="custom-control custom-checkbox " >
                                <input type="checkbox" className="custom-control-input" id="easyCheck1" name="easy" onChange={(e)=>difficultyChangeHandler(e)} />
                                <label className="custom-control-label" htmlFor="easyCheck1">Easy</label>
                            </div>
                            <div className="custom-control custom-checkbox " >
                                <input type="checkbox" className="custom-control-input" id="mediumCheck1" name="medium" onChange={(e)=>difficultyChangeHandler(e)} />
                                <label className="custom-control-label" htmlFor="mediumCheck1">Medium</label>
                            </div>
                            <div className="custom-control custom-checkbox " >
                                <input type="checkbox" className="custom-control-input" id="hardCheck1" name="hard" onChange={(e)=>difficultyChangeHandler(e)} />
                                <label className="custom-control-label" htmlFor="hardCheck1">Hard</label>
                            </div>
                            <hr/>
                            <h6><b>Topics</b></h6>
                            <div className="custom-control custom-checkbox " >
                                <input type="checkbox" className="custom-control-input" name="Linked List" onChange={(e)=>topicChangeHandler(e)} id="linkListCheck1" />
                                <label className="custom-control-label" htmlFor="linkListCheck1">Linked List</label>
                            </div>
                            <div className="custom-control custom-checkbox " >
                                <input type="checkbox" className="custom-control-input" name="Maths" onChange={(e)=>topicChangeHandler(e)} id="mathCheck1" />
                                <label className="custom-control-label" htmlFor="mathCheck1">Maths</label>
                            </div>
                            <div className="custom-control custom-checkbox " >
                                <input type="checkbox" className="custom-control-input" name="Stack" onChange={(e)=>topicChangeHandler(e)} id="stackCheck1" />
                                <label className="custom-control-label" htmlFor="stackCheck1">Stacks</label>
                            </div>
                            <div className="custom-control custom-checkbox " >
                                <input type="checkbox" className="custom-control-input" name="Queue" onChange={(e)=>topicChangeHandler(e)} id="queueCheck1" />
                                <label className="custom-control-label" htmlFor="queueCheck1">Queue</label>
                            </div>
                            <div className="custom-control custom-checkbox " >
                                <input type="checkbox" className="custom-control-input" name="Implementation" onChange={(e)=>topicChangeHandler(e)} id="implementationCheck1" />
                                <label className="custom-control-label" htmlFor="implementationCheck1">Implementation</label>
                            </div>
                            <div className="custom-control custom-checkbox " >
                                <input type="checkbox" className="custom-control-input" name="Trees" onChange={(e)=>topicChangeHandler(e)} id="treesCheck1" />
                                <label className="custom-control-label" htmlFor="treesCheck1">Trees</label>
                            </div>
                            <div className="custom-control custom-checkbox " >
                                <input type="checkbox" className="custom-control-input" name="Graph" onChange={(e)=>topicChangeHandler(e)} id="graphCheck1" />
                                <label className="custom-control-label" htmlFor="graphCheck1">Graph</label>
                            </div>
                            <div className="custom-control custom-checkbox " >
                                <input type="checkbox" className="custom-control-input" name="Others" onChange={(e)=>topicChangeHandler(e)} id="othersCheck1" />
                                <label className="custom-control-label" htmlFor="othersCheck1">Others</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default AllCodingQuestions;
