import React, { useState, useEffect,useContext } from "react";
import Modal from "../ui/modal/modal";
import Nav from "../profile/Nav/Nav";
import axios from "axios";
import {CurUserContext} from "../../contexts/curUser";
import Alert from "../ui/alert/alert";

const Deliverable =(props)=>{
    // states for keepind data
    const [title,setTitle] = useState("");
    const [instruction,setInstruction] = useState("");
    const [dueDate,setDueDate] = useState("");
    const [points,setPoints]= useState("");
    // Used to make sure title is provided
    const [valid,setValid] = useState(false);
    // UI states
    const [loading,setLoading] = useState(true);
    const [err,setErr] = useState(null);
    const [showWarningAlert,setShowWarningAlert] = useState(false); //alert for close button without title
    const [showSaveAlert,setShowSaveAlert] = useState(false); //alert for save button without title
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
                      if(res.data.data.title && res.data.data.title.length>0)
                        setValid(true);
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
        if(title.length>0){
          setLoading(true);
          axios.put(`/deliverable/${props.match.params.id}`,{title,instruction,dueDate,points})
              .then(res=>{

                  if(res.data.success){
                      setLoading(false);
                      setValid(true);
                  }else{
                      setLoading(false);
                      setErr(res.data.msg);
                  }
              })
              .catch(err=>{
                  setLoading(false);
                  setErr(err.message);
              })
        }else{
          setShowSaveAlert(true);
        }
    }

    // close Handler
    const onCloseHandler =()=>{
        if(valid){
            props.location.fromContent?props.history.push("/content"):props.history.push(`/topic/${props.location.topicId}`);
        }else{
            setShowWarningAlert(true);
        }
    }

    //Delete Item
    const handleDelete = ()=>{
        axios.delete(`/topic/${props.location.topicId}/deliverable/${props.match.params.id}`)
          .then(res=>{
            props.location.fromContent?props.history.push("/content"):props.history.push(`/topic/${props.location.topicId}`);
          })
          .catch(err=>{
            console.log(err.message);
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
        {showWarningAlert? <Alert msg="Deliverable will not be saved as there is no title or you may have not saved, would you like to continue? " cancel={()=>setShowWarningAlert(false)} ok={handleDelete} />:null}
        {showSaveAlert? <Alert msg="Please Provide the Title for the Deliverable " ok={()=>{setShowSaveAlert(false)}} />:null}
        <Modal title="Deliverable" save={saveDeliverableHandler} close={onCloseHandler} >
            {loading?<div className="text-center"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" /></div>
                :err?<p>{err}</p>:delMain}
        </Modal>
        </React.Fragment>
    )

}

export default Deliverable;
