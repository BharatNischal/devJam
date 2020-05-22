import React from "react";

const Degree = (props) => (
    <div>
        <div className="row">
            <div className="col-4 p-1">
                <div className="iconCont ">  <i className="fas fa-user-graduate "></i></div>
            </div>
            <div className="col-8 p-1 pt-2">
                <h4 className="edHeading m-0"> {props.degree} in <br /> <span className="text-gray" >{props.subject} </span></h4>
                <h5 className="edSubHeading text-gray p-0 m-0"> {props.university} </h5>
                <p className="text-gray p-0 m-0 "><i> {props.from.substr(0,10)} to {props.present?"present":props.to.substr(0,10)} </i></p>
            </div>
        </div>
    </div>

);

export default Degree;
