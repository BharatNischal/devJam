import React from "react";
import Rating from "../rating/rating";

import "./skill.css";

const Skill = (props)=>{
    const images = require.context('./images', true);
    let img = images('./' + props.icon +".png");
 return(
    <div className="row mb-2">
        <div className="col-4"> <div className="iconCont" >
             <div className="innerIconCont"> 
                <img src={img} className="iconImg" alt="skill icon" />
             </div> 
        </div></div>
        <div className="col-8">
            <Rating val={props.rating} size="18px" />
            <h5 className="pl-2" > {props.experience} Years</h5>
        </div>
    </div>);
};

export default Skill;