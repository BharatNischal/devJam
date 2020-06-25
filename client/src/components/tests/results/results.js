import React, { useState, useEffect } from 'react';
import Nav from "../../profile/Nav/Nav";
import Select from "react-select";
import Axios from 'axios';
var allStudents=[];
function Results(props) {

    const [test,setTest] = useState({});
    const [filteredStudents,setFilteredStudents] = useState([]);

    useEffect(function(){
        Axios.get(`/submissions/test/${props.match.params.id}`)
        .then(function(res){
            if(res.data.success){
                 const {title,duration,instructions} = res.data.test;
                 setTest({title,duration,instructions});
                 
                 allStudents=res.data.test.students;
                 setFilteredStudents(res.data.test.students);
            }else{
                alert(res.data.msg);
            }
        }).catch(function(err){
            alert(err.message);
        })

    },[])

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
                                placeholder="Sort "
                                // options={sortOptions}
                                // onChange={(e)=>handleSort(e.value)}
                             />
                            <Select
                                // options={filterOoptions}
                                // value={{label:filterVal,value:filterVal}}
                                // onChange={filterChangeHandler}
                            />
                            {/* {showNumberOptions!=0?
                            <form className="values mt-2" onSubmit={filterAdvanceHandler}>
                                 <div className="px-2 mb-1">Number 1 &nbsp;&nbsp;&nbsp; <input type="Number" className="form-control " value={numbers[0]} onChange={(e)=>setNumbers([e.target.value,numbers[1]])} style={{width:"80px",display:"inline"}} />   </div>
                                 <div className="px-2 mb-1">{showNumberOptions==2?<React.Fragment>Number 2 &nbsp;&nbsp;&nbsp; <input type="Number" className="form-control " value={numbers[1]} onChange={(e)=>setNumbers([numbers[0],e.target.value])} style={{width:"80px",display:"inline"}} /> </React.Fragment>:null}<button className="btn btn-outline-grad float-right"> Filter </button>  </div>
                            </form>
                            :null
                            } */}
                            <button className="btn btn-link text-danger" >Clear</button>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-1 mb-5 " >
                        <div className="p-2" style={{position:"relative"}}>
                            <table class="table table-striped">
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
                                  <td>x / 50</td>
                                  <td>x / 50</td>
                                  <td> </td>
                                </tr>
                                
                                {filteredStudents.map((stu,i)=>(
                                    <tr key={i}>
                                        <td> <b>{stu.userId.name} </b></td>
                                        <td> {stu.testSubmissionId?stu.testSubmissionId.marks:-1}/{stu.testSubmissionId?stu.testSubmissionId.maxMarks:-1} </td>
                                        <td> {stu.testSubmissionId?stu.testSubmissionId.finalMarks:-1}/{stu.testSubmissionId?stu.testSubmissionId.maxMarks:-1} </td>
                                        <td> <button className="btn btn-grad" > Release </button> </td>
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

