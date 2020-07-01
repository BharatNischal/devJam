import React,{useState,useEffect} from 'react';
import AceEditor from "react-ace";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


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

    const [mode,setMode] = useState("javascript");
    const [theme,setTheme] = useState("monokai");
    const [fontsize,setFontsize] = useState(20);
    const [sampleEditorState,setSampleEditorState] = useState(EditorState.createEmpty());
    const [solution,setSolution] = useState("");


    useEffect(()=>{

        setSolution(props.soln);
        const contentBlock = htmlToDraft(props.editorial);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          const editorState = EditorState.createWithContent(contentState);
          setSampleEditorState(editorState);
        }

    },[])

    function toHTML() {
      draftToHtml(convertToRaw(sampleEditorState.getCurrentContent()))
    }

    function onChange(newValue) {
        console.log("change", newValue);
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
                onEditorStateChange={(editorState)=>setSampleEditorState(editorState)}
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
                    <select className="form-control" onChange={(e)=>setMode(e.target.value)} >
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
                defaultValue={solution}
                />
                <div className="editor-footer text-right" >
                <button className="btn btn-outline-grad ml-2" > Run All Tests </button>
                </div>
            </div>

           <h4 className="ml-3 mt-4" > <b>Test Results</b> </h4>
            <div className="ml-4 mr-3 mb-3">

            <table className="table table-striped" style={{maxWidth:"600px"}}>
                    <thead style={{boxShadow:"0px 4px 8px rgba(0,0,0,0.5)"}}>
                    <tr>
                        <th>Test Case</th>
                        <th> <i className="fa fa-clock"></i> Time(sec) </th>
                        <th> <i className="fa fa-memory" ></i>  Memory(KB) </th>

                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> Test Case #1</td>
                            <td> 1.22</td>
                            <td> 3204</td>
                        </tr>
                        <tr>
                            <td> Test Case #1</td>
                            <td> 1.22</td>
                            <td> 3204</td>
                        </tr>
                        <tr>
                            <td> Test Case #1</td>
                            <td> 1.22</td>
                            <td> 3204</td>
                        </tr>

                    </tbody>
                </table>
            </div>


        </div>
    )
}

export default Solution
