import React from "react";
import "./education.css";
import Degree from "./degree/degree";

const Education = (props)=>{
    return (
    <div className="edCont">
        
        <Degree degree="Bachelor of Technology" subject="Computer Engineering" university="Guru Nanak Dev University" from="July, 2018" present={true} to="June,2021" />
       
        
    </div>
    );
};

export default Education;