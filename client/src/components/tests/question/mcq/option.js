import React, { useState } from 'react';
import placeholder from "../../Placeholder.png";
import ImgUploader from "../../../ui/imgUploader";

function Option(props) {
    const [showImgUploader,setShowImgUploader] = useState(false);
    return (
        <div className="col-md-6 mb-2">
            {showImgUploader?<ImgUploader update={(url)=>props.update(url,props.id)}  cancel={()=>setShowImgUploader(false)}  />:null}
        <div className="row">
            <div className="col-10">
                <div className=" custom-control custom-radio">
                    <input type="radio" name="opt" id={"a"+props.id} className="custom-control-input" disabled/>
                    <label className="custom-control-label" htmlFor={"a"+props.id}>{props.option.title}  </label>
                </div>
                <div className="ml-4 mt-1" > <img src={props.option.img} style={{maxHeight:"100px"}} className="img-fluid" /></div>
            </div>
            <div className="col-2">
                    <i className="fa fa-image pointer hover-pink" onClick={()=>setShowImgUploader(true)}></i>
                    <i className="fa fa-close pointer hover-danger ml-md-2" onClick={()=>{props.removeOption(props.id)}}></i>
            </div>
        </div>
        </div>
    )
}


export default Option;
