import React, { useState, useEffect } from 'react';
import Nav from "../../profile/Nav/Nav";
import { functions } from 'firebase';

const allQuestions=[
    {title:"Find the Sum",topics:["maths"],difficulty:"easy"},
    {title:"Balls in Container",topics:["implementation"],difficulty:"hard"},
    {title:"find in Linked List",topics:["linked list"],difficulty:"easy"},
    {title:"Delete Element in linked list",topics:["linked list"],difficulty:"medium"},
    {title:"Reverse array using stack",topics:["stack","implementation"],difficulty:"medium"}
]

function AllCodingQuestions(props) {
    const [focusInp,setFocusInp] = useState(false);
    const [filteredQuestions,setFilteredQuestions] = useState(allQuestions);
    const [srchResults,setSrchResults] = useState(allQuestions.map(q=>true));
    const [selectedTopics,setSelectedTopics] = useState([]);
    const [selectedDifficulty,setSelectedDifficulty] = useState([]);
    const [srchtxt,setSrchTxt] = useState("");
    
    useEffect(filteringHandler,[selectedTopics,selectedDifficulty]);

    useEffect(()=>{
        setSrchResults(filteredQuestions.map(q=>true));
        setSrchTxt("");
    } ,[filteredQuestions])

    function srchHandler(e){
        setSrchResults(filteredQuestions.map(ques=>{
            return ques.title.toLowerCase().includes(e.target.value.toLowerCase());
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
                for(let i=0;i<ques.topics.length;i++){
                    if(selectedTopics.includes(ques.topics[i])){
                        topicFiltering=true;
                        break;
                    }
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

    return (
        <React.Fragment>
            <Nav show={true} menu={true}/>
            <div className="bgwhiteoverlay"> </div>
            <div className="container" style={{marginTop:"120px"}} >
                <div className="d-flex justify-content-between">
                    <h1 className="topicTitle mainH text-left text-pink">All Coding Questions</h1>
                    
                    <div>
                        <button className="btn btn-outline-grad ml-2"> Add Question </button>
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
                                    <div className="pt-2 hover-pink text-left"  >
                                        <h3 className="topicTitle d-inline mr-2" style={{fontSize:"22px"}}> {ques.title}</h3>
                                        <i style={{fontSize:"14px",color:"#333"}} >Published</i><br/>
                                        <span style={{fontSize:"14px",color:"#444" }} >Difficulty:  <b> {ques.difficulty} </b></span>
                                    
                                    </div>
                                    <div>
                                        <span className="hover-pink pointer" > <i className="fa fa-copy"></i> </span>
                                        <button className="btn btn-grad ml-2" >Publish</button>
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
                                <input type="checkbox" className="custom-control-input" name="linked list" onChange={(e)=>topicChangeHandler(e)} id="linkListCheck1" />
                                <label className="custom-control-label" htmlFor="linkListCheck1">Linked List</label>
                            </div>
                            <div className="custom-control custom-checkbox " >
                                <input type="checkbox" className="custom-control-input" name="maths" onChange={(e)=>topicChangeHandler(e)} id="mathCheck1" />
                                <label className="custom-control-label" htmlFor="mathCheck1">Maths</label>
                            </div>
                            <div className="custom-control custom-checkbox " >
                                <input type="checkbox" className="custom-control-input" name="stack" onChange={(e)=>topicChangeHandler(e)} id="stackCheck1" />
                                <label className="custom-control-label" htmlFor="stackCheck1">Stacks</label>
                            </div>
                            <div className="custom-control custom-checkbox " >
                                <input type="checkbox" className="custom-control-input" name="implementation" onChange={(e)=>topicChangeHandler(e)} id="implementationCheck1" />
                                <label className="custom-control-label" htmlFor="implementationCheck1">Implementation</label>
                            </div>
                            <div className="custom-control custom-checkbox " >
                                <input type="checkbox" className="custom-control-input" name="trees" onChange={(e)=>topicChangeHandler(e)} id="treesCheck1" />
                                <label className="custom-control-label" htmlFor="treesCheck1">Trees</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default AllCodingQuestions;

