import React from 'react';
import placeholder from "../../Placeholder.png";

function Option(props) {
    return (
        <div className="col-md-6 mb-2">
        <div className="row">
            <div className="col-10">
                <div className=" custom-control custom-radio">
                    <input type="radio" name="opt" id={"a"+props.id} className="custom-control-input" />
                    <label className="custom-control-label" htmlFor={"a"+props.id}>{props.text}  </label>
                </div>
                <div className="ml-4 mt-1" > <img src={props.img || placeholder} style={{maxHeight:"100px"}} className="img-fluid" /></div>
            </div>
            <div className="col-2">
                    <i className="fa fa-image pointer hover-pink"></i> 
                    <i className="fa fa-close pointer hover-danger ml-md-2"></i> 
            </div>
        </div>
        </div>
    )
}


export default Option;

