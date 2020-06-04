import React, { useState,useEffect,useContext } from "react";
import Modal from "../ui/modal/modal";
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import TopicItem from "./topicItem";
import {CurUserContext} from "../../contexts/curUser";
import axios from "axios";
import "./content.css"
import Alert from "../ui/alert/alert";
import Nav from "../profile/Nav/Nav";

const Topic = (props)=>{
    // States for data
    const [details,setDetails] = useState({title:"",description:""});
    const [content,setContent] = useState([]);
    // State to get current login status of user
    const {user} = useContext(CurUserContext);
    // UI state
    const [loading,setLoading] = useState(true);
    const [showWarningAlert,setWarningAlert] = useState(false);
    const [showSavedAlert,setShowSavedAlert] = useState(false);

    useEffect(()=>{
      if(user.loggedIn){  //Frontend authorization for admin
        axios.get(`/content/topic/${props.match.params.id}`)
            .then(res=>{
              if(res.data.success){
                setDetails({title:res.data.data.title,description:res.data.data.description});
                setContent(res.data.data.items);
              }else{
                console.log(res.data.msg);
              }
              setLoading(false);
            })
            .catch(err=>{
              console.log(err.message);
              setLoading(false);
            })
      }else{
        props.history.push("/login");
      }
    },[])

    // Delete video/deliverable from State (used asa prop in topicItem)
    const deleteItem = (type,id)=>{
      if(type=="video"){
        console.log("inside video");
        console.log(content);
        const newContent = content.filter(item=>(!item.video || item.video._id!=id));
        setContent(newContent);
      }else{
        const newContent = content.filter(item=>(!item.deliverable || item.deliverable._id!=id));
        setContent(newContent);
      }
    }

    // Delete topic and all its contents from database and State
    const deleteTopic = ()=>{
      setLoading(true);
      axios.delete(`/content/topic/${props.match.params.id}`)
        .then(res=>{
            if(res.data.success){
              props.history.push("/content");
            }
            setLoading(false);
        })
        .catch(err=>{
          console.log(err.message);
          setLoading(false);
        })
    }

    // Save the current state and its order(Drag n drop) in database
    const handleSave = ()=>{

        const items = content.map(item=>{
          if(item.video)
            return {video:item.video._id};
          else
            return {deliverable: item.deliverable._id};
        });
        const data = {title:details.title,description:details.description,items};
        setLoading(true);
        console.log("new updated sequence",data);
        axios.put(`/content/topic/${props.match.params.id}`,{...data})
          .then(res=>{
            if(res.data.success){
              console.log("Saved");
              setShowSavedAlert(true);
              setTimeout(()=>{
                setShowSavedAlert(false);
              },2000)
            }else{
              console.log(res.msg);
            }
            setLoading(false);
          })
          .catch(err=>{
            setLoading(false);
            console.log(err.message);
          })
    }

    // Logic that handles close operation
    const onCloseHandler= ()=>{
      if(details.title!==""){
        props.history.push("/content");
      }else{
        setWarningAlert(true);
      }
    }

    

// Fxn to keep track of new indices on drag and drop
    const onSortEnd = ({oldIndex, newIndex}) => {
      setContent(content => (
        arrayMove(content, oldIndex, newIndex)
    ));
  };

// Add a new empty video to current topic in database and redirect to /video/Id
    const addVideo = ()=>{
        axios.get(`/topic/${props.match.params.id}/createVideo`)
          .then(res=>{
              if(res.data.success){
                props.history.push({pathname:`/video/${res.data.video._id}`,topicId:props.match.params.id,fromContent:false});
              }else{
                console.log(res.data.msg);
              }
          })
          .catch(err=>{
              console.log(err.message);
          })
    }

// Add a new empty deliverable to current topic in database and redirects to /deliverable/Id
    const addDeliverable = ()=>{
        axios.get(`/topic/${props.match.params.id}/createDeliverable`)
          .then(res=>{
              if(res.data.success){
                props.history.push({pathname:`/deliverable/${res.data.deliverable._id}`,topicId:props.match.params.id,fromContent:false});
              }else{
                console.log(res.data.msg);
              }
          })
          .catch(err=>{
              console.log(err.message);
          })
    }

// React HOC for drag and drop items
    const SortableItem = sortableElement(({item}) => {  let data;
                                                        if(item.video)
                                                            data = item.video;
                                                        else
                                                            data = item.deliverable;
                                                          return(<TopicItem data={data} type={item.video?"video":"deliverable"} topicId={props.match.params.id} deleteItem={deleteItem} handleSave={handleSave}/>)
                                                        });

// React HOC for drag and drop items
    const SortableContainer = sortableContainer(({children}) => {
      return <div>{children}</div>;
    });

// Main UI
    const topicMain=(
        <div className="row">
            <div className="col-md-8 mt-3" style={{borderRight:"1px solid #aaa"}}>
                <div className="form-group input-group px-lg-4">
                    <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-pencil" ></i></div>
                    <input type="text" name="title" value={details.title} onChange={(e)=>setDetails({...details,title:e.target.value})} placeholder="Enter Title" className="form-control" required />
                </div>
                <div className="form-group input-group px-lg-4">
                    <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-align-justify" ></i></div>
                    <textarea name="description"  onChange={(e)=>setDetails({...details,description:e.target.value})} rows="5" placeholder="Enter Description" className="form-control" value={details.description} required ></textarea>
                </div>
                <div className="px-lg-4">
                    <button className="btn text-pink btn-outline-grad mr-2" onClick={async ()=>{await handleSave();addVideo()}}> <i className="fa fa-paperclip"></i> Add </button>
                    <button className="btn text-pink btn-outline-grad" onClick={async ()=>{await handleSave();addDeliverable()}}> <i className="fa fa-plus"></i> Create </button>
                </div>


                <SortableContainer onSortEnd={onSortEnd} distance={1} lockAxis="y">
                  {content.map((item, index) => (
                    <SortableItem key={item._id} index={index} item={item} />
                  ))}
                </SortableContainer>


            </div>

        </div>
    )

    return (
      <React.Fragment>
        <Nav show={true} menu={true}/>
        {showWarningAlert?<Alert msg="Topic Will not be saved As Title is Empty. Would you Like to continue?" cancel={()=>setWarningAlert(false)} ok={deleteTopic} />:null}
        <Modal title="Topic" save={handleSave} close={onCloseHandler} delete={deleteTopic}>
            {loading?<div className="text-center"> <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" /> </div>:topicMain}
            {showSavedAlert?<div className="custom-alert"> <i className="fa fa-check-circle text-success" ></i> Topic Saved </div>:null}
        </Modal>
      </React.Fragment>
    );


};


export default Topic;
