import React from "react";

const Exp=(props)=>(
    <div>
        <div className="row ">
            <div className="col-4 p-1">
                <div className="iconCont ">  <i className="fas fa-briefcase "></i></div>
            </div>
            <div className="col-8 p-1 pt-2">
                <h4 className="edHeading m-0"> {props.position} at <br /> <span className="text-gray" >{props.company}</span></h4>
                <p className="text-gray p-0 m-0 "><i>  {props.from} to {props.present?"present":props.to} </i></p>
            </div>
            .<div className="col-lg-2"></div>
            <div className="col-12 col-lg-7 pl-2 pt-lg-3 ">
              <p>Build and align aerial imagery taken with drones and
                troubleshoot where automated processing failed. Also Track
                image processing jobs using the web based platform and SQL.
                End-to-End Tests: Created highly performant and extremely
                stable end-to-end test suite using Cypress.</p> 
            </div>
        </div>
        </div>
);

export default Exp;