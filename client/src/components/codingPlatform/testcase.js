import React,{useState,useEffect} from 'react'

export default function Testcase(props) {

  const [testcase,setTestcase] = useState({input:"",output:"",hidden:false});
  const [editable,setEditable] = useState(false);

  useEffect(()=>{

    setTestcase(props.tc);

  },[])

  function handleDel() {
    const newtestcases = props.question.testCases;
    newtestcases.splice(props.i,1);
    props.setQuestion({...props.question,testCases:newtestcases});
  }

  function handleSave() {
    const newtestcases = props.question.testCases;
    newtestcases[props.i] = {input:testcase.input,output:testcase.output,hidden:testcase.hidden};
    props.setQuestion({...props.question,testCases:newtestcases});
    setEditable(false);
  }

  return (
    <div className=" mb-3">
        <div className="d-flex justify-content-between">
          <h5>  Test Case #{props.i+1} {testcase.hidden?<i className="fa fa-lock text-pink ml-2 "></i>:null}</h5>
          <div>
            <i className="fa fa-pencil ml-2 pointer" aria-hidden="true" onClick={()=>setEditable(true)} ></i>
            <i className="fa fa-trash ml-2 pointer" aria-hidden="true" onClick={handleDel}></i>
          </div>
        </div>
        <div className=" row">
            <div className="col-md-6">
                <h6>Input</h6>
                <div className="form-group">
                    <textarea className="form-control" rows="3" disabled={!editable} value={testcase.input?testcase.input:""} onChange={(e)=>setTestcase({...testcase,input:e.target.value})}></textarea>
                </div>
            </div>
            <div className="col-md-6">
                <h6> Output</h6>
                <div className="form-group">
                    <textarea className="form-control" rows="3" disabled={!editable} value={testcase.output?testcase.output:""} onChange={(e)=>setTestcase({...testcase,output:e.target.value})} ></textarea>
                </div>
            </div>
            <div className="custom-control custom-switch ml-3 " >
                <input type="checkbox" className="custom-control-input" id={props.i+"isHidden"} disabled={!editable} checked={testcase.hidden} onChange={(e)=>setTestcase({...testcase,hidden:e.target.checked})}  />
                <label className="custom-control-label" htmlFor={props.i+"isHidden"} >Hidden</label>
            </div>
            <br/>
            {editable?<div><button className="btn btn-sm btn-grad" onClick={handleSave}> Save</button></div>:null}
        </div>

    </div>
  )
}
