import React,{useState,useEffect} from 'react';
import placeholder from "../Placeholder.png";

function Paragraph(props) {

  const [para,setPara] = useState("");

  useEffect(()=>{
    if(props.answers[props.curIndex].answer){
      setPara(props.answers[props.curIndex].answer)
    }
  },[])

  function handleSubmit() {
    console.log("paragraph",para);
    const newAnswers = JSON.parse(JSON.stringify(props.answers));
    newAnswers[props.curIndex].answer = para;
    props.setAnswers(newAnswers);
    setTimeout(()=>{
      props.save();
    },500);
  }

    return (
        <div className="mt-3 text-center pl-3">
               <h4 className="text-left"> {props.question.question} </h4>
               <div className="qImg mb-2"  >
                    <span > <img src={props.question.img} style={{maxHeight:"200px"}} className="img-fluid" /></span>
               </div>
               <div className="text-left row my-3">
                   <textarea className="form-control" placeholder="Enter Paragraph answer  " rows="6" value={para} onChange={(e)=>setPara(e.target.value)}>

                   </textarea>
               </div>
               <div className="text-center">
                   <span className={props.curIndex==0?"mr-4 pointer hover-pink cursor-disable":"mr-4 pointer hover-pink"} onClick={()=>{props.curIndex==0?console.log("No prev item"):props.setCurIndex(props.curIndex-1)}}>
                       <i className="fa fa-less-than"></i>
                   </span>
                   <span className="mr-4"> <button className="btn bg-grad text-white" onClick={handleSubmit}> Submit </button> </span>
                   <span className={props.curIndex==props.totalQues-1?"mr-2 pointer hover-pink cursor-disable":"mr-2 pointer hover-pink"} onClick={()=>{props.curIndex==props.totalQues-1?console.log("No prev item"):props.setCurIndex(props.curIndex+1)}}>
                       <i className="fa fa-greater-than"></i>
                   </span>

               </div>
            </div>
    )
}



export default Paragraph;
