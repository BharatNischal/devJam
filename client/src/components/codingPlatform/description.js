import React,{useState,useEffect} from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export default function Description(props) {

  const [sampleEditorState,setSampleEditorState] = useState(EditorState.createEmpty());

  useEffect(()=>{

    const contentBlock = htmlToDraft(props.desc);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setSampleEditorState(editorState);
    }

  },[])

  function toHTML() {
    draftToHtml(convertToRaw(sampleEditorState.getCurrentContent()))
  }

  return (
    <React.Fragment>
        <h2 className="topicTitle text-pink mb-2"  ><b>Description</b></h2>

        <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            editorState={sampleEditorState}
            onEditorStateChange={(editorState)=>setSampleEditorState(editorState)}
            toolbar={{
                options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'remove', 'history']
            }}
        />

    </React.Fragment>
  )
}
