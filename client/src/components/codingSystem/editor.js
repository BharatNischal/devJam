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

export default function Editor(props) {

  const [mode,setMode] = useState("javascript");
  const [theme,setTheme] = useState("monokai");
  const [fontsize,setFontsize] = useState(14);


  function onChange(newValue) {
    console.log("change", newValue);
  }

  return (
    <div>
        <div>
          <select onChange={(e)=>setMode(e.target.value)}>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">Javascript</option>
          </select>
          <select onChange={(e)=>setFontsize(e.target.value)}>
            <option value={14}>14</option>
            <option value="18">18</option>
            <option value="18">20</option>
            <option value="24">24</option>
            <option value="32">32</option>
          </select>
          <select onChange={(e)=>setTheme(e.target.value)}>
            <option value="monokai">monokai</option>
            <option value="tomorrow">tomorrow</option>
            <option value="github">github</option>
            <option value="solarized_light">solarized light</option>
            <option value="solarized_dark">solarized dark</option>
            <option value="twilight">twilight</option>
            <option value="xcode">xcode</option>
          </select>
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
  </div>
  )
}
