import React, { useState,useEffect } from "react";
import Modal from "../ui/modal/modal";
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import TopicItem from "./topicItem";
import axios from "axios";
import "./content.css"

const Topic = (props)=>{
    const [details,setDetails] = useState({title:"",description:""});
    const [content,setContent] = useState([]);

    useEffect(()=>{
      console.log("use effect");
      axios.get(`/content/topic/${props.match.params.id}`)
          .then(res=>{
            console.log(res.data);
            if(res.data.success){
              setDetails({title:res.data.data.title,description:res.data.data.description});
              setContent(res.data.data.items);
            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
    },[])

    const deleteItem = (type,id)=>{
      if(type=="video"){
        const newContent = content.filter(item=>item.video._id!=id);
        setContent(newContent);
      }else{
        const newContent = content.filter(item=>item.deliverable._id!=id);
        setContent(newContent);
      }
    }

    const handleSave = ()=>{
        const items = content.map(item=>{
          if(item.video)
            return {video:item.video._id};
          else
            return {deliverable: item.deliverable._id};
        });
        const data = {title:details.title,description:details.description,items};
        console.log("new updated sequence",data);
        axios.put(`/content/topic/${props.match.params.id}`,{...data})
          .then(res=>{
            if(res.data.success){
              console.log("Saved");
            }else{
              console.log(res.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
      setContent(content => (
        arrayMove(content, oldIndex, newIndex)
    ));
  };

    const addVideo = ()=>{
        axios.get(`/topic/${props.match.params.id}/createVideo`)
          .then(res=>{
              if(res.data.success){
                props.history.push({pathname:`/video/${res.data.video._id}`,topicId:props.match.params.id});
              }else{
                console.log(res.data.msg);
              }
          })
          .catch(err=>{
              console.log(err.message);
          })
    }

    const addDeliverable = ()=>{
        axios.get(`/topic/${props.match.params.id}/createDeliverable`)
          .then(res=>{
              if(res.data.success){
                props.history.push({pathname:`/deliverable/${res.data.deliverable._id}`,topicId:props.match.params.id});
              }else{
                console.log(res.data.msg);
              }
          })
          .catch(err=>{
              console.log(err.message);
          })
    }

    const SortableItem = sortableElement(({item}) => {  let data;
                                                        if(item.video)
                                                            data = item.video;
                                                        else
                                                            data = item.deliverable;
                                                          return(<TopicItem data={data} type={item.video?"video":"deliverable"} topicId={props.match.params.id} deleteItem={deleteItem} handleSave={handleSave}/>)
                                                        });

    const SortableContainer = sortableContainer(({children}) => {
      return <div>{children}</div>;
    });

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


                <SortableContainer onSortEnd={onSortEnd} distance={1} >
                  {content.map((item, index) => (
                    <SortableItem key={item._id} index={index} item={item} />
                  ))}
                </SortableContainer>


            </div>

        </div>
    )

    return (
        <Modal title="Topic" save={handleSave} close={()=>{props.history.push('/content')}}>
            {topicMain}
        </Modal>
    );


};


export default Topic;
