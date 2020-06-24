import React from 'react';
import placeholder from "../Placeholder.png";

function MCQ(props) {
    return (
        <div className="mt-3 text-center pl-3">
               <h4 className="text-left"> 12 is 40% of what number? </h4>
               <div className="qImg mb-2"  >
                    <span > <img src={placeholder} style={{maxHeight:"200px"}} className="img-fluid" /></span>
                </div>

                <div className="text-left row my-3">
                    <div className="col-md-6 mb-2">
                        <div className=" custom-control custom-radio">
                            <input type="radio" name="opt" id={"a1"} className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor={"a1"}> <b>505 is Correct</b>  </label>
                        </div>
                        <div className="ml-4 mt-1" > <img src={placeholder} style={{maxHeight:"130px"}} className="img-fluid" /></div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className=" custom-control custom-radio">
                            <input type="radio" name="opt" id={"a4"} className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor={"a4"}> <b>505 is Correct</b>  </label>
                        </div>
                        <div className="ml-4 mt-1" > <img src={placeholder} style={{maxHeight:"130px"}} className="img-fluid" /></div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className=" custom-control custom-radio">
                            <input type="radio" name="opt" id={"a2"} className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor={"a2"}> <b>505 is Correct</b>  </label>
                        </div>
                        <div className="ml-4 mt-1" > <img src={placeholder} style={{maxHeight:"130px"}} className="img-fluid" /></div>
                    </div>
                    <div className="col-md-6 mb-2">
                        <div className=" custom-control custom-radio">
                            <input type="radio" name="opt" id={"a3"} className="custom-control-input"/>
                            <label className="custom-control-label" htmlFor={"a3"}> <b>505 is Correct</b>  </label>
                        </div>
                        <div className="ml-4 mt-1" > <img src={placeholder} style={{maxHeight:"130px"}} className="img-fluid" /></div>
                    </div>
                </div>
                <div className="text-center">
                    <span className="mr-4 pointer hover-pink">
                        <i className="fa fa-less-than"></i>
                    </span>
                    <span className="mr-4"> <button className="btn bg-grad text-white"> Submit </button> </span>
                    <span className="mr-2 pointer hover-pink" >
                        <i className="fa fa-greater-than"></i>
                    </span>
                    
                </div>
                
           </div>
    )
}


export default MCQ;

