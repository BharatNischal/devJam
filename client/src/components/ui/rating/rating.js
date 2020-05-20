import React from "react";
import Star from "./star";
import "./ui.css";

const Rating = (props)=>{
    
    const stars=[];
    var fill= Number( props.val);
    for(let i=1;i<=5;i++ ){
        if(i<=fill){
            stars.push(<span key={i} className="fill" > <Star size={props.size} /> </span>)
        }else{
            stars.push(<span key={i}> <Star size={props.size} /> </span>)
        }
    }

    return(
    <React.Fragment>
        <div className="rating ml-2">
            {stars}
        </div>
        <p> This is an average star rating based on hard skills & soft skills.</p>
    </React.Fragment>
)};

export default Rating;
