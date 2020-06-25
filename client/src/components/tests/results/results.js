import React, { useState, useEffect } from 'react';
import Nav from "../../profile/Nav/Nav";
import Select from "react-select";
import Axios from 'axios';

var allStudents=[];

function Results(props) {

    const [test,setTest] = useState({});
    const [filteredStudents,setFilteredStudents] = useState([]);
    const [avg,setAvg] = useState({marks:0,finalMarks:0});

    const [filterVal, setFilterVal] = useState("none");
    const [sortVal,setSortVal] = useState("Ascending");
    // UI states
    const [showNumberOptions, setshowNumberOptions] = useState(0);
    const [numbers,setNumbers]=useState([0,0]);


    useEffect(function(){
        Axios.get(`/submissions/test/${props.match.params.id}`)
        .then(function(res){
            if(res.data.success){
                console.log(res.data.test.students);
                 const {title,duration,instructions} = res.data.test;
                 const marks = res.data.test.questions.length;
                 setTest({title,duration,instructions,marks});
                 allStudents=res.data.test.students;
                 setFilteredStudents(res.data.test.students);

                 // Avg marks
                 var totalmarks=0,totalFinalMarks=0,totalMaxMarks=0;
                 res.data.test.students.forEach(el => {
                    if(el.testSubmissionId){
                        totalmarks+=el.testSubmissionId.marks;
                        totalFinalMarks+=el.testSubmissionId.finalMarks;
                    }
                    totalMaxMarks+=marks;
                 });
                 setAvg({
                     marks:(totalmarks/totalMaxMarks).toFixed(2),
                     finalMarks:(totalFinalMarks/totalMaxMarks).toFixed(2)
                 })


            }else{
                alert(res.data.msg);
            }
        }).catch(function(err){
            alert(err.message);
        })

    },[])


    // Function to sort the submissions based on sort method choosen
function handleSort(choice,array=filteredStudents) {
      // Note we will be using -1 for default value rather than -1 to differentiate b/w 0 marks and unmarked

      if(choice=="Ascending"){
      setFilteredStudents(array.slice().sort(function(first,second){
          const x = Number(first.testSubmissionId?first.testSubmissionId.marks:-1); //Giving unsubmitted submission as -1(default)
          const y = Number(second.testSubmissionId?second.testSubmissionId.marks:-1);
          return x-y;
      }))
      }else { //Descending
      setFilteredStudents(array.slice().sort(function(first,second){
          const x = Number(first.testSubmissionId?first.testSubmissionId.marks:-1);
          const y = Number(second.testSubmissionId?second.testSubmissionId.marks:-1);
          return y-x;
      }))
      }
      setSortVal(choice);
  }


    function handleFilter(choice,a,b) {
        let array = [];
        if(choice=="Ran out of time"){
          array = allStudents.filter(student=>(
            student.testSubmissionId && !student.testSubmissionId.onTime
          ));
        }else if(choice=="Completed in time"){
          array = allStudents.filter(student=>(
            student.testSubmissionId && student.testSubmissionId.onTime
          ));
        }else if(choice=="Did not attempt"){
          array = allStudents.filter(student=>(
            !student.testSubmissionId
          ));
        }else if(choice=="Released"){
          array = allStudents.filter(student=>(
            student.released
          ));
        }else if(choice=="Not released"){
          array = allStudents.filter(student=>(
            !student.released
          ));
        }else if(choice=="Greater than"){
          console.log("Greater than");
          array = allStudents.filter(student=>{
            return student.testSubmissionId ? (student.testSubmissionId.finalMarks>a) : a<-1;
          });
        }else if(choice=="Less than"){
          console.log("Less than");
          array = allStudents.filter(student=>{
            return student.testSubmissionId ? (student.testSubmissionId.finalMarks<a) : a>-1;
          });
        }else if(choice==="Greater than or equal to"){
          console.log("Greater than or equal to");
          array = allStudents.filter(student=>{
            return student.testSubmissionId ? (student.testSubmissionId.finalMarks>=a) : a<=-1;
          });
        }else if(choice=="Less than or equal to"){
          console.log("Less than or equal to");
          array = allStudents.filter(student=>{
            return student.testSubmissionId ? (student.testSubmissionId.finalMarks<=a) : a>=-1;
          });
        }else if(choice==="Is equal to"){
          console.log("Is equal to");
          array = allStudents.filter(student=>{
            return student.testSubmissionId ? (student.testSubmissionId.finalMarks==a) : a==-1;
          });
        }else if(choice=="Is not equal to"){
          console.log("Is not equal to");
          array = allStudents.filter(student=>{
            return student.testSubmissionId ? (student.testSubmissionId.finalMarks!=a) : a!=-1;
          });
        }else if(choice=="Is between"){
          console.log("Is between");
          array = allStudents.filter(student=>{
            return student.testSubmissionId ? (student.testSubmissionId.finalMarks && b>=student.testSubmissionId.finalMarks) : (a<=-1 && b>=-1);
          });
        }else if(choice=="Is not between"){
          console.log("Is not between");
          array = allStudents.filter(student=>{
            return student.testSubmissionId ? (student.testSubmissionId.marks && b>=student.testSubmissionId.marks) : !(a<=-1 && b>=-1);
          });
        }else{  //Clear
            array = allStudents;
        }
        handleSort(sortVal,array);
    }

    function handleRelease(data) {
      console.log(data);
      const students = data.map(s=>(s.userId._id));
      Axios.post(`/test/results/release/${props.match.params.id}`,{students})
        .then(res=>{
          if(res.data.success){
            console.log("Successful");
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    }


    const filterOptions=[
        {label:"Ran out of time",value:"Ran out of time"},
        {label:"Completed in time", value:"Completed in time"},
        {label:"Did not attempt", value:"Did not attempt"},
        {label:"Released", value:"Released"},
        {label:"Not released", value:"Not released"},
        {value:"none",label:"None"},
        {value:"Greater than",label:"Greater Than"},
        {value:"Less than",label:"Less Than"},
        {value:"Greater than or equal to", label:"Greater than or equal to"},
        {value:"Less than or equal to",label:"Less than or equal to"},
        {value:"Is equal to",label:"Is equal to"},
        {value:"Is not equal to",label:"Is not equal to"},
        {value:"Is between",label:"Is between"},
        {value:"Is not between",label:"Is not between"},
        {value:"Unmarked",label:"Unmarked"},
        {value:"Not submitted",label:"Not submitted"},
        {value:"Late",label:"Late"}
    ]

    const sortOptions=[
        {value:"Ascending",label:"Ascending"},
        {value:"Descending",label:"Descending"}
    ]

    const filterChangeHandler=(e)=>{

        if(["Ran out of time","Completed in time","Did not attempt","Released","Not released","none"].includes(e.value)){
            setshowNumberOptions(0);
            handleFilter(e.value);
        }else if(["Greater than","Less than","Greater than or equal to","Less than or equal to","Is equal to","Is not equal to"].includes(e.value)){
            setshowNumberOptions(1);
        }else{
            setshowNumberOptions(2);
        }
        setFilterVal(e.value);
    }
    const filterAdvanceHandler=(e)=>{
        e.preventDefault();
        handleFilter(filterVal,numbers[0],numbers[1]);
        //setshowNumberOptions(-1);
    }

    return (
        <React.Fragment>
            <Nav show={true} menu={true}/>
            <div className="bgwhiteoverlay"></div>
            <div className="container text-left" style={{marginTop:"120px"}} >
                <h1 className="topicTitle mainH text-left text-pink"> {test.title || "" } </h1>
                <h1 className="topicTitle mainH text-left mt-3 ml-2" style={{fontSize:"22px"}}>Introduction </h1>
                <p className="mt-2 ml-3 ">
                {test.instructions||""}
                </p>
                <h1 className="topicTitle mainH text-left mt-3 ml-2 mb-0" style={{fontSize:"22px"}}>Duration </h1>
                <p className="mt-1 ml-3 ">
                    {test.duration?`${test.duration} Minutes`:"No Timer"}
                </p>
                <div className="row">
                <div className="col-lg-4 mt-1 order-lg-2">
                        <div className="p-3 shadow mt-lg-5" style={{borderRadius:"18px",minHeight:"200px",backgroundColor:"#f8f8f8"}}>
                            <h4 className="mb-2">Filters</h4>

                            <Select
                                className="mb-2"
                                placeholder="filter By "
                                options={sortOptions}
                                onChange={(e)=>handleSort(e.value)}
                             />
                            <Select
                                placeholder="Numeric Filter"
                                options={filterOptions}
                                value={{label:filterVal,value:filterVal}}
                                onChange={filterChangeHandler}
                            />
                            {showNumberOptions!=0?
                            <form className="values mt-2" onSubmit={filterAdvanceHandler}>
                                 <div className="px-2 mb-1">Number 1 &nbsp;&nbsp;&nbsp; <input type="Number" className="form-control " value={numbers[0]} onChange={(e)=>setNumbers([e.target.value,numbers[1]])} style={{width:"80px",display:"inline"}} />   </div>
                                 <div className="px-2 mb-1">{showNumberOptions==2?<React.Fragment>Number 2 &nbsp;&nbsp;&nbsp; <input type="Number" className="form-control " value={numbers[1]} onChange={(e)=>setNumbers([numbers[0],e.target.value])} style={{width:"80px",display:"inline"}} /> </React.Fragment>:null}<button className="btn btn-outline-grad float-right"> Filter </button>  </div>
                            </form>
                            :null
                            }
                            <button className="btn btn-link text-danger" onClick={()=>setFilteredStudents(allStudents)}>Clear</button>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-2 mb-5 " >
                        <div className="my-2 text-right"> <button className="btn btn-grad " onClick={()=>handleRelease(allStudents)}> Release All </button> </div>
                        <div className="p-2" style={{position:"relative"}}>
                            <table className="table table-striped">
                                <thead style={{boxShadow:"0px 4px 8px rgba(0,0,0,0.5)"}}>
                                <tr>
                                    <th></th>
                                    <th>AutoGrade</th>
                                    <th>Final</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                  <td><b>Average</b></td>
                                  <td> {avg.marks} / {test.marks}  </td>
                                  <td> {avg.finalMarks} / {test.marks} </td>
                                  <td> </td>
                                </tr>

                                {filteredStudents.map((stu,i)=>(
                                    <tr key={i}>
                                        <td className="pointer hover-pink"> <b>{stu.userId.name} </b></td>
                                        <td> {stu.testSubmissionId?stu.testSubmissionId.marks:-1}/{test.marks} </td>
                                        <td> {stu.testSubmissionId?stu.testSubmissionId.finalMarks:-1}/{test.marks} </td>
                                        <td> {stu.released?<button className="btn btn-grad cursor-disabled" disabled>Released</button>:<button className="btn btn-outline-grad" onClick={()=>handleRelease([stu])}> Release </button>} </td>
                                    </tr>
                                ))}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}


export default Results;
