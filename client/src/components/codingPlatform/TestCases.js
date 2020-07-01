import React,{useEffect,useState} from 'react'

export default function TestCases(props) {

  const [testCases,setTestCases] = useState([]);
  const [inputText,setInputText] = useState("");
  const [outputText,setOutputText] = useState("");
  const [hidden,setHidden] = useState(false);

  useEffect(()=>{

    setTestCases(props.cases);

  },[])

  function handleAdd() {
    setTestCases([...testCases,{input:inputText,output:outputText,hidden}]);
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
                    <input type="checkbox" className="custom-control-input" id="isHidden" />
                    <label className="custom-control-label" htmlFor="isHidden" checked={hidden} onChange={(e)=>setHidden(e.target.checked)}>Hidden</label>
                </div>
                <div><button className="btn btn-grad float-right" onClick={handleAdd}> Add Test Case </button></div>
            </div>
            <hr className="mt-2" />
        </div>

        {testCases.map((tc,i)=>(

          <div className=" mb-3" key={i}>
              <h5>  Test Case #{i+1} {tc.hidden?<i className="fa fa-lock text-pink ml-2 "></i>:null}</h5>
              <div className=" row">
                  <div className="col-md-6">
                      <h6>Input</h6>
                      <div className="form-group">
                          <textarea className="form-control" rows="3" disabled={true} >{tc.input?tc.input:""}</textarea>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <h6> Output</h6>
                      <div className="form-group">
                          <textarea className="form-control" rows="3" disabled={true}>{tc.output?tc.output:""}</textarea>
                      </div>
                  </div>

              </div>

          </div>

        ))}

    </React.Fragment>
  )
}
