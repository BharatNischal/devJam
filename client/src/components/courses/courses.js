import React, { useState,useEffect,useContext} from 'react';
import Nav from '../profile/Nav/Nav';
import Alert from "../ui/alert/alert";
import Select from "react-select"
import axios from "axios";
import {CurUserContext} from "../../contexts/curUser";


var allCourses = [];
function Courses(props) {

    //UI STATES
    const [copyAlert,setCopyAlert] = useState(false);
    const [showConfirmAlert,setShowConfirmAlert] = useState(false);

    // Data State
    const [courses,setCourses] = useState([]);
    const [alertId,setAlertId] = useState("");

    // Login State
    const {user} = useContext(CurUserContext);

    useEffect(()=>{
      if(user.loggedIn && !user.student){
        axios.get('/all/courses')
          .then(res=>{
            if(res.data.success){
                allCourses = res.data.courses
              setCourses(res.data.courses);
            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
      }else{
        props.history.push(user.loggedIn?'/studDash':'/login');
      }

    },[])

    const copyToClipBoard=function(id){
        var textField = document.createElement('textarea')
        textField.innerText =`${window.location.host}/course/${id}` ;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        console.log("Coppied");
        setCopyAlert(true);
        setTimeout(()=>{setCopyAlert(false)},2000);
    }

    function handleClose(){
      axios.put(`/course/close/${alertId}`)
        .then(res=>{
          if(res.data.success){
            setShowConfirmAlert(false);
            setCourses(courses.slice().map(course=>{
              if(course._id==alertId){
                course.status = "Closed";
                setAlertId("");
              }
              return course;
            }))
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.msg);
        })
    }

    // handle filters
    function handleFilter(choice){
      if(choice=="Draft"){
        console.log("Draft");
        setCourses(allCourses.filter(course=>{
          return course.status=="Draft";
        }));
      }else if(choice=="Published"){
        console.log("Published");
        setCourses(allCourses.filter(course=>{
          return course.status=="Published";
        }));
      }else if(choice=="Closed"){
        console.log("Closed");
        setCourses(allCourses.filter(course=>{
          return course.status=="Closed";
        }));
      }else{
        console.log("Clear");
        setCourses(allCourses);
      }
    }

    const filterOptions=[
      {value:"Draft",label:"Draft"},
      {value:"Published",label:"Published"},
      {value:"Closed",label:"Closed"}
    ]

    function handleNew() {
      axios.get('/course/new')
        .then(res=>{
          if(res.data.success){
            props.history.push(`/course/${res.data.course._id}`);
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    }


    return (
        <React.Fragment>
            <Nav show={true} menu={true} />
            {copyAlert?<div className="custom-alert"> Link Coppied to Clibard </div>:null}
            {showConfirmAlert?<Alert msg={<React.Fragment> <h3>Are You Sure to continue?</h3><p> Click Ok to Proceed.</p> </React.Fragment>} ok={null} cancel={()=>setShowConfirmAlert(false)} />:null}
            <div className="bgwhiteoverlay"></div>
            <div className="container" style={{marginTop:"120px"}} >
                <div style={{display:"flex",justifyContent:"space-between"}} ><h1 className="topicTitle mainH text-left text-pink">Courses </h1>  <div> <button className="btn btn-outline-grad" onClick={handleNew}> Create </button> </div> </div>
                <div className="row my-5" >


                    <div className="col-lg-4 mt-1 order-lg-2">
                        <div className="p-3 shadow mt-lg-5" style={{borderRadius:"18px",minHeight:"200px",backgroundColor:"#f8f8f8"}}>
                            <h4 className="mb-2">Filters</h4>
                            <Select
                               className="Filter"
                               placeholder="Select Filter"
                               options={filterOptions}

                               onChange={(e)=>handleFilter(e.value)}
                            />

                          <button className="btn btn-link text-danger" onClick={()=>setCourses(allCourses)}>Clear</button>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-2 mb-5 " >

                        {courses.map(course=>(
                          <div className="p-3 my-2 pointer" style={{position:"relative",borderRadius:"20px", boxShadow:"0px 4px  10px rgba(0,0,0,0.3)"}} key={course._id} >
                              <div className="align-center" style={{ display:"flex" , justifyContent:"space-between" }} >
                                  <div className="pt-2 hover-pink" onClick={()=>props.history.push(`/course/${course._id}`)} ><h3 className="topicTitle d-inline mr-2" style={{fontSize:"20px"}}> {course.title}</h3><i style={{fontSize:"14px",color:"#333"}} >{course.status}</i></div>
                                  <div> {course.status=="Published"? <span className="hover-pink pointer" onClick={()=>copyToClipBoard(course._id)}  > <i className="fa fa-copy"></i> </span>:null}
                                    {course.status=="Draft"?<button className="btn btn-grad ml-2" onClick={()=>props.history.push(`/publish/course/${course._id}`)}>Publish</button>
                                  :(course.status=="Published"?<button className="btn btn-grad ml-2" onClick={()=>{setAlertId(course._id);setShowConfirmAlert(true)}}>Close Course</button>
                                :<button className="btn btn-grad ml-2" onClick={()=>props.history.push(`/result/course/${course._id}`)}>View Result</button>)}
                                  </div>
                              </div>
                          </div>
                        ))}


                    </div>
            </div>
            </div>
        </React.Fragment>
    )
}


export default Courses
