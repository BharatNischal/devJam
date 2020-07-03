import React from 'react';
import AceEditor from "react-ace";

// Editor languages
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/mode-css";


import "ace-builds/src-noconflict/theme-monokai";

function Layout2(props) {
    return (
        <div className="mainGrid ui" style={{gridTemplateRows:"1fr 1fr",gridTemplateColumns:"1fr 1fr 1fr"}} >
                <div className="bg-white" > <h3>Description</h3> </div>
                <div className=" bg-success uiSectionWrapper " >
                    <h3 className="uisectionHeading"> <b> HTML </b> </h3>
                    <div style={{paddingTop:"35px",height:"100%"}}>

                        <AceEditor
                            mode={"html"}
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
                            width="100%"

                            style={{height:"100%"}}
                            onChange={(newValue)=>props.setHtml(newValue)}
                            defaultValue={props.html}


                        />
                    </div>
                </div>
                <div className=" bg-primary uiSectionWrapper">
                    <h3 className="uisectionHeading"> <b> CSS</b> </h3>
                    <div style={{paddingTop:"35px",height:"100%"}}>

                        <AceEditor
                            mode={"css"}
                            theme={"monokai"}
                            name="cssEditor"
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

                            style={{height:"100%"}}
                            onChange={(newValue)=>props.setCss(newValue)}
                            defaultValue={props.css}


                        />
                    </div>
                </div>
                <div className=" bg-white" style={{gridColumn:"1/4"}} >
                    <iframe style={{width:"100%",height:"100%"}} ref={props.iframe} >
                    </iframe>
                </div>
            </div>
    )
}



export default Layout2

