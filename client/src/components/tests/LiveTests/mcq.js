import React,{useState,useEffect} from 'react';
import placeholder from "../Placeholder.png";

function MCQ(props) {

    const[option,setOption] = useState("");

    useEffect(()=>{
      if(props.answers[props.curIndex].answer){
        setOption(+props.answers[props.curIndex].answer)
      }
    },[])

    function handleSubmit() {
      console.log("option selected",option);
      const newAnswers = JSON.parse(JSON.stringify(props.answers));
      newAnswers[props.curIndex].answer = String(option);
      props.setAnswers(newAnswers);
    }

    return (
        <div className="mt-3 text-center pl-3">
               <h4 className="text-left"> {props.question.question} </h4>
               <div className="qImg mb-2"  >
                    <span > <img src={props.question.img} style={{maxHeight:"200px"}} className="img-fluid" /></span>
                </div>

                <div className="text-left row my-3">
                    {props.question.options.map((opt,i)=>(
                      <div className="col-md-6 mb-2">
                          <div className=" custom-control custom-radio">
                              <input type="radio" name="opt" value={i+1} id={"a"+i} className="custom-control-input" checked={(i+1)==option} onChange={(e)=>setOption(e.target.value)}/>
                              <label className="custom-control-label" htmlFor={"a"+i}> <b>{opt.title}</b>  </label>
                          </div>
                          <div className="ml-4 mt-1" > <img src={opt.img} style={{maxHeight:"130px"}} className="img-fluid" /></div>
                      </div>
                    ))}
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


export default MCQ;
