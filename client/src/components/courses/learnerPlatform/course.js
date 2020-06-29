import React, { useState, useEffect } from 'react';
import TopBar from "../../learnerPlatform/TopBar";
import Axios from 'axios';

function Course(props) {
    const [courses,setCourses] = useState([]);

    useEffect(function(){
        Axios.get("/allPublishedCourses")
        .then(res=>{
            if(res.data.success){
                setCourses(res.data.courses);
            }else{
                alert(res.data.msg);
            }
        }).catch(err=>{
            alert(err.message);
        })
    },[])

    return (
        <React.Fragment>
            <TopBar/>
            <div className="bgwhiteoverlay"></div>
            <div className="container" style={{marginTop:"120px"}} >
                <h1 className="text-pink"> Your Courses </h1>
                <div className="row mt-4 justify-content-center" >
                    <div className="col-lg-8">
                        {courses.map((course,i)=>(
                            <div className="p-3 my-3 pointer" style={{position:"relative",borderRadius:"20px", boxShadow:"0px 4px  10px rgba(0,0,0,0.3)"}} >
                                <div className="align-center" style={{ display:"flex" , justifyContent:"space-between" }} >
                                    <div className="pt-2 hover-pink" ><h3 className="topicTitle d-inline mr-2" style={{fontSize:"20px"}}> {course.title}</h3></div>
                                    <div> <button className="btn btn-grad ml-2" onClick={()=>props.history.push(`/course/${course._id}`)} >View Course</button></div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default Course;

