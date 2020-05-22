import React from "react";

const Exp=(props)=>(
    <div>
        <div className="row ">
            <div className="col-4 p-1">
                <div className="iconCont ">  <i className="fas fa-briefcase "></i></div>
            </div>
            <div className="col-8 p-1 pt-2">
                <h4 className="edHeading m-0"> {props.position} at <br /> <span className="text-gray" >{props.company}</span></h4>
                <p className="text-gray p-0 m-0 "><i>  {props.from.substr(0,10)} to {props.present?"present":props.to.substr(0,10)} </i></p>
            </div>
            .<div className="col-lg-2"></div>
            <div className="col-12 col-lg-7 pl-2 pt-lg-3 ">
                <p>{props.description}</p>
            </div>
        </div>
        </div>
);

export default Exp;
