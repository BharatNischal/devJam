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
                {props.option.img?<div className="ml-4 mt-1" >
                    <span style={{position:"relative",display:"inline-block"}}>
                       {props.test.status=="Draft"&&!props.preview?<span className="closeImg fa fa-times-circle-o " onClick={()=>props.update("",props.id,true)} ></span>:null}
                       <img src={props.option.img} style={{maxHeight:"100px"}} className="img-fluid" />
                    </span>
                </div>:null}
            </div>
            <div className="col-2">
                    {props.test.status=="Draft"&&!props.preview?<i className="fa fa-image pointer hover-pink" onClick={()=>setShowImgUploader(true)}></i>:null}
                    {props.test.status=="Draft"&&!props.preview?<i className="fa fa-close pointer hover-danger ml-md-2" onClick={()=>{props.removeOption(props.id)}}></i>:null}
            </div>
        </div>
        </div>
    )
}


export default Option;
