import React from "react";
import "./education.css";
import Degree from "./degree/degree";

const Education = (props)=>{
    return (
    <div className="edCont">
        
        {props.data.map(ed=>(
            <Degree degree={ed.degree} key={ed._id} subject={ed.subject} university={ed.schoolName} from={ed.from} present={ed.to.present} to={ed.to.date} />
        ))}
               
        
    </div>
    );
};

export default Education;