import React, { useState } from 'react';
import AceEditor from "react-ace";

// Editor languages
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/python";

import "ace-builds/src-noconflict/theme-monokai";

function Row(props) {
    const [viewCode,setViewCode] = useState(false);

    const lorem="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus exercitationem, quibusdam officiis facere deserunt dignissimos quidem enim, praesentium sint dicta qui labore distinctio totam minima non reprehenderit aperiam veritatis a!";
    return (
        <React.Fragment>
            <div className="row py-3" style={{borderBottom:"1px solid #c1c1c1"}} >
                    <div className="col-1"> {props.index} </div>
                    <div className="col-3"> <b> {props.name}</b> </div>
                    <div className="col-3"> {props.language}</div>
                    <div className="col-3"> {props.points?props.points:0} </div>
                  
                    <div className="col-2 pointer hover-pink" onClick={()=>setViewCode(!viewCode)} > <b> {viewCode?"Hide":"View"} Code</b>  </div>

            </div>
            {viewCode?
            <div className="submissionRowContent" >
                    <AceEditor
                        mode={props.language||"javascript"}
                        theme={"monokai"}
                        name="UNIQUE_ID_OF_DIV"
                        editorProps={{ $blockScrolling: true }}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                        }}
                        placeholder="Code Will be here"
                        fontSize={18}
                        showPrintMargin={false}
                        showGutter={true}
                        highlightActiveLine={true}
                        width="70%"
                        height="460px"
                        style={{borderRadius:"14px",boxShadow:"0px 4px 12px #0000008a"}}
                        defaultValue={props.code}
                        readOnly

                    />
                </div>
                :null}

        </React.Fragment>

    )
}

export default Row
