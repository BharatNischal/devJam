import React,{useState} from 'react';
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
    const [showLightBox, setShowLightBox] = useState(false);
    return (
        <React.Fragment>
            {showLightBox?
            <div className="d-backdrop text-white" style={{backgroundColor:"rgba(0,0,0,0.6)"}} > 
            <div className="h1 text-right p-3"> <i className="fa fa-close pointer" onClick={()=>setShowLightBox(false)} ></i> </div>
            <div className=" text-center">
                <img src={props.img} alt="UI Image" style={{maxWidth:"80%",maxHeight:"80vh",borderRadius:"12px",boxShadow:"0px 4px 12px #0000008a"}} />
            </div>
            </div>
            :null}
        <div className="mainGrid ui" style={{gridTemplateRows:"1fr 1fr",gridTemplateColumns:"1fr 1fr 1fr"}} >
                <div className="bg-white" style={{overflow:"auto"}} > 
                    <div className="p-2"  style={{height:"100%" , overflow:"auto",textAlign:"left"}} >
                        <h3><b>Description</b></h3>
                        <hr/>
                        <div className="p-3">
                            <div>
                            <img src={props.img} alt="UI Image" style={{width:"100%",borderRadius:"12px",boxShadow:"0px 4px 12px #0000008a",cursor:"zoom-in"}} onClick={()=>setShowLightBox(true)} />
                            </div>
                        </div>
                        <div className="p-1" dangerouslySetInnerHTML={{__html:props.description}} />
                    </div>
                </div>
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
                            onFocus={props.onFocus}
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
                            onFocus={props.onFocus}
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
            </React.Fragment>
    )
}



export default Layout2
