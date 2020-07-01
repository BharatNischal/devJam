import React from 'react';
import MCQ from './mcq';
import MGrid from './mGrid';


export default function Question(props) {

console.log(props.answer);

  return (
    <React.Fragment>
        <div className="col-12 my-4">
        <div style={{border:"1px solid #c1c1c1",backgroundColor:"#f9f9f9", borderRadius:"18px",padding:"20px"}} >
            <div className="row p-0 " style={{alignItems:"center"}} >
                <div className="col-md-8 col-lg-9">
                    <h5><b> {props.question.question} </b></h5>
                </div>
                <div className="col-md-4 col-lg-3 text-right">
                     {/*<span className="h4" >{props.answer.marks} / 1</span>*/}
                </div>

            </div>
            <hr/>
            <div className="qImg mb-3 text-center"  >
                <img src={props.question.img} style={{maxHeight:"200px"}} className="img-fluid" />
            </div>
            {props.question.type=="mcq"?<MCQ options={props.question.options} correctOption={props.question.correctOption} answer={props.answer.answer}/>
            :(props.question.type=="mcqGrid"?<MGrid options={props.question.options} answer={props.answer.answer} rows={props.question.rows}/>
            :<div>
                <h4>Answer: </h4>
                <p>{props.answer.answer}</p>
            </div>)}

            <div className="mt-3">
                <h4>Feedback</h4>
                <p>{props.answer.feedback?props.answer.feedback:"No Feedback"}</p>
            </div>

        </div>
        </div>
    </React.Fragment>
  )
}
