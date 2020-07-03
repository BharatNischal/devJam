import React,{useState} from 'react';
import Nav from '../../profile/Nav/Nav';
import ImgUploader from "../../ui/imgUploader";

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


function AddUIQuestion(props) {
    const [status,setStatus] = useState("Draft");
    const [sampleEditorState,setSampleEditorState] = useState(EditorState.createEmpty());
    const [img,setImg] = useState(null);

    //UI STATES
    const [btnclickSave,setBtnClickSave] = useState(false);
    const [btnclickPublish,setBtnClickPublish] = useState(false);
    const [activeTab, setActiveTab] = useState("description");
    const [showImgUploader, setShowImgUploader] = useState(false);

    return (
        <React.Fragment>
            {showImgUploader?<ImgUploader update={(url)=>{setShowImgUploader(false); setImg(url);}}  cancel={()=>setShowImgUploader(false)}  />:null}

            <Nav show={true} menu={true}/>
            <div className="bgwhiteoverlay"> </div>
            <div className="container" style={{marginTop:"120px"}} >
                <div className="d-flex justify-content-between">
                    <h1 className="topicTitle mainH text-left text-pink">Add UI Question</h1>
                    <div>

                        {btnclickSave?<div type="submit" className="btn btn-grad ml-2"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" className="loader"/></div>:<button className="btn btn-outline-grad ml-2"> Save </button>}
                        {status=="Draft"?(btnclickPublish?<div type="submit" className="btn btn-grad ml-2"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" className="loader"/></div>:<button className="btn btn-outline-grad ml-2" > Publish </button>):null}


                    </div>
                </div>
                <div className="pl-2 text-left"> <span className="cursor-pointer p-2 pb-4"><i className="fa fa-arrow-left anim-hil text-pink" onClick={()=>props.history.push('/uiQuestions')}></i> Go Back</span><br/></div>
                <div className="row my-5" >
                    <div className="col-md-8">
                        <div className="form-group input-group ">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-pencil" ></i></div>
                            <input type="text" className="form-control"   placeholder="Enter Question Title"  />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-1 f-20 " ><b> Points </b></div>
                            <input type="number" className="form-control"   placeholder="Enter Points"  />
                        </div>
                    </div>
                </div>
                <div className="tabs mb-5">
                    <div className="d-flex tabH" style={{flexGrow:"1"}}>
                        <div className={activeTab=="description"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("description")} > Description </div>
                        <div className={activeTab=="leaderboard"?"tab px-3 p-2 active":"tab px-3 p-2"} onClick={()=>setActiveTab("leaderboard")} > Leaderboard </div>
                        
                    </div>
                    <div className="tabCont p-3">
                        {activeTab=="description"?
                            <React.Fragment>
                                <h3> <b> Description</b> </h3>
                                <div className="m-3">

                                    {!img?<button className="btn btn-outline-grad ml-4 mt-2" onClick={()=>setShowImgUploader(true)} > Add Image <i className="fa fa-img"></i> </button>
                                    :
                                    <img src={img} alt="UI Image" style={{width:"400px",borderRadius:"12px",boxShadow:"0px 4px 12px #0000008a"}} />}
                                </div>
                                <Editor
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                editorState={sampleEditorState}
                                onEditorStateChange={(editorState)=>{setSampleEditorState(editorState)}}
                                toolbar={{
                                    options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'remove', 'history']
                                }}
                                />
                            </React.Fragment>
                        :null}
                        {activeTab=="leaderboard"?
                            <h1>Leaderboard</h1>
                        :null}
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default AddUIQuestion;

