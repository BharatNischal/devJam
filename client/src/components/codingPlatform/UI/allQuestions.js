import React,{useState, useContext, useEffect} from 'react';
import Nav from "../../profile/Nav/Nav";
import {CurUserContext} from '../../../contexts/curUser';
import axios from "axios";
import TopBar from '../../learnerPlatform/TopBar';

let allQuestions=[];
function AllQuestions(props) {
    const [focusInp, setFocusInp] = useState(false);
    const [copyAlert, setCopyAlert] = useState(false);
    const [filteredQuestions,setFilteredQuestions] = useState(allQuestions);
    const [srchResults,setSrchResults] = useState(allQuestions.map(q=>true));
    const [selectedTypes,setSelectedTypes] = useState([]);
    const [srchtxt,setSrchTxt] = useState("");
    const {user} = useContext(CurUserContext);


    useEffect(()=>{

    if(user.loggedIn){

        if(user.student){

        axios.get(`/frontend/questions/published/all`)
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

        axios.get(`/frontend/questions/all`)
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


    useEffect(()=>{
        setSrchResults(filteredQuestions.map(q=>true));
        setSrchTxt("");
  
      } ,[filteredQuestions])

    useEffect(()=>{
        if(selectedTypes.length>0 && selectedTypes.length<2){
            var boolVal=false;
            if(selectedTypes[0]=="Static"){
                boolVal=false;
            }else{
                boolVal=true;
            }
            setFilteredQuestions(allQuestions.filter(ques=>{
                return ques.isDynamic==boolVal;
            }));
        }else{
            setFilteredQuestions(allQuestions);
        }
    },[selectedTypes]);

    function srchHandler(e){
        setSrchResults(filteredQuestions.map(ques=>{
            return ques.title&&ques.title.toLowerCase().includes(e.target.value.toLowerCase());
        }));
        setSrchTxt(e.target.value);
    }

    function typesChangeHandler(e){
        if(e.target.checked){
            const newDiff=selectedTypes.slice();
            newDiff.push(e.target.name);
            setSelectedTypes(newDiff);
        }else{
            setSelectedTypes(selectedTypes.filter(diff=>diff!=e.target.name));
        }

    }

    // Fxn to handle Publish
    function handlePublish(id) {
        axios.put(`/frontend/question/${id}/status`,{status:"Published"})
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
        axios.get(`/frontend/question/new`)
          .then(res=>{
            if(res.data.success){
              props.history.push(`/admin/uiquestion/${res.data.question._id}`)
            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
      }
      function handleClick(id) {
        console.log("Is student",user);
        if(user.student){
          props.history.push(`/coding/uiquestion/${id}`);
        }else{
          props.history.push(`/admin/uiquestion/${id}`)
        }
      }

      const copyToClipBoard=function(id){
        var textField = document.createElement('textarea')
        textField.innerText =`${window.location.host}/coding/uiquestion/${id}` ;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        console.log("Coppied");
        setCopyAlert(true);
        setTimeout(()=>{setCopyAlert(false)},2000);
    }

    return (
        <React.Fragment>
        
        {user.student?<TopBar/> :<Nav show={true} menu={true}/>}
        {copyAlert?<div className="custom-alert"> Link Coppied to Clibard </div>:null}
        <div className="bgwhiteoverlay"> </div>
        <div className="container" style={{marginTop:"120px"}} >
            <div className="d-flex justify-content-between">
                <h1 className="topicTitle mainH text-left text-pink">All UI Questions</h1>

                <div>
                    {!user.student?<button className="btn btn-outline-grad ml-2" onClick={handleAdd}> Add Question </button>:null}
                </div>
            </div>
            <div className="row my-5">
                <div className="col-lg-8  ">

                    <div className={focusInp?"srch focus ml-0 mb-5":"srch ml-0 mb-5"}>
                        <input type="text" onFocus={()=>{setFocusInp(true)}} onBlur={()=>{setFocusInp(false)}} value={srchtxt} onChange={(e)=>srchHandler(e)}  placeholder="Type to Search Questions" ></input>
                        <span className="float-right pr-3 srchIcon"><i className="fa fa-search"></i></span>
                    </div>

                        {filteredQuestions.map((ques,i)=>(

                        <div className={srchResults[i]?"p-3 my-3 pointer":"p-3 my-3 pointer d-none"}  style={{position:"relative",borderRadius:"20px", boxShadow:"0px 4px  10px rgba(0,0,0,0.3)"}}  >
                            <div className="align-center" style={{ display:"flex" , justifyContent:"space-between" }} >
                                <div className="pt-2 hover-pink text-left" onClick={()=>handleClick(ques._id)} >
                                    <h3 className="topicTitle d-inline mr-2" style={{fontSize:"22px"}} >{ques.title}</h3>
                                    {!user.student?<i style={{fontSize:"14px",color:"#333"}} > {ques.status?ques.status:null}</i>:null}<br/>
                                    <span style={{fontSize:"14px",color:"#444" }} >Type:  <b> {ques.isDynamic?"Dynamic":"Static"} </b></span>

                                </div>
                                <div>
                                    {ques.status=="Published"&&!user.student?<span className="hover-pink pointer" onClick={()=>copyToClipBoard(ques._id)} > <i className="fa fa-copy"></i> </span>:null}
                                    {ques.status=="Draft"?
                                        <button className="btn btn-grad ml-2" onClick={()=>handlePublish(ques._id)} >Publish</button>
                                    :null}
                                    {user.student?<button className="btn btn-grad ml-2" onClick={()=>handleClick(ques._id)}> Solve </button>:null}
                                    
                                </div>
                            </div>
                        </div>
                        ))}
                        




                </div>
                <div className="col-lg-4  ">
                    <div className="border mt-5 p-3 text-left" style={{borderRadius:"14px"}} >
                        <h4><b>Filters</b></h4>
                        <div className="custom-control custom-checkbox " >
                            <input type="checkbox" className="custom-control-input" name="Dynamic" onChange={(e)=>typesChangeHandler(e)} id="dynamicCheck1" />
                            <label className="custom-control-label" htmlFor="dynamicCheck1">Dynamic</label>
                            
                        </div>
                        <div className="custom-control custom-checkbox " >
                            <input type="checkbox" className="custom-control-input" name="Static" onChange={(e)=>typesChangeHandler(e)} id="staticCheck1" />
                            <label className="custom-control-label" htmlFor="staticCheck1">Static</label>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
    )
}


export default AllQuestions;

