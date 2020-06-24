import React, { useState,useEffect } from 'react';
import placeholder from "../Placeholder.png";

function MGrid(props) {

  const [ans,setAns]=useState([]);

  useEffect(()=>{
    if(props.answers[props.curIndex].answer && props.answers[props.curIndex].answer.length==props.question.rows.length){
      setAns(props.answers[props.curIndex].answer.split(""));
    }else{
      setAns(props.question.rows.map(r=>("")));
    }
  },[])


  function handleSubmit() {

    const answer = ans.join("");
    if(answer.length>0 && answer.length!=props.question.rows.length){
      alert("please select option for each row");
    }else{
      const newAnswers = JSON.parse(JSON.stringify(props.answers));
      newAnswers[props.curIndex].answer = answer;
      props.setAnswers(newAnswers);
      setTimeout(()=>{
        props.save();
      },500);
    }
  }


  function ansChangeHandler(e,i,j){
      if(e.target.checked){
          const duplicateAns=[...ans];
          duplicateAns[i]=j;
          setAns(duplicateAns);
      }
  }

    const headers=props.question.options.map((opt,i)=>(
      <div className="headCol pt-2" > {opt.title} </div>
    ));

    const rows=[];
    for(let i=0;i<props.question.rows.length;i++){

        rows.push(<div className="headRow pt-2"> {props.question.rows[i]} </div>)
        for(let j=1;j<=props.question.options.length;j++){
            rows.push(<div className="pt-2"> <div className=" custom-control custom-radio"><input type="radio" name={`opt${i}`} id={`op${i}${j}`} checked={ans[i]?ans[i]==j:false} onChange={(e)=>ansChangeHandler(e,i,j)} className="custom-control-input"/>
            <label className="custom-control-label" htmlFor={`op${i}${j}`}> <b></b>  </label> </div></div>)
        }
    }


    return (
        <div className="mt-3 text-center pl-3">
               <h4 className="text-left"> {props.question.question} </h4>
               <div className="qImg mb-2"  >
                    <span > <img src={props.question.img} style={{maxHeight:"200px"}} className="img-fluid" /></span>
                </div>

                <div className="gridWrapper ">
                    <div className="mGrid m-3" style={{gridTemplateColumns:`170px repeat(${props.question.options.length},120px)`,gridTemplateRows:`80px repeat(${props.question.rows.length},40px)`}} >
                        <div className="headCol"></div>
                        {headers}
                        {rows}
                    </div>

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



export default MGrid;
