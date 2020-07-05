import React,{useState} from 'react'
import AceEditor from "react-ace";
import axios from "axios";
import {withRouter} from "react-router-dom"

// Editor languages
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/python";

// Editor Themes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";

// Tools
import "ace-builds/src-noconflict/ext-language_tools";

function Problem(props) {
    const langCode = {"java":62,"javascript":63,"python":71}
    const [mode,setMode] = useState("javascript");
    const [theme,setTheme] = useState("monokai");
    const [fontsize,setFontsize] = useState(20);

    const [showResults,setShowResults] = useState(false);
    const [showCustomResult,setShowCustomResult] = useState(false);
    const [customResult,setCustomResult] = useState({stderr:"",stdout:""});

    const [results,setResults] = useState([]);
    const [activeResult,setActiveResult] = useState(0);
    const [tests,setTests] = useState([]);
    const [points,setPoints] = useState(0);
    const [loading,setLoading] = useState(false);

    const [customInput,setCustomeInput] = useState({add:false,value:""});
    function onChange(newValue) {
          const index = props.starterCode.findIndex(sc=>sc.lang==mode);
          if(index!=-1){
            const newCode = [...props.starterCode];
            newCode[index].code = newValue;
            props.setStarterCode(newCode);
          }else{
            props.setStarterCode([...props.starterCode,{code:newValue,lang:mode}]);
          }

    }

    function handleEvaluate(responses,type) {
      const sourceCode = props.starterCode[props.starterCode.findIndex(sc=>sc.lang==mode)].code;
      axios.post(`/coding/question/${props.match.params.id}/evaluation`,{lang:langCode[mode],sourceCode,responses,type})
        .then(res=>{
          if(res.data.success){
            console.log(res.data.results);
            setResults(res.data.results);
            if(type=="run"){
              setTests(props.testCases.filter(tc=>!tc.hidden));
            }else{
              setTests(props.testCases);
              const correct = res.data.results.filter(r=>r.status.id==3).length;
              setPoints(((correct/props.testCases.length)*props.question.points).toFixed(2));
              props.setMarksScored(((correct/props.testCases.length)*props.question.points).toFixed(2))
              props.setMarksAlert(true);
              setTimeout(()=>{props.setMarksAlert(false)},3000);
            }
            setShowResults(true);
          }else{
            console.log(res.data.msg);
          }
          setLoading(false);
        })
        .catch(err=>{
          console.log(err.message);
        })
    }

    function handleRun(type) {
        setShowResults(false);
        setLoading(true);
        setShowCustomResult(false);
        const sourceCode = props.starterCode[props.starterCode.findIndex(sc=>sc.lang==mode)].code;
        axios.post(`/coding/question/${props.match.params.id}/submission`,{lang:langCode[mode],sourceCode,type})
          .then(res=>{
            if(res.data.success){
              console.log(res.data.responses);
              setTimeout(()=>handleEvaluate(res.data.responses,type),5000);
            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
    }

    function handleCustomInput() {
      setLoading(true);
      setShowCustomResult(false);
      const sourceCode = props.starterCode[props.starterCode.findIndex(sc=>sc.lang==mode)].code;
      axios.post(`/submit/custom/testcase`,{lang:langCode[mode],sourceCode,input:customInput.value})
        .then(res=>{
          if(res.data.success){
            setCustomResult(res.data.result);
            setShowCustomResult(true);
          }else{
            console.log(res.data.msg);
          }
          setLoading(false);
        })
        .catch(err=>{
          console.log(err.message);
        })
    }

    function secondsToHms(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);
      return `${h}:${m}:${s}`;
  }

  function onFocus() {
    if(!props.started){
      props.startTimer();
      props.setStarted(true);
    }
  }

    return (
        <React.Fragment>
            <section className="mb-4 problem-section" >
                <h3> <b> Description </b> </h3>
                <hr/>
                <div dangerouslySetInnerHTML={{__html:props.question.description}} className="pl-2" ></div>
            </section>
            <section className="mb-4 problem-section" >
                <h3> <b> Input / Output</b> </h3>
                <hr/>
                <div className="row">
                    <div className="col-md-6 mb-2">
                    <h5 className="mb-3" ><b>Input Format</b></h5>
                    <div dangerouslySetInnerHTML={{__html:props.question.inputFormat}} className="pl-2" ></div>
                    </div>
                    <div className="col-md-6">
                    <h5 className="mb-3" ><b>Output Format</b></h5>
                    <div dangerouslySetInnerHTML={{__html:props.question.outputFormat}} className="pl-2" ></div>
                    </div>
                </div>

            </section>
            <section className="mb-4 problem-section">
                <h3><b> Sample Cases </b></h3>
                <hr/>
                <div className="pl-2" dangerouslySetInnerHTML={{__html:props.question.sample}} ></div>
            </section>
            <section className="mb-4 problem-section">
                <h3><b> Constraints </b></h3>
                <hr/>
                <div className="pl-2" dangerouslySetInnerHTML={{__html:props.question.constraints}} ></div>
                <div className="pl-2 my-2"> <b> <i className="fas fa-memory"></i>  Memory Limit (KB):  </b> 760 </div>
                <div className="pl-2 my-2" > <b>  <i className="fa fa-clock"></i>  Time Limit (sec): </b> 2 </div>
            </section>
            <section className="mb-4 mt-3" >
                <h3> <b>Code</b> </h3><hr/>
                <p> <b> For the <b>timed tests</b> when you <b>click the editor</b> timer will start and you can make submissions before time is over.  </b> </p>
                <div className="mt-2 mx-4   editor-wrapper" >

                    <div className="editor-header d-flex align-items-center justify-content-between" >

                        <div style={{width:"150px"}} >
                        <div className="text-left" style={{fontSize:"12px"}} >
                            <b>Select Theme</b>
                            <select onChange={(e)=>setTheme(e.target.value)} className="form-control" >
                            <option value="monokai">monokai</option>
                            <option value="tomorrow">tomorrow</option>
                            <option value="github">github</option>
                            <option value="solarized_light">solarized light</option>
                            <option value="solarized_dark">solarized dark</option>
                            <option value="twilight">twilight</option>
                            <option value="xcode">xcode</option>
                            </select>
                        </div>

                        </div>
                        {props.time?<h4 className="text-center text-pink p-2 " style={{backgroundColor:"#f1f1f1" ,borderRadius:"12px", border:"1px solid #bbb" }}  >Time Left
                            <b>{props.started?(props.timer<0?secondsToHms(0):secondsToHms(props.timer)):secondsToHms(props.time*60)}</b>
                        </h4>:null}
                        <div style={{width:"150px"}}>
                        <div className="text-right" style={{fontSize:"12px"}} >
                            <b>Select Language</b>
                        </div>
                        <select className="form-control" value={mode} onChange={(e)=>{setMode(e.target.value);}} >
                            <option value="java">Java</option>
                            <option value="python">Python</option>
                            <option value="javascript">Javascript</option>
                        </select>
                        </div>

                    </div>
                    <AceEditor
                    mode={mode}
                    theme={theme}
                    onChange={onChange}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                    }}
                    placeholder="Write your code here"
                    fontSize={+fontsize}
                    onChange={onChange}
                    onFocus={onFocus}
                    showPrintMargin={false}
                    showGutter={true}
                    highlightActiveLine={true}
                    width="100%"
                    value={props.starterCode&&props.starterCode.findIndex(sc=>sc.lang==mode)!=-1?props.starterCode[props.starterCode.findIndex(sc=>sc.lang==mode)].code:""}
                    />
                  {props.allowed?<div className="editor-footer text-right" >
                        <button className="btn btn-outline-grad ml-2" onClick={()=>handleRun("run")}> Run  </button>
                        <button className="btn btn-outline-grad ml-2" onClick={()=>handleRun("submit")}> Submit </button>
                    </div>:<p className="text-right mr-2"> <b> Cannot Submit anymore, Your Time Finished</b></p>}
                </div>
                <div className="pl-5 mt-3 d-flex">
                    <div className="custom-control custom-checkbox " >
                        <input type="checkbox" className="custom-control-input" id="customCheck1"  checked={customInput.add} onChange={(e)=>setCustomeInput({...customInput,add:e.target.checked})} />
                        <label className="custom-control-label" htmlFor="customCheck1">Add Custom Input</label>
                    </div>
                    {customInput.add?
                        <div className="ml-3 ">
                            <textarea className="form-control" rows="4" value={customInput.value} onChange={(e)=>setCustomeInput({...customInput,value:e.target.value})} ></textarea>
                            <button className="btn btn-outline-grad" onClick={handleCustomInput}>Run Custom Input</button>
                        </div>
                    :null}
                </div>
            </section>
            {loading?<img src="https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif" alt="centered image" style={{width:"400px",textAlign:"center"}}/>:null}
            {showResults?
            <React.Fragment>

                <h4 className="ml-3 mt-4" > <b>Test Results</b> </h4>
                <div className="ml-4 mr-4 mb-3 row test-results-tabs" style={{flexGrow:"1"}}  >
                    <div className="col-lg-3 col-md-4 col-5 p-0" style={{maxHeight:"400px",overflow:"auto",backgroundColor:"rgb(235, 235, 235)"}} >
                        {results.map((result,i)=>(
                            <div className={result.status.id==3?(activeResult==i?"p-3 test-tab text-success active":"p-3 test-tab text-success"):(activeResult==i?"p-3 test-tab text-danger active":"p-3 test-tab text-danger")}
                                onClick={()=>setActiveResult(i)}
                            >
                            <b> Test Case #{i+1}  {result.status.id==3?(<i className="fa fa-check"></i>):(<i className="fa fa-close"></i>)} </b>
                            </div>
                        ))}

                    </div>
                    <div className="col-lg-9 col-md-8 col-7 p-0 text-left" style={{maxHeight:"400px",overflow:"auto"}} >
                        <div className="p-3" >
                            <h4><b> Test Case #{activeResult+1} </b></h4>
                            <div className="d-flex  my-2" style={{ flexWrap:"wrap" }} >
                            <div className="p-2 mr-3 mb-2 text-center result-pill" >
                                <b><i className="fa fa-clock"></i> Time(sec)  </b><br/>
                                {results[activeResult].time}
                            </div>
                            <div className="p-2 mr-3 mb-2 text-center result-pill" >
                                <b><i className="fa fa-memory" ></i>  Memory(KB)  </b><br/>
                                {results[activeResult].memory}
                            </div>
                            <div className="p-2 mr-3 mb-2 text-center result-pill" >
                                <b>Status</b><br/>
                                {results[activeResult].status.description}
                            </div>
                            </div>
                            {!props.testCases[activeResult].hidden?
                            <React.Fragment>
                                {results[activeResult].stderr?
                                <div className="mb-2 text-danger">
                                    <b>Error </b><br/>
                                    <p className="resulttxt " > {results[activeResult].stderr} </p>
                                </div>
                                :
                                <React.Fragment>
                                <div className="mb-2">
                                    <b>Input</b><br/>
                                    <p className="resulttxt" > {tests[activeResult].input } </p>
                                </div>
                                <div className="mb-2">
                                    <b>Expected Output </b><br/>
                                    <p className="resulttxt" > {tests[activeResult].output } </p>
                                </div>
                                <div className="mb-2">
                                    <b>Your Output </b><br/>
                                    <p className="resulttxt" > {results[activeResult].stdout} </p>
                                </div>

                                </React.Fragment>
                                }
                            </React.Fragment>
                            :
                            <div className="pt-4 ">
                                <h1 className="text-center text-pink"> <i className="fa fa-lock"></i> </h1>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
            :null}
            {showCustomResult?
              <React.Fragment>
                  {customResult.stderr?
                  <div className="mb-2 text-danger">
                      <b>Error </b><br/>
                      <p className="resulttxt " > {customResult.stderr} </p>
                  </div>
                  :
                  <React.Fragment>
                  <div className="mb-2">
                      <b>Input</b><br/>
                      <p className="resulttxt" > {customInput.value } </p>
                  </div>
                  <div className="mb-2">
                      <b>Output </b><br/>
                      <p className="resulttxt" > {customResult.stdout} </p>
                  </div>

                  </React.Fragment>
                  }
              </React.Fragment>:null}
        </React.Fragment>
    )
}


export default withRouter(Problem)
