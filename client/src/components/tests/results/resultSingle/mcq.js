import React from 'react';
import Placeholder from "../../Placeholder.png";

function MCQ(props) {
    return (
        <div className="row mt-3 text-left" style={{position:"relative"}}>
            <div className="col-md-6 mb-2 p-3 " style={{backgroundColor:"#f7cbcb"}}>
                <div className=" custom-control custom-radio" >
                    <input type="radio"  id="01" className="custom-control-input" checked={true} />
                    <label className="custom-control-label" htmlFor="o1"> Option 1  </label>
                </div>
                <div className="ml-4 mt-1" >
                       <img src={Placeholder} style={{maxHeight:"100px"}} className="img-fluid" />    
                </div>
                <span className="text-danger h4" style={{position:"absolute",top:"8px",right:"8px"}}> <i className="fa fa-close"></i> </span>
            </div>
            <div className="col-md-6 mb-2 p-3">
                <div className=" custom-control custom-radio">
                    <input type="radio"  id="01" className="custom-control-input" disabled/>
                    <label className="custom-control-label" htmlFor="o1"> Option 1  </label>
                </div>
                <div className="ml-4 mt-1" >
                       <img src={Placeholder} style={{maxHeight:"100px"}}  className="img-fluid" />    
                </div>
            </div>
            <div className="col-md-6 mb-2 p-3">
                <div className=" custom-control custom-radio">
                    <input type="radio"  id="02" className="custom-control-input" disabled/>
                    <label className="custom-control-label" htmlFor="o2"> Option 1  </label>
                </div>
                <div className="ml-4 mt-1" >
                       <img src={Placeholder} style={{maxHeight:"100px"}} className="img-fluid" />    
                </div>
            </div>
            <div className="col-md-6 mb-2 p-3" style={{backgroundColor:"#b7eba9"}} >
                <div className=" custom-control custom-radio">
                    <input type="radio"  id="03" className="custom-control-input" checked={true}  />
                    <label className="custom-control-label" htmlFor="o3"> Option 1  </label>
                </div>
                <div className="ml-4 mt-1" >
                       <img src={Placeholder} style={{maxHeight:"100px"}} className="img-fluid" />    
                </div>

                <span className="text-success h4" style={{position:"absolute",top:"8px",right:"8px"}}> <i className="fa fa-check"></i> </span>

            </div>
        </div>
    )
}



export default MCQ

