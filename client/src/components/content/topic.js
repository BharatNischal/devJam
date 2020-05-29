import React, { useState,useEffect } from "react";
import Modal from "../ui/modal/modal";
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import axios from "axios";
import "./content.css"

const Topic = (props)=>{
    const [details,setDetails] = useState({title:"",description:""});
    const [content,setContent] = useState([{video:{title:"First",url:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",_id:1}},{video:{title:"Second",url:"https://res.cloudinary.com/bharatnischal/video/upload/v1590603310/sgfmzzj8kuuxiopnaoow.jpg",_id:2}},{video:{title:"Third",url:"https://res.cloudinary.com/bharatnischal/video/upload/v1590609296/opjnczl0vdiyney2fkgh.jpg",_id:3}}]);

    useEffect(()=>{
      console.log("use effect");
      axios.get(`http://localhost:8080/content/topic/${props.match.params.id}`)
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


    const handleSave = ()=>{
        const items = content.map(item=>{
          if(item.video)
            return {video:item.video._id};
          else
            return {deliverable: item.deliverable._id};
        });
        const data = {title:details.title,deliverable:details.deliverable,items};
        console.log("new updated sequence",data);
        axios.put(`http://localhost:8080/content/topic/${props.match.params.id}`,{...data})
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
        axios.get(`http://localhost:8080/topic/${props.match.params.id}/createVideo`)
          .then(res=>{
              if(res.data.success){
                props.history.push(`/video/${res.data.video._id}`);
              }else{
                console.log(res.data.msg);
              }
          })
          .catch(err=>{
              console.log(err.message);
          })
    }

    const addDeliverable = ()=>{
        axios.get(`http://localhost:8080/topic/${props.match.params.id}/createDeliverable`)
          .then(res=>{
              if(res.data.success){
                props.history.push(`/deliverable/${res.data.deliverable._id}`);
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
                                                          return(<div className="row mt-4 mb-2 mx-2 mx-md-4 itemBox cursor-pointer">
                                                                    <div className="col-2 p-0">
                                                                        <img src={data.url?data.url.substr(0, data.url.lastIndexOf("."))+".jpg":"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"} className="itemImg" />
                                                                    </div>
                                                                    <div className="col-10 p-0 py-3 pl-2">
                                                                        <h6>{data.title} </h6>
                                                                        <span className="float-right pr-2 cursor-pointer"> <i className="fa fa-close"></i></span>
                                                                    </div>
                                                                </div>)});

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
                    <button className="btn text-pink btn-outline-grad mr-2" onClick={addVideo}> <i className="fa fa-paperclip"></i> Add </button>
                    <button className="btn text-pink btn-outline-grad" onClick={addDeliverable}> <i className="fa fa-plus"></i> Create </button>
                </div>


                <SortableContainer onSortEnd={onSortEnd}>
                  {content.map((item, index) => (
                    <SortableItem key={item._id} index={index} item={item} />
                  ))}
                </SortableContainer>


            </div>

        </div>
    )

    return (
        <Modal title="Topic" save={handleSave}>
            {topicMain}
        </Modal>
    );


};


export default Topic;
