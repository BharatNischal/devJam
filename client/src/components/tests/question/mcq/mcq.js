import React, { useState,useEffect } from 'react';
import placeholder from "../../Placeholder.png";
import Option from './option';
import { NonceProvider } from 'react-select';
function MCQ(props) {

    //UI STATES
    const [isAutograde,setIsAutograde] =useState(false);
    // Data State
    const [option,setOption] = useState("");

    useEffect(()=>{
      setIsAutograde(props.autoGrade);
    },[])

    function addOption(e) {
      e.preventDefault();
      props.handleUpdate(null,{title:option},"options");
      setOption("");
    }

    function removeOption(ind) {
      props.handleUpdate(null,ind,"options",true);
    }

    return (
        <React.Fragment>
             <div className="row mt-3 text-left">
                  {props.options.map((opt,i)=>(
                      <Option option={opt} update={props.updateOptImg} key={i} id={i}  removeOption={removeOption}/>
                  ))}
            </div>

            <div className="mt-2">
                <form onSubmit={addOption}> <input className="w-100 p-2" value={option} onChange={(e)=>{setOption(e.target.value)}} style={{border:"none",borderBottom:"2px solid #a1a1a1a1"}} placeholder="Add Option"/></form>
                {/* <button className="btn hover-pink"> <i className="fa fa-plus-circle"></i> Add Option  </button> */}
            </div>
            <div className="mt-3 text-left">
                <div className="custom-control custom-switch d-inline" >
                    <input type="checkbox" className="custom-control-input" id={"isAutoGradeCheck"+props.id } checked={isAutograde} onChange={(e)=>{setIsAutograde(e.target.checked);props.autoGradeUpdate(e.target.checked);}} />
                    <label className="custom-control-label" htmlFor={"isAutoGradeCheck"+props.id }>Autograde</label>
                </div>
                {isAutograde?<input type="number" min="1" max={(props.options&&props.options.length>0)?props.options.length:"1"} value={props.correctOption} name="correctOption" onChange={props.handleUpdate} className="form-control d-inline p-1" style={{width:"50px",marginLeft:"10px",height:"25px"}}  ></input>:null}
            </div>
        </React.Fragment>
    )
}


export default MCQ;
