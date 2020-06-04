import React, { useState, useEffect,useContext } from "react";
import Modal from "../ui/modal/modal";
import Nav from "../profile/Nav/Nav";
import axios from "axios";
import {CurUserContext} from "../../contexts/curUser";

const Deliverable =(props)=>{
    // states for keepind data
    const [title,setTitle] = useState("");
    const [instruction,setInstruction] = useState("");
    const [dueDate,setDueDate] = useState("");
    const [points,setPoints]= useState("");
    // UI states
    const [loading,setLoading] = useState(true);
    const [err,setErr] = useState(null);
    // Get the status of user if it is loggedin or not
    const {user} = useContext(CurUserContext);

    useEffect(()=>{
        if(user.loggedIn){  //Frontend authorization for admin
          if(!props.empty){
              axios.get(`/deliverable/${props.match.params.id}`)
              .then(res=>{

                  if(res.data.success){

                      setLoading(false);
                      setTitle(res.data.data.title?res.data.data.title:"");
                      setInstruction(res.data.data.instruction?res.data.data.instruction:"");
                      setDueDate(res.data.data.dueDate?res.data.data.dueDate.substr(0,10):"");
                      setPoints(res.data.data.points?res.data.data.points:"");

                  }else{
                      setLoading(false);
                      setErr(res.data.msg);
                  }
              })
              .catch(err=>{
                  setLoading(false);
                  setErr(err.message);
              })
          }
        }else{
          props.history.push("/login");
        }
    },[])

// Save the deliverable to database
    const saveDeliverableHandler=()=>{
        setLoading(true);
        axios.put(`/deliverable/${props.match.params.id}`,{title,instruction,dueDate,points})
            .then(res=>{

                if(res.data.success){
                    setLoading(false);
                }else{
                    setLoading(false);
                    setErr(res.data.msg);
                }
            })
            .catch(err=>{
                setLoading(false);
                setErr(err.message);
            })
    }

    // Main UI
    const delMain=(
        <div className="row">

                <div className="col-md-8 mt-3" style={{borderRight:"1px solid #aaa"}}>
                    <div className="form-group input-group px-lg-4">
                        <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-pencil" ></i></div>
                        <input type="text" name="title" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Enter Title" className="form-control" required />
                    </div>
                    <div className="form-group input-group px-lg-4">
                        <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-align-justify" ></i></div>
                        <textarea name="instructions"  onChange={(e)=>setInstruction(e.target.value)} rows="5" placeholder="Enter Instructions" className="form-control" value={instruction} required ></textarea>
                    </div>
                </div>
                <div className="col-md-4 mt-md-3">
                    <div className="form-group input-group px-lg-4">
                        <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-user" ></i></div>
                        <input type="number" name="points" min="0" value={points} onChange={(e)=>setPoints(e.target.value)} placeholder="Enter Points" className="form-control" required />
                    </div>
                    <span className="px-lg-4">Due Date </span><br/>
                    <div className="form-group input-group px-lg-4">

                        <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fas fa-calendar-alt" ></i></div>
                        <input type="date" name="dueDate"  value={dueDate} onChange={(e)=>setDueDate(e.target.value)} placeholder="Enter Due Date" className="form-control" required />

                    </div>
                </div>
            </div>
    );

    return(
        <React.Fragment>
        <Nav show={true} menu={true}/>
        <Modal title="Deliverable" save={saveDeliverableHandler} close={()=>{props.location.topicId?props.history.push(`/topic/${props.location.topicId}`):props.history.push("/content")}} >
            {loading?<div className="text-center"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" /></div>
                :err?<p>{err}</p>:delMain}
        </Modal>
        </React.Fragment>
    )

}

export default Deliverable;
