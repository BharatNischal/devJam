import React,{useState,useEffect} from 'react';
import AceEditor from "react-ace";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import axios from "axios";


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

function Solution(props) {

    const langCode = {"java":62,"javascript":63,"python":71}
    const [mode,setMode] = useState("javascript");
    const [theme,setTheme] = useState("monokai");
    const [fontsize,setFontsize] = useState(20);
    const [sampleEditorState,setSampleEditorState] = useState(EditorState.createEmpty());
    const [showResults,setShowResults] = useState(false);
    const [results,setResults] = useState([]);


    useEffect(()=>{

        const contentBlock = htmlToDraft(props.question&&props.question.editorial?props.question.editorial:"");
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          setSampleEditorState(editorState);
        }
        if(props.question.editorialLang){
          setMode(props.question.editorialLang);
        }
    },[])

    function handleUpdate(data) {
        props.setQuestion({...props.question,editorial:draftToHtml(convertToRaw(data.getCurrentContent()))});
    }

    function onChange(newValue) {
        props.setQuestion({...props.question,solution:newValue});
    }

    function runTestCases() {
      if(props.question.testCases&&props.question.testCases.length>0){
        setShowResults(false);
        axios.post(`/submitcodingquestion/123`,{testCases:props.question.testCases,lang:langCode[mode],sourceCode:props.question.solution})
          .then(res=>{
            if(res.data.success){
              setResults(res.data.results);
              setShowResults(true);
            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
      }
    }


    return (
        <div>
            <h2 className="topicTitle text-pink mb-2"  ><b>Solution </b></h2>

            <h4 className="mt-3 ml-3" ><b> Editorial </b></h4>
            <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="constraintWrapper"
                editorClassName="editorClassName"
                editorState={sampleEditorState}
                onEditorStateChange={(editorState)=>{handleUpdate(editorState);setSampleEditorState(editorState)}}
                toolbar={{
                    options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'emoji', 'remove', 'history']
                }}
            />

            <h4 className="ml-4 mt-3" ><b> Code </b></h4>
            <div className="mt-2 mx-4 mb-4  editor-wrapper" >

                <div className="editor-header d-flex align-items-center justify-content-between" >

                    <div style={{width:"200px"}} >
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
                    <div>
                    <div className="text-right" style={{fontSize:"12px"}} >
                        <b>Select Language</b>
                    </div>
                    <select className="form-control" value={mode} onChange={(e)=>{setMode(e.target.value);props.setQuestion({...props.question,editorialLang:e.target.value})}} >
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
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                width="100%"
                defaultValue={props.question&&props.question.solution?props.question.solution:""}
                />
                <div className="editor-footer text-right" >
                <button className="btn btn-outline-grad ml-2" onClick={runTestCases} > Run All Tests </button>
                </div>
            </div>

          {showResults?
              <React.Fragment>

                <h4 className="ml-3 mt-4" > <b>Test Results</b> </h4>
                 <div className="ml-4 mr-3 mb-3">

                 <table className="table table-striped" style={{maxWidth:"600px"}}>
                         <thead style={{boxShadow:"0px 4px 8px rgba(0,0,0,0.5)"}}>
                         <tr>
                             <th>Test Case</th>
                             <th> <i className="fa fa-clock"></i> Time(sec) </th>
                             <th> <i className="fa fa-memory" ></i>  Memory(KB) </th>
                             <th> <i className="fa fa-memory" ></i>  Status </th>

                         </tr>
                         </thead>
                         <tbody>

                            {results.map((result,i)=>(
                              <tr className={result.status.id==3?"bg-success":"bg-danger"}>
                                  <td> Test Case #{i+1}</td>
                                  <td> {result.time}</td>
                                  <td> {result.memory}</td>
                                  <td> {result.status.description}</td>
                              </tr>
                            ))}


                         </tbody>
                     </table>
                 </div>
              </React.Fragment>

            :null}



        </div>
    )
}

export default Solution
