import React, { useState } from "react";
import "./content.css";
import Content from "./content";

const ContentSection=(props)=>{
    const [showMenu,setShowMenu]=useState(false);

    return (
        <div className="m-4 border p-3 section" id={props.id} style={{minHeight:"60vh"}} >
            <div className="sectionHeading p-2 mb-4" >
                <h2 className="text-pink "> {props.title}</h2>
                <button className="float-right text-pink nostyleBtn h4" onClick={()=>setShowMenu(!showMenu)}> <i className="fas fa-ellipsis-v"></i></button>
            </div>

            {props.data.map(item=>{
                let data;
                if(item.video)
                    data=item.video;
                else
                    data=item.deliverable;
                return(
                <div className="sectionItem p-1 p-lg-3 mb-2 row">
                    <div className="col-3 col-md-1 text-center p-0"><span className=" bg-grad text-white rounded-circle h4"> <i className="fa fa-book"></i> </span></div>
                <div className="col-9 col-md-11 p-0"><h5 className=" pl-3" > {data.title}</h5></div>
                </div>);
            })}
            
            


            {/* backdrop & Menu  */}
            <div className={showMenu?"backdrop show":"backdrop"} onClick={()=>setShowMenu(false)}></div>
            <div className={showMenu?"sectionMenu shadow show":"sectionMenu shadow"}>
                <div>Edit</div>
                <div>Add Video</div>
                <div>Add Deliverable</div>
            </div>

        </div>
    )
};

export default ContentSection;