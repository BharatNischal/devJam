import React,{useState} from 'react';
import AceEditor from "react-ace";

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
import "./editor.css";

export default function Editor(props) {

  const [mode,setMode] = useState("javascript");
  const [theme,setTheme] = useState("monokai");
  const [fontsize,setFontsize] = useState(20);


  function onChange(newValue) {
    console.log("change", newValue);
  }

  return (
 
       
        <div className="m-3 editor-wrapper" >

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
        />
        <div className="editor-footer text-right" >
          <button className="btn btn-outline-grad ml-2" > Run Tests </button>
          <button className="btn btn-grad ml-2" > Submit </button>
        </div>
      </div>
  
  )
}
