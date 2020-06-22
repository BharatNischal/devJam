import React, { useState } from 'react';
import placeholder from "../../Placeholder.png";
import Option from './option';
import { NonceProvider } from 'react-select';
function MCQ(props) {
    
    //UI STATES
    const [isAutograde,setIsAutograde] =useState(false);

    return (
        <React.Fragment>
             <div className="row mt-3 text-left">  
                    <Option text="Option 1" id="1" />
                    <Option text="Option 2" id="2" />
                    <Option text="Option 3" id="3" />
            </div>
            
            <div className="mt-2">
                <form > <input className="w-100 p-2" style={{border:"none",borderBottom:"2px solid #a1a1a1a1"}} placeholder="Add Option"/></form>
                {/* <button className="btn hover-pink"> <i className="fa fa-plus-circle"></i> Add Option  </button> */}
            </div>
            <div className="mt-3 text-left">
                <div className="custom-control custom-switch d-inline" >
                    <label className="custom-control-label" htmlFor={"isAutoGradeCheck"+props.id }>Autograde</label>
                    <input type="checkbox" className="custom-control-input" id={"isAutoGradeCheck"+props.id } checked={isAutograde} onChange={(e)=> setIsAutograde(e.target.checked)} />
                </div>
                {isAutograde?<input type="number" className="form-control d-inline p-1" style={{width:"50px",marginLeft:"10px",height:"25px"}}  ></input>:null}
            </div>
        </React.Fragment>
    )
}


export default MCQ;

