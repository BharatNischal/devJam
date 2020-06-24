import React from 'react';
import placeholder from "../Placeholder.png";

function Paragraph(props) {
    return (
        <div className="mt-3 text-center pl-3">
               <h4 className="text-left"> 12 is 40% of what number? </h4>
               <div className="qImg mb-2"  >
                    <span > <img src={placeholder} style={{maxHeight:"200px"}} className="img-fluid" /></span>
               </div>
               <div className="text-left row my-3">
                   <textarea className="form-control" placeholder="Enter Paragraph answer  " rows="6" >

                   </textarea>
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



export default Paragraph;

