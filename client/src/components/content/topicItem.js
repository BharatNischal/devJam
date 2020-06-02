import React from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";

// This component is used for individual video/ Deliverable UI in topic page
const TopicItem = (props)=>{
    const data = props.data;

//  Delete item from database and then call props.deleteItem to remove that item from state
    const handleDelete = ()=>{
      axios.delete(`/topic/${props.topicId}/${props.type}/${data._id}`)
        .then(res=>{
          props.deleteItem(props.type,props.data._id);
        })
        .catch(err=>{
          console.log(err.message);
        })
    }


    return (
            <div className="row mt-4 mb-2 mx-2 mx-md-4 itemBox cursor-pointer "  >
                <div className="col-2 p-0">
                    <img src={data.url?data.url.substr(0, data.url.lastIndexOf("."))+".jpg":"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"} className="itemImg" />
                </div>
                <div className="col-8 p-0 py-3 pl-2 align-self-center" onClick={async ()=>{await props.handleSave();props.history.push({pathname:`/${props.type}/${data._id}`,topicId:props.topicId})}}>
                    <h6>{data.title} </h6>
                </div>
                <div className="col-1 align-self-center" onClick={handleDelete}>
                    <span className="float-right  cursor-pointer" > <i className="fa fa-close"></i></span>
                </div>
            </div>
    );
}

export default withRouter(TopicItem);
