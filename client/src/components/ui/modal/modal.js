import React from "react";
import "./modal.css";


// It is a card based template used by other components
const Modal=(props)=>{
    return(
        <div className="custModal text-left p-3 ">
            <div className="row">
                <div className="col-12 p-2">
                    <span className="px-3 h2 " onClick={props.close}> <i className="fa fa-close"></i> </span>
                    <h1 className="h2 d-inline"> {props.title}</h1>
                    <button className="float-right btn bg-grad text-white " onClick={props.save}> Save  </button>
                    {props.delete?<div className="float-right pr-2" style={{display:"inline-block"}}><button className=" btn  btn-outline-danger  " onClick={props.delete}> Delete </button></div>:null}
                    <hr/>
                </div>
            </div>
            {props.children}
        </div>
    )

}

export default Modal;
