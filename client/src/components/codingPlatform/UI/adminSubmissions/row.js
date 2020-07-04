import React, { useState } from 'react';
import AceEditor from "react-ace";

// Editor languages
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/snippets/css";

import "ace-builds/src-noconflict/theme-monokai";

function Row(props) {
    const [viewCode,setViewCode] = useState(false);

    const lorem="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus exercitationem, quibusdam officiis facere deserunt dignissimos quidem enim, praesentium sint dicta qui labore distinctio totam minima non reprehenderit aperiam veritatis a!";
    return (
        <React.Fragment>
            <div className="row py-3" style={{borderBottom:"1px solid #c1c1c1"}} >
                <div className="col-1"> {props.index} </div>
                <div className="col-4" > {props.name} </div>
                <div className="col-4"> {props.points} </div>
    <div className="col-3 pointer hover-pink" onClick={()=>setViewCode(!viewCode)} > <b> {viewCode?"Hide":"View"} Code</b>  </div>

            </div>
            {viewCode?
            <div className="submissionRowContent" >
                <div className="row">
                    <div className="col-md-4 mb-2">
                        <h5> <b>HTML</b> </h5>
                        <AceEditor
                        mode={"html"}
                        theme={"monokai"}
                        name="htmlSubDiv"
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
                        width="100%"
                        height="300px"
                        style={{borderRadius:"14px",boxShadow:"0px 4px 12px #0000008a"}}
                        defaultValue={props.html}
                        readOnly

                        />

                    </div>
                    <div className="col-md-4 mb-2">
                    <h5> <b>CSS</b> </h5>
                        <AceEditor
                        mode={"css"}
                        theme={"monokai"}
                        name="htmlSubDiv"
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
                        width="100%"
                        height="300px"
                        style={{borderRadius:"14px",boxShadow:"0px 4px 12px #0000008a"}}
                        defaultValue={props.css}
                        readOnly

                        />

                    </div>
                    <div className="col-md-4 mb-2">
                    <h5> <b>javascript</b> </h5>
                        {props.js?
                        <AceEditor
                        mode={"javascript"}
                        theme={"monokai"}
                        name="htmlSubDiv"
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
                        width="100%"
                        height="300px"
                        style={{borderRadius:"14px",boxShadow:"0px 4px 12px #0000008a"}}
                        defaultValue={props.js}
                        readOnly

                        />
                        :null}
                    </div>
                </div>
                    
                </div>
                :null}

        </React.Fragment>

    )
}

export default Row
