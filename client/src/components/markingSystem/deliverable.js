import React,{useState,useEffect} from 'react'
import axios from "axios";

var submissions = [];
function DeliverableMarks(props) {

  const [filteredSubmitions,setFilteredSubmissions] = useState([]);
  const [filterBy,setFilterBy] = useState("None");
  const [sortBy,setSortBy] = useState("Ascending");
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

    }
  },[])

  useEffect(()=>{
    handleFilter();
    handleSort();
  },[filterBy])


  useEffect(()=>{
    handleSort();
  },[sortBy])

  // Function to sort the submissions based on sort method choosen
  function handleSort() {
    // Note we will be using -1 for default value rather than -1 to differentiate b/w 0 marks and unmarked
    if(sortBy=="Ascending"){
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
  function handleFilter(a,b){
    if(filterBy=="Greater than"){
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a<0:submission.submissionId.marks>a) : a<0;
      }));
    }else if(filterBy=="Less than"){
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a>0:submission.submissionId.marks<a) : a>0;
      }));
    }else if(filterBy=="Greater than or equal to"){
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a<=0:submission.submissionId.marks>=a) : a<=0;
      }));
    }else if(filterBy=="Less than or equal to"){
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a>=0:submission.submissionId.marks<=a) : a>=0;
      }));
    }else if(filterBy=="Is equal to"){
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a==0:submission.submissionId.marks==a) : a==0;
      }));
    }else if(filterBy=="Is not equal to"){
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?a!=0:submission.submissionId.marks!=a) : a!=0;
      }));
    }else if(filterBy=="Is between"){
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1?(a<=0 && b>=0):(a<=submission.submissionId.marks && b>=submission.submissionId.marks)) : (a<=0 && b>=0);
      }));
    }else if(filterBy=="Is not between"){
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId ? (submission.submissionId.marks==-1 ? !(a<=0 && b>=0):!(a<=submission.submissionId.marks && b>=submission.submissionId.marks)) : !(a<=0 && b>=0);
      }));
    }else if(filterBy=="Unmarked"){
      setFilteredSubmissions(submissions.filter(submission=>{
        return submission.submissionId && submission.submissionId.marks==-1;
      }))
    }else if(filterBy=="Not submitted"){
      setFilteredSubmissions(submissions.filter(submission=>{
        return !submission.submissionId;
      }))
    }else if(filterBy=="Late"){
      setFilteredSubmissions(submissions.filter(submission=>{
        const subDate = submission.submissionId?new Date(submission.submissionId.timestamp):null;
        const dueDate = new Date(deliverable.dueDate);
        return submission.submissionId && subDate.getTime()>dueDate.getTime();
      }))
    }else{  //For None
      setFilteredSubmissions(submissions);
    }
  }

  return (
    <div>
      {submissions.map(submission=>
        (<div>
          {submission.userId.name}
        </div>)
      )}
    </div>
  )
}

export default DeliverableMarks
