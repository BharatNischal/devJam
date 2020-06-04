import React, { useState } from "react";
import "./content.css";
import Content from "./content";
import {Link,withRouter} from "react-router-dom";
import axios from "axios";


// This component contains a particular topic and all its childrens i.e all videos and deliverables attached to it
const ContentSection=(props)=>{
    const [showMenu,setShowMenu]=useState(false);

// Create a video with unique Id from database and redirects to /video/Id
    const addVideo = ()=>{
        axios.get(`/topic/${props.id.slice(1)}/createVideo`)
          .then(res=>{
              if(res.data.success){
                props.history.push({pathname:`/video/${res.data.video._id}`,fromContent:true,topicId:props.id.slice(1)});  //Here undefine will redirect back to this page when close button is clicked on video page
              }else{
                console.log(res.data.msg);
              }
          })
          .catch(err=>{
              console.log(err.message);
          })
    }

// Create a deliverable with unique Id from database and redirects to /deliverable/Id
    const addDeliverable = ()=>{
        axios.get(`/topic/${props.id.slice(1)}/createDeliverable`)
          .then(res=>{
              if(res.data.success){
                props.history.push({pathname:`/deliverable/${res.data.deliverable._id}`,fromContent:true,topicId:props.id.slice(1)}); //Here undefine will redirect back to this page when close button is clicked on deliverable page
              }else{
                console.log(res.data.msg);
              }
          })
          .catch(err=>{
              console.log(err.message);
          })
    }

// Fxn which deletes a topic and its contents from database and state
    const deleteTopic = ()=>{
      axios.delete(`/content/topic/${props.id.slice(1)}`)
        .then(res=>{
            console.log(res.data.success);
            props.removeTopic(props.id.slice(1));
        })
        .catch(err=>{
          console.log(err.message);
        })
    }

    return (
        <div className="m-4 border p-3 section" id={props.id} style={{minHeight:"60vh"}} >
            <div className="sectionHeading p-2 mb-4" >
                <h2 className="text-pink "> {props.title}</h2>
                <button className="float-right text-pink nostyleBtn h4" onClick={()=>setShowMenu(!showMenu)}> <i className="fas fa-ellipsis-v"></i></button>
            </div>
            {props.data?props.data.map(item=>{
                let data;
                if(item.video)
                    data=item.video;
                else
                    data=item.deliverable;
                return(
                <div className="sectionItem p-1 p-lg-3 mb-2 row" key={item._id}>
                    <div className="col-3 col-md-1 text-center p-0"><span className=" bg-grad text-white rounded-circle h4"> <i className="fa fa-book"></i> </span></div>
                <div className="col-9 col-md-11 p-0"><h5 className=" pl-3" > {data.title}</h5></div>
                </div>);
            }):null}




            {/* backdrop & Menu  */}
            <div className={showMenu?"backdrop show":"backdrop"} onClick={()=>setShowMenu(false)}></div>
            <div className={showMenu?"sectionMenu shadow show":"sectionMenu shadow"}>
                <div><Link className="ml-3"to={`/topic/${props.id.slice(1)}`}>Edit</Link></div>
                <div><button className="btn btn-link text-left text-danger" onClick={deleteTopic} >Delete</button></div>
                <div><button className="btn btn-link text-left" onClick={addVideo} >Add Video</button></div>
                <div><button className="btn btn-link text-left" onClick={addDeliverable} >Add Deliverable</button></div>
            </div>

        </div>
    )
};

export default withRouter( ContentSection);
