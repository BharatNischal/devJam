import React, { useState } from "react";
import Modal from "../ui/modal/modal";
import "./content.css"

const Topic = (props)=>{
    const [details,setDetails] = useState({title:"",description:""});
    

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
                    <button className="btn text-pink btn-outline-grad mr-2"> + Add </button>
                    <button className="btn text-pink btn-outline-grad"> + Create </button>
                </div>


                {/* List ITEMS START HERE */}
                
                <div className="row mt-4 mb-2 mx-2 mx-md-4 itemBox cursor-pointer" >
                    <div className="col-2 p-0">
                        <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" className="itemImg" />
                    </div>
                    <div className="col-10 p-0 py-3 pl-2">
                        <h6>1. Task To Have Fun  & keep travelling </h6>
                        <span className="float-right pr-2 cursor-pointer"> <i className="fa fa-close"></i></span>
                    </div>
                </div>
                <div className="row mt-4 mb-2 mx-2 mx-md-4 itemBox cursor-pointer" >
                    <div className="col-2 p-0">
                        <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" className="itemImg" />
                    </div>
                    <div className="col-10 p-0 py-3 pl-2">
                        <h6>1. Task To Have Fun  & keep travelling </h6>
                        <span className="float-right pr-2 cursor-pointer"> <i className="fa fa-close"></i></span>
                    </div>
                </div>
                
            </div>
            
        </div>
    )

    return (
        <Modal title="Topic" >
            {topicMain}
        </Modal>
    );


};


export default Topic;