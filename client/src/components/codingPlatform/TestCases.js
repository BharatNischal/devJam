import React,{useEffect,useState} from 'react'
import Testcase from './testcase';

export default function TestCases(props) {

  const [inputText,setInputText] = useState("");
  const [outputText,setOutputText] = useState("");
  const [hidden,setHidden] = useState(false);

  function handleAdd() {
    if(props.question&&props.question.testCases){
      props.setQuestion({...props.question,testCases:[...props.question.testCases,{input:inputText,output:outputText,hidden}]});
    }else{
      props.setQuestion({...props.question,testCases:[{input:inputText,output:outputText,hidden}]});
    }

    setInputText("");
    setOutputText("");
    setHidden(false);
  }

  return (
    <React.Fragment>
        <h2 className="topicTitle text-pink mb-2"  ><b>Test Cases</b></h2>

        <div className=" mb-3">
            <div className=" row">
                <div className="col-md-6">
                    <h6>Input</h6>
                    <div className="form-group">
                        <textarea className="form-control" rows="4" value={inputText} onChange={(e)=>setInputText(e.target.value)} ></textarea>
                    </div>
                </div>
                <div className="col-md-6">
                    <h6> Output</h6>
                    <div className="form-group">
                        <textarea className="form-control" rows="4" value={outputText} onChange={(e)=>setOutputText(e.target.value)} ></textarea>
                    </div>
                </div>

            </div>
            <div className="d-flex justify-content-between">
                <div className="custom-control custom-switch " >
                    <input type="checkbox" className="custom-control-input" id="isHidden" checked={hidden} onChange={(e)=>setHidden(e.target.checked)}  />
                    <label className="custom-control-label" htmlFor="isHidden" >Hidden</label>
                </div>
                <div><button className="btn btn-grad float-right" onClick={handleAdd}> Add Test Case </button></div>
            </div>
            <hr className="mt-2" />
        </div>

        {props.question&&props.question.testCases?
          props.question.testCases.map((tc,i)=>(

            <Testcase tc={tc} i={i} question={props.question} setQuestion={props.setQuestion}/>

        )):null}

    </React.Fragment>
  )
}
