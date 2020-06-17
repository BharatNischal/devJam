import React,{useState,useEffect} from 'react'
import axios from "axios";

var submissions = [];
function DeliverableMarks(props) {

  const [filteredSubmitions,setFilteredSubmissions] = useState([]);
  const [deliverable,setDeliverable] = useState(null);

  useEffect(()=>{
    if(props.location.deliverable){
      // Deliverable data passed as prop during redirect
      console.log("called");
      const {title,dueDate,points,instruction} = props.location.deliverable;
      setFilteredSubmissions(props.location.deliverable.submissions);
      submissions = props.location.deliverable.submissions;
      setDeliverable({title,dueDate,points,instruction});
    }else{
      // To get the data from database in case of refresh
      axios.get(`/deliverableFull/${props.match.params.id}`)
        .then(res=>{
          if(res.data.success){
            console.log(res.data);
            const {title,dueDate,points,instruction} = res.data.deliverable;
            setFilteredSubmissions(res.data.deliverable.submissions);
            submissions = res.data.deliverable.submissions;
            setDeliverable({title,dueDate,points,instruction});
          }else{
            alert(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    }
  },[])

  // Function to sort the submissions based on sort method choosen
  function handleSort(choice) {
    // Note we will be using -1 for default value rather than -1 to differentiate b/w 0 marks and unmarked

    if(choice=="Ascending"){
      setFilteredSubmissions(filteredSubmitions.slice().sort(function(first,second){
          const x = Number(first.submissionId?first.submissionId.marks:-1); //Giving unsubmitted submission as -1(default)
          const y = Number(second.submissionId?second.submissionId.marks:-1);
          return x-y;
      }))
    }else { //Descending
      setFilteredSubmissions(filteredSubmitions.slice().sort(function(first,second){
          const x = Number(first.submissionId?first.submissionId.marks:-1);
          const y = Number(second.submissionId?second.submissionId.marks:-1);
          return y-x;
      }))
    }
  }

  // Function to filter submissions based on filter method applied
  function handleFilter(choice,a,b){
    if(choice=="Greater than"){
      console.log("Greater than");
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a<0:submission.submissionId.marks>a) : a<0;
      }));
    }else if(choice=="Less than"){
      console.log("Less than");
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a>0:submission.submissionId.marks<a) : a>0;
      }));
    }else if(choice==="Greater than or equal to"){
      console.log("Greater than or equal to");
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a<=0:submission.submissionId.marks>=a) : a<=0;
      }));
    }else if(choice=="Less than or equal to"){
      console.log("Less than or equal to");
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a>=0:submission.submissionId.marks<=a) : a>=0;
      }));
    }else if(choice==="Is equal to"){
      console.log("Is equal to");
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a==0:submission.submissionId.marks==a) : a==0;
      }));
    }else if(choice=="Is not equal to"){
      console.log("Is not equal to");
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a!=0:submission.submissionId.marks!=a) : a!=0;
      }));
    }else if(choice=="Is between"){
      console.log("Is between");
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?(a<=0 && b>=0):(a<=submission.submissionId.marks && b>=submission.submissionId.marks)) : (a<=0 && b>=0);
      }));
    }else if(choice=="Is not between"){
      console.log("Is not between");
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1 ? !(a<=0 && b>=0):!(a<=submission.submissionId.marks && b>=submission.submissionId.marks)) : !(a<=0 && b>=0);
      }));
    }else if(choice=="Unmarked"){
      console.log("Unmarked");
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId && submission.submissionId.marks==-1;
      }))
    }else if(choice=="Not submitted"){
      console.log("Not submitted");
      setFilteredSubmissions(submissions.filter(submission=>{
        return !submission.submissionId;
      }))
    }else if(choice=="Late"){
      console.log("Late");
      setFilteredSubmissions(submissions.filter(submission=>{
        const subDate = submission.submissionId?new Date(submission.submissionId.timestamp):null;
        const dueDate = new Date(deliverable.dueDate);
        return submission.submissionId && subDate.getTime()>dueDate.getTime();
      }))
    }else{  //For None
      console.log("none");
      setFilteredSubmissions(submissions);
    }
  }

  return (
    <div>
      {filteredSubmitions.map(submission=>
        (<div>
          {submission.userId.name}
        </div>)
      )}
      <button onClick={()=>{handleFilter("Not submitted")}}>Not submitted</button>
      <button onClick={()=>{handleFilter("None")}}>None</button>
      <button onClick={()=>{handleFilter("Is not between",1,100)}}>Between 1 and 100</button>
      <button onClick={()=>{handleSort("Ascending")}}>Ascending</button>
      <button onClick={()=>{handleSort("Descending")}}>Descending</button>
    </div>
  )
}

export default DeliverableMarks
