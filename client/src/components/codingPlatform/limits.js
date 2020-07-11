import React, { useState,useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


function Limits(props) {

    const [sampleEditorState,setSampleEditorState] = useState(EditorState.createEmpty());

    useEffect(()=>{

      const constraintBlock = htmlToDraft(props.question&&props.question.constraints?props.question.constraints:"");
      if (constraintBlock) {
        const contentState = ContentState.createFromBlockArray(constraintBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setSampleEditorState(editorState);
      }

    },[])


    function handleUpdate(data) {
        props.setQuestion({...props.question,constraints:draftToHtml(convertToRaw(data.getCurrentContent()))});
    }

    return (
        <React.Fragment>
            <h2 className="topicTitle text-pink mb-2"  ><b>Constraints</b></h2>
            <Editor
                toolbarClassName="toolbarClassName"
                wrapperClassName="constraintWrapper"
                editorClassName="editorClassName"
                editorState={sampleEditorState}
                onEditorStateChange={(editorState)=>{handleUpdate(editorState);setSampleEditorState(editorState)}}
                toolbar={{
                    options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'emoji', 'remove', 'history']
                }}
            />
          <p className="mt-4"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> You can go to solution tab and click <b>Run All Tests</b> to get idea about what time and memory your ideal solution is taking, to set the constraints</p>
            <div className=" row my-4">
                <div className="col-md-6">
                    <h4 className="text-pink"> <b>Time Limit (Seconds) </b> </h4>
                    <div className="form-group input-group px-lg-4">
                        <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " > <i className="fa fa-clock"></i> </div>
                      <input type="number" className="form-control"   placeholder="Enter Time" value={props.question&&props.question.timeLimit?props.question.timeLimit:""} onChange={(e)=>props.setQuestion({...props.question,timeLimit:e.target.value})}/>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4 className="text-pink"> <b>Memory Limit (KB) </b> </h4>
                    <div className="form-group input-group px-lg-4">
                        <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " > <i className="fas fa-memory"></i> </div>
                        <input type="number" className="form-control"   placeholder="Enter Memory Limit" value={props.question&&props.question.memoryLimit?props.question.memoryLimit:""} onChange={(e)=>props.setQuestion({...props.question,memoryLimit:e.target.value})} />
                    </div>
                </div>

            </div>

        </React.Fragment>
    )
}


export default Limits
