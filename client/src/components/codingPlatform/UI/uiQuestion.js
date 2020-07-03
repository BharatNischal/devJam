import React, { useState, useRef, useEffect } from 'react';
import "./ui.css";
import AceEditor from "react-ace";

// Editor languages
import "ace-builds/src-noconflict/snippets/html";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/snippets/css";
import "ace-builds/src-noconflict/mode-css";


import "ace-builds/src-noconflict/theme-monokai";

function UIQuestion(props) {
    const [html, setHtml] = useState("<!-- Write Body Of HTML page Only -->");
    const [css, setCss] = useState("");

    const [activeTab,setActiveTab] = useState("description");
    const [layout, setLayout] = useState(3);
    const [showSettings, setShowSettings] = useState(false);

    const iframe = useRef(null);

    useEffect(()=>{

        if(iframe.current.contentDocument){
            console.log(iframe);
        const document = iframe.current.contentDocument;
        const documentContents = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}

          </body>
          </html>
        `;

        document.open();
        document.write(documentContents);
        document.close();
        }
    },[html,css])

    return (
        <React.Fragment>
        <div className="topBar text-white">
            <div>
                <span className="h2 ml-2 pointer"> <i className="fa fa-arrow-left"></i> </span>
                <h2 className="d-inline" >
                    <b> Question Title </b>
                </h2>
            </div>
            <div className="pointer h2 ">
                <i className="fas fa-cog " onClick={()=>setShowSettings(true)}></i>
            </div>
        </div>
        {showSettings?
        <React.Fragment>
            <div className="d-backdrop" onClick={()=>setShowSettings(false)}></div>
            <div className="dropdown " style={{width:"200px",height:"250px"}}>
            <h3 className="my-3"> <b>Set Layout</b> </h3>
            <div className="mt-2"><button className="btn-outline-grad btn ml-2" onClick={()=>{setLayout(1);setCss(css+" ")}} > Layout 1 </button></div>
            <div className="mt-2"><button className="btn-outline-grad btn ml-2" onClick={()=>{setLayout(2);setCss(css+" ")}} > Layout 2 </button></div>
            <div className="mt-2"><button className="btn-outline-grad btn ml-2" onClick={()=>{setLayout(3);setCss(css+" ")}} > Layout 3 </button></div>

            </div>
        </React.Fragment>
        :null}

        <div className="bgwhiteoverlay" ></div>

        {layout==1?
            <div className="mainGrid ui" style={{gridTemplateRows:"1fr 1fr 1fr",gridTemplateColumns:"1fr 1fr 1fr"}} >
                <div className=" bg-white" style={{gridRow:"1/3"}} > <h3>Description</h3> </div>
                <div className=" bg-success uiSectionWrapper " style={{gridRow:"1/3"}} >
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
                            onChange={(newValue)=>setHtml(newValue)}
                            defaultValue={html}


                        />
                    </div>
                </div>
                <div className=" bg-primary uiSectionWrapper " style={{gridColumn:"1/3"}} >
                    <h3 className="uisectionHeading text-left pl-2"> <b> CSS</b> </h3>
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
                            onChange={(newValue)=>setCss(newValue)}
                            defaultValue={css}


                        />
                    </div>
                </div>
                <div className=" bg-white" style={{gridColumn:"3/4",gridRow:"1/4"}} >
                    <iframe style={{width:"100%",height:"100%"}} ref={iframe} >
                    </iframe>
                </div>
            </div>
        :null}

        {layout==2?
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
                            onChange={(newValue)=>setHtml(newValue)}
                            defaultValue={html}


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
                            onChange={(newValue)=>setCss(newValue)}
                            defaultValue={css}


                        />
                    </div>
                </div>
                <div className=" bg-white" style={{gridColumn:"1/4"}} >
                    <iframe style={{width:"100%",height:"100%"}} ref={iframe} >
                    </iframe>
                </div>
            </div>
        :null}

        {layout==3?
            <div className="mainGrid ui" style={{gridTemplateRows:"1fr",gridTemplateColumns:"1fr 1fr"}} >
                <div className="tabLayoutMain" style={{position:"relative"}}>
                    <div className=" tabs d-flex " style={{height:"50px",position:"absolute",top:"0",width:"100%",borderBottom:"1px solid #e1e1e1" }}>
                        <div className={activeTab=="description"?" active tab px-3 py-2":"tab px-3 py-2 " } onClick={()=>setActiveTab("description")} > <b>Description</b> </div>
                        <div className={activeTab=="HTML"?" active tab px-3 py-2":"tab px-3 py-2" } onClick={()=>setActiveTab("HTML")} > <b>HTML</b> </div>
                        <div className={activeTab=="CSS"?" active tab px-3 py-2":"tab px-3 py-2" } onClick={()=>setActiveTab("CSS")} > <b>CSS</b> </div>
                    </div>
                    <div className="uitabCont  text-left " style={{height:"100%",paddingTop:"50px"}} >
                        {activeTab=="description"?
                            <div className="p-2">
                                <h2>Description</h2>
                            </div>
                        :null}
                        {activeTab=="HTML"?
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
                                height="100%"

                                onChange={(newValue)=>setHtml(newValue)}
                                defaultValue={html}


                            />
                        :null}
                        {activeTab=="CSS"?
                            <AceEditor
                                mode={"css"}
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
                                height="100%"

                                onChange={(newValue)=>setCss(newValue)}
                                defaultValue={css}


                            />
                        :null}
                    </div>
                </div>

                <div className=" bg-white"  >
                    <iframe style={{width:"100%",height:"100%"}} ref={iframe} >
                    </iframe>
                </div>
            </div>
        :null}
        </React.Fragment>
    )
}


export default UIQuestion
