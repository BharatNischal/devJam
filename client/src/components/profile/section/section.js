import React from "react";
import "./section.css";


const Section= (props)=>{
    return (
    <section className="section" style={props.style}>
        <h2 className="sectionHead"> {props.heading}</h2>
        
        {props.children}
        

        
    </section>
    );
};

export default Section;