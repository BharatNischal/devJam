import React,{useState,useEffect,useContext} from "react";
import "./marks.css"
import $ from 'jquery';
import axios from "axios";
import Cell from "./cell";
import Nav from "../profile/Nav/Nav";
import {CurUserContext} from '../../contexts/curUser';
import Alert from "../ui/alert/alert";

function MarksList(props){

    // State to save data
    const [marksList,setMarksList] = useState([]);

    //UI STATES
    const [showSubmitAlert, setShowSubmitAlert] = useState(false);
    const [showSideLoader, setShowSideLoader] = useState(false);
    const [initialLoader, setinitialLoader] = useState(true);
    const [showhelper, setshowhelper] = useState(false);
    // State to get current user details to avoid students from entering this component
    const {user} = useContext(CurUserContext);


    useEffect(()=>{

      // Redirect to appropriate routes
      if(!user.loggedIn){
        props.history.push('/login');
      }else if(user.student){
        props.history.push('/studDash');
      }else{
        if(!(localStorage.getItem("firstTime"))){
          setshowhelper(true);
          localStorage.setItem("firstTime","false");
        }
        // Fetch the data
        axios.post('/deliverables')
          .then(res=>{
            if(res.data.success){
              setMarksList(res.data.deliverables);
              console.log(res.data.deliverables);
            }else{
              console.log(res.data.err);
            }
            setinitialLoader(false);
          })
          .catch(err=>{
            console.log(err.message);
            setinitialLoader(false);
          })

        // Scroll settings
        $('tbody').scroll(function(e) { //detect a scroll event on the tbody
          $('thead').css("left", -$("tbody").scrollLeft()); //fix the thead relative to the body scrolling
          $('thead th:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first cell of the header
          $('tbody th:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first column of tdbody
        });
      }
    },[])

    // Function to get new deliverables on reaching end of scroll
    function handleScroll(e) {
      if(e.target.scrollLeft == (e.target.scrollWidth - e.target.clientWidth)){
        console.log("reached");
        if(marksList.length%10==0){
          setShowSideLoader(true);

          axios.post('/deliverables',{date:marksList[marksList.length-1].dueDate})
            .then(res=>{
              if(res.data.success){
                setMarksList([...marksList,...res.data.deliverables]);
              }else{
                console.log(res.data.msg);
              }
              setShowSideLoader(false);
            })
            .catch(err=>{
              console.log(err.message);
              setShowSideLoader(false);
            })
        }
      }
    }

    // Update the marks entered by admin
    function handleUpdate(i,j,val) {
      let newMarksList = Array.from(marksList);
      newMarksList[i].submissions[j].submissionId.marks = Number(val);
      setMarksList(newMarksList);
    }

    // Display Logic
    let tableData = [];
    let sumOfDeliverable=[],rows=0,cols=0;
    if(marksList.length>0){
      rows = marksList.length;cols=marksList[0].submissions.length;
      sumOfDeliverable = Array(rows).fill(0);
      for(let j=0;j<cols;j++){
        let row=[]
        row.push(
        <th>
          <div style={{display:"flex",alignItems:"center",marginTop:"0.5em"}} className="px-1 text-left" >
            <div > <img alt="userImg" src={marksList[0].submissions[j].userId.profilePic} className="rounded-circle shadow" style={{width:"50px",height:"50px", objectFit:"cover" }} /></div>
            <div className="pl-1">{marksList[0].submissions[j].userId.name}</div>
          </div>
        </th>);

        for(let i=0;i<rows;i++){
            sumOfDeliverable[i] +=  marksList[i].submissions[j].submissionId?(marksList[i].submissions[j].submissionId.marks==-1?0:marksList[i].submissions[j].submissionId.marks):0;
            row.push(<Cell i={i} j={j} handleUpdate={handleUpdate} maxPoints={marksList[i].points} submission={marksList[i].submissions[j].submissionId} dueDate={marksList[i].dueDate} updateAlert={(val)=>setShowSubmitAlert(val)} view={()=>{props.history.push({pathname:`/submission/${marksList[i]._id}/${j}`,deliverable:marksList[i]})}}/>)
        }
        tableData.push(<tr>{row}</tr>);
      }
    }

    return (
      <React.Fragment>
      <Nav show={true} />
      {showhelper?<Alert msg={(<React.Fragment>
        <h3>First Time Guide to Update Marks</h3>
        <ol className="text-left">
          <li>Find The appropriate Cell according to student name & deliverable. </li>
          <li>Click On Input Field and change marks and hit Enter. </li>
        </ol></React.Fragment>)}  ok={()=>setshowhelper(false)} />:null}

      {showSubmitAlert?<div className="custom-alert"> <i className="fa fa-check-circle text-success" ></i> Marks Updated Successfully </div>:null}
      {showSideLoader?<div className="sideLoader" > <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/f1055231234507.564a1d234bfb6.gif" style={{width:"100px"}} /> </div>:null}
      {initialLoader?<div className="bgwhiteoverlay" style={{zIndex:"70"}}><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" style={{width:"300px",marginTop:"30vh"}} /> </div>:null}
      <div style={{minHeight:"100vh",backgroundColor:"white"}}>
        <div className="bgwhiteoverlay"></div>

          <div className="horizontal-scroll-except-first-column" style={{marginTop:"80px"}} >
          <table className="custom-table">
              <thead>
                <tr>
                  <th></th>
                  {marksList.map(deliverable=>(
                    <th className="pointer" onClick={()=>{props.history.push({pathname:`/marks/deliverable/${deliverable._id}`,deliverable:deliverable})}}>{deliverable.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody onScroll={handleScroll}>
                <tr>
                  <th>Average</th>
                  {sumOfDeliverable.map(sum=>(
                    <td>{(sum/cols).toFixed(2)}</td>
                  ))}
                </tr>
                {tableData}
              </tbody>
            </table>
          </div>
    </div>
    </React.Fragment>
    );
}

export default MarksList;
