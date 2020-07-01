import React from 'react';
import Placeholder from "../../Placeholder.png";

function MCQ(props) {

    console.log("ans",props.correctOption);

    return (
        <div className="row mt-3 text-left" style={{position:"relative"}}>

            {props.options.map((opt,i)=>(
              <div className={props.autoGrade?
                  ((props.correctOption==i+1)?
                    "col-md-6 mb-2 p-3 correct"
                    :((props.correctOption!=i+1 && +props.answer>0 && +props.answer==i+1)?
                        "col-md-6 mb-2 p-3 wrong"
                        :"col-md-6 mb-2 p-3"))
                :"col-md-6 mb-2 p-3"}>
                  <div className=" custom-control custom-radio" >
                      <input type="radio"  id="01" className="custom-control-input" checked={+props.answer==i+1} disabled />
                      <label className="custom-control-label" htmlFor="o1"> {opt.title}  </label>
                  </div>
                  <div className="ml-4 mt-1" >
                         <img src={opt.img} style={{maxHeight:"100px"}} className="img-fluid" />
                  </div>
                  {props.autoGrade?
                      ((props.correctOption==i+1)?
                        <span className="text-success h4" style={{position:"absolute",top:"8px",right:"8px"}}> <i className="fa fa-check"></i> </span>
                        :((props.correctOption!=i+1 && +props.answer>0 && +props.answer==i+1)?
                            <span className="text-danger h4" style={{position:"absolute",top:"8px",right:"8px"}}> <i className="fa fa-close"></i> </span>
                            :null))
                    :null}
                </div>
            ))}

        </div>
    )
}



export default MCQ
