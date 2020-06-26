import React,{useState,useEffect} from 'react';
import MCQ from './mcq';
import MGrid from './mGrid';


export default function Question(props) {

  const [feedback,setFeedback] = useState("");
  const [marks,setMarks] = useState(0);
  const [showFeedback,setShowFeedback] = useState(true);

  useEffect(()=>{
    setMarks(props.answer.marks);
    setFeedback(props.answer.feedback);
  },[props.answer.feedback,props.answer.index])



  return (
    <React.Fragment>
        <div className="col-12 my-4">
        <div style={{border:"1px solid #c1c1c1",backgroundColor:"#f9f9f9", borderRadius:"18px",padding:"20px"}} >
            <div className="row p-0 " style={{alignItems:"center"}} >
                <div className="col-md-8 col-lg-9">
                    <h5 className={props.answer.marks==1&&props.question.autoGrade?"text-success":(props.answer.marks==0&&props.question.autoGrade?"text-danger":"")} ><b> <i className={props.answer.marks==1&&props.question.autoGrade?"fa fa-check mr-1":(props.answer.marks==0&&props.question.autoGrade?"fa fa-close":"")}></i> {props.question.question} </b></h5>
                </div>
                <div className="col-md-4 col-lg-3 text-right">
                     <input type="number" value={marks} onChange={(e)=>{setMarks(e.target.value);props.handleUpdate(props.index,e.target.value)}} className="comment-inp text-right" style={{width:"70px"}} min="0" max="1"/>
                     <span className="h4" >{} / 1</span>
                </div>

            </div>
            <hr/>
            <div className="qImg mb-3 text-center"  >
                <img src={props.question.img} style={{maxHeight:"200px"}} className="img-fluid" />
            </div>
            {props.question.type=="mcq"?<MCQ options={props.question.options} autoGrade={props.question.autoGrade} correctOption={props.question.correctOption} answer={props.answer.answer}/>
            :(props.question.type=="mcqGrid"?<MGrid options={props.question.options} answer={props.answer.answer} rows={props.question.rows}/>
            :<div>
                <h4>Answer: </h4>
                <p>{props.answer.answer}</p>
            </div>)}
            {(props.answer.feedback && showFeedback)?
                <div className="mt-3 d-flex justify-content-between">
                    <div>
                        <h4>Feedback</h4>
                        <p>{props.answer.feedback}</p>
                    </div>
                    <div>
                        <i className="fa fa-pencil pointer hover-pink" onClick={()=>setShowFeedback(false)} ></i><br/>
                        <i className="fa fa-trash pointer hover-pink" onClick={()=>{setFeedback(""); props.handleUpdate(props.index,-1,"");}} ></i>
                    </div>
                </div>
            :
                <div className="mt-3">
                    <form onSubmit={(e)=>{e.preventDefault();setShowFeedback(true);props.handleUpdate(props.index,-1,feedback)}}><input className="comment-inp w-100" value={feedback} onChange={(e)=>setFeedback(e.target.value)} placeholder="Add Individual Feedback " ></input></form>
                </div>
            }

        </div>
        </div>
    </React.Fragment>
  )
}
