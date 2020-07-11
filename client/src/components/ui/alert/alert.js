import React from "react";
import "./alert.css";

const Alert =(props)=>{
    return(
    <React.Fragment>
    <div className="backdropAlert"></div>
    <div className="custAlert shadow" style={props.style} >
        <div className="p-2 alertbody">
            {props.msg || props.children}
        </div>
        <div className="footer">
             {props.cancel?<button className="splBtn btn btn-outline-cancel mr-2" onClick={props.cancel}> Cancel </button>:null}
             {props.ok?<button className="btn btn-outline-grad px-4" onClick={props.ok} > OK </button>:null}

        </div>
    </div>
    </React.Fragment>
    );
}

export default Alert;
