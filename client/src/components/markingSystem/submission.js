import React,{useEffect,useState} from "react";
import axios from "axios";

function SubmissionPage(props){

  const [submissions,setSubmissions] = useState([]);
  const [deliverable,setDeliverable] = useState(null);
  const [curIndex,setCurIndex] = useState(0);

  useEffect(()=>{
    if(!props.location.deliverable){
      // Get the data from the database
      axios.get(`/deliverable/${props.match.params.id}`)
        .then(res=>{
          if(res.data.success){
            console.log("data from DataBase");
            const {title,dueDate,points} = res.data.deliverable;
            setSubmissions(res.data.deliverable.submissions);
            setCurIndex(0);
            setDeliverable({title,dueDate,points});
          }else{
            alert(res.data.msg);
          }
        })
        .catch(err=>{
          alert(err.message);
        })
    }else{  //Data provided during the redirect
      console.log("data from props");
      const {title,dueDate,points} = props.location.deliverable;
      setSubmissions(props.location.deliverable.submissions);
      setCurIndex(0);
      setDeliverable({title,dueDate,points});
    }
  },[])

  return (
    <React.Fragment>
    {deliverable?
      <div style={{backgroundColor:"white"}}>
        <p>Deliverable title: {deliverable?deliverable.title:""}</p>
        <p>Active student {submissions[curIndex].userId.name}</p>
        <p>Submission Date{submissions[curIndex].submissionId?submissions[curIndex].submissionId.timestamp:"Not Submitted"}</p>
        <p>Zip address <a href={submissions[curIndex].submissionId?submissions[curIndex].submissionId.fileURL:""}>{submissions[curIndex].submissionId?"Download File":"No File"}</a></p>
        <p>Marks {submissions[curIndex].submissionId?submissions[curIndex].submissionId.marks:""}/{deliverable?deliverable.points:""}</p>
        <p>Private Comment:{submissions[curIndex].submissionId?submissions[curIndex].submissionId.comment:""}</p>
        {curIndex!=0?<p onClick={()=>{setCurIndex(curIndex-1)}}>Prev</p>:null}
        {curIndex!=submissions.length-1?<p onClick={()=>{setCurIndex(curIndex+1)}}>Next</p>:null}
      </div>:null}
    </React.Fragment>
  );
}


export default SubmissionPage;
