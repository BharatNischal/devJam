import React,{useState,useEffect} from 'react';
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

function StarterCode(props) {
    const [mode,setMode] = useState("javascript");
    const [theme,setTheme] = useState("monokai");
    const [fontsize,setFontsize] = useState(20);


    useEffect(()=>{
      if(!props.question.starterCode||props.question.starterCode.length==0){
        props.setQuestion({...props.question,starterCode:[{
          lang:"javascript",
          code:`'use strict';


/*
 * Complete the solve function below.
 */
function solve() {
    /*
     * Write your code here.
     */

}

function main() {


  // take inputs here and pass to function solve

  //Call the solve function
  solve();
}
`
        },{
          lang:"java",
          code:`import java.io.*;
import java.math.*;
import java.text.*;
import java.util.*;
import java.util.regex.*;

public class Solution {

    /*
     * Complete the solve function below.
     */
    static void solve() {
        /*
         * Write your code here.
         */

    }

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {

        // take inputs here and pass to function solve

        //Call the solve function
        solve();
    }
}
`
        },{
          lang:"python",
          code:`# Complete the solve function below.
def solve():
    #
    # Write your code here.
    #

if __name__ == '__main__':
    # take inputs here and pass to function solve

    #call the solve function
    solve()`
        }]});
      }
    },[])

    function onChange(newValue) {
        console.log(newValue);
        if(props.question.starterCode){
          let SC = [...props.question.starterCode];
          const index = SC.findIndex(sc=>sc.lang==mode);
          if(index!=-1){
            SC[index] = {code:newValue,lang:mode};
          }else{
            SC.push({code:newValue,lang:mode});
          }
          console.log("sc",SC);
          props.setQuestion({...props.question,starterCode:SC});
        }else{
          props.setQuestion({...props.question,starterCode:[{code:newValue,lang:mode}]});
        }
    }


    return (
        <div>
            <h2 className="topicTitle text-pink mb-2"  ><b>Starter Code </b></h2>
            <p>
              Add <b>Arguments</b> to function and take <b>input</b> for these arguments in <b>main method</b> and pass that to <b>calling function</b>. Do this for <b>each language</b> and don't forget to click Save Button on top.
            </p>
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

                    <div style={{width:"200px"}}>
                    <div className="text-right" style={{fontSize:"12px"}} >
                        <b>Select Language</b>
                    </div>
                    <select className="form-control" value={mode} onChange={(e)=>setMode(e.target.value)} >
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
                value={props.question.starterCode&&props.question.starterCode.findIndex(sc=>sc.lang==mode)!=-1?props.question.starterCode[props.question.starterCode.findIndex(sc=>sc.lang==mode)].code:""}
                width="100%"
                />
                <div className="editor-footer text-right" >
                </div>
            </div>
        </div>
    )
}


export default StarterCode;
