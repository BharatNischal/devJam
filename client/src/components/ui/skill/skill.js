import React from "react";
import Rating from "../rating/rating";

import "./skill.css";

const Skill = (props)=>{
    
    const images = require.context('./images', true);
    let img;
    try{
        img = images('./' + props.icon +".png");

    }catch(err){
        img= "noImg";
    }
    
 return(
    <div className="row mb-2">
        <div className="col-4"> <div className="iconCont" >
             <div className="innerIconCont"> 
                {img==="noImg"?<p className="iconImg" > {props.icon} </p>:<img src={img} className="iconImg" alt="skill icon" /> }
             </div> 
        </div></div>
        <div className="col-8">
            <Rating val={props.rating} size="18px" />
            {props.experience?<h5 className="pl-2" > {props.experience} Years</h5>:null}
            {props.description?<p className="pl-2">{props.description}</p>:null}
            

        </div>
    </div>);
};

export default Skill;