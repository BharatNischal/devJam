import React from "react";
import axios from "axios";

const TopicItem = (props)=>{
    const data = props.data;

    const handleDelete = ()=>{
      axios.delete(`http://localhost:8080/topic/${props.topicId}/${props.type}/${data._id}`)
        .then(res=>{
          console.log(res);
          props.deleteItem(props.type,data._id);
        })
        .catch(err=>{
          console.log(err.message);
        })
    }

    return (
            <div className="row mt-4 mb-2 mx-2 mx-md-4 itemBox cursor-pointer " onClick={()=>alert("Hello")} >
                <div className="col-2 p-0">
                    <img src={data.url?data.url.substr(0, data.url.lastIndexOf("."))+".jpg":"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"} className="itemImg" />
                </div>
                <div className="col-10 p-0 py-3 pl-2">
                    <h6>{data.title} </h6>
                    <span className="float-right pr-2 cursor-pointer" onClick={handleDelete}> <i className="fa fa-close"></i></span>
                </div>
            </div>
    );
}

export default TopicItem;
