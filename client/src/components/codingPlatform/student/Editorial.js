import React from 'react';
import AceEditor from "react-ace";

// Editor languages
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/snippets/javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/snippets/python";

import "ace-builds/src-noconflict/theme-monokai";

function Editorial(props) {
    return (
        <div className="p-3" >
            <h3><b> Editorial </b></h3><hr/>
            <div className="px-3 mb-3" dangerouslySetInnerHTML={{__html:props.editorial.editorial}} ></div>
            <div className="my-3 px-4 ">
                <AceEditor
                    mode={props.editorial.editorialLang}
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
                    defaultValue={props.editorial.solution}
                    
                    
                />
            </div>

        </div>
        
    )
}


export default Editorial

