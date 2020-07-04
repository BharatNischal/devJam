import React,{useState,useEffect,useContext} from 'react';
import Nav from '../../profile/Nav/Nav';
import ImgUploader from "../../ui/imgUploader";
import axios from 'axios';
import {CurUserContext} from '../../../contexts/curUser';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


function AddUIQuestion(props) {
    const [sampleEditorState,setSampleEditorState] = useState(EditorState.createEmpty());
    const [img,setImg] = useState(null);
    const [isTimed,setIsTimed] = useState(false);
    const {user} = useContext(CurUserContext);

    //UI STATES
    const [btnclickSave,setBtnClickSave] = useState(false);
    const [btnclickPublish,setBtnClickPublish] = useState(false);
    const [saveAlert,setSaveAlert] = useState(false);
    const [activeTab, setActiveTab] = useState("description");
    const [showImgUploader, setShowImgUploader] = useState(false);
    const [question,setQuestion] = useState({title:"",description:"",sampleUrl:"",points:0});
    const [status,setStatus] = useState("Draft");
    const [time,setTime] = useState(0);


    useEffect(()=>{

      if(user.loggedIn&&!user.student){

        axios.get(`/frontend/question/${props.match.params.id}`)
          .then(res=>{
            if(res.data.success){
                setQuestion(res.data.question);
                setStatus(res.data.question.status);
                if(res.data.question.time&&res.data.question.time>0){
                  setIsTimed(true);
                  setTime(res.data.question.time);
                }
                const contentBlock = htmlToDraft(res.data.question&&res.data.question.description?res.data.question.description:"");
                if (contentBlock) {
                  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                  const editorState = EditorState.createWithContent(contentState);
                  setSampleEditorState(editorState);
                }
            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })

      }else{
        user.loggedIn?props.history.push('/login'):props.history.push('/studDash');
      }

    },[])

    function handleUpdate(data) {
        setQuestion({...question,description:draftToHtml(convertToRaw(data.getCurrentContent()))});
    }

    // Save the progress
    function handleSave() {
        setBtnClickSave(true);
        const newQuestion = {...question};
        if(isTimed){
          newQuestion.time = time;
        }
        axios.put(`/frontend/question/${props.match.params.id}`,{question:newQuestion})
          .then(res=>{
            if(res.data.success){
              console.log("Saved");
              setBtnClickSave(false);
              setSaveAlert(true);
              setTimeout(()=>{ setSaveAlert(false); },2000)
            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
    }

    // Publishes a new Question which is then accessible to students
    function handlePublish() {
      setBtnClickPublish(true);
      axios.put(`/frontend/question/${props.match.params.id}/status`,{status:"Published"})
        .then(res=>{
          if(res.data.success){
            setStatus("Published");
            setBtnClickPublish(false);
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    }


    return (
        <React.Fragment>
            {showImgUploader?<ImgUploader update={(url)=>{setShowImgUploader(false); setQuestion({...question,sampleUrl:url})}}  cancel={()=>setShowImgUploader(false)}  />:null}

            <Nav show={true} menu={true}/>
            <div className="bgwhiteoverlay"> </div>
            <div className="container" style={{marginTop:"120px"}} >
              {saveAlert?<div className="custom-alert"> Question Saved</div>:null}
                <div className="d-flex justify-content-between">
                    <h1 className="topicTitle mainH text-left text-pink">Add UI Question</h1>
                    <div>

                        {btnclickSave?<div type="submit" className="btn btn-grad ml-2"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" className="loader"/></div>:<button className="btn btn-outline-grad ml-2" onClick={handleSave}> Save </button>}
                        {status=="Draft"?(btnclickPublish?<div type="submit" className="btn btn-grad ml-2"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" className="loader"/></div>:<button className="btn btn-outline-grad ml-2" onClick={handlePublish}> Publish </button>):null}


                    </div>
                </div>
                <div className="pl-2 text-left"> <span className="cursor-pointer p-2 pb-4"><i className="fa fa-arrow-left anim-hil text-pink" onClick={()=>props.history.push('/uiQuestions')}></i> Go Back</span><br/></div>
                <div className="row my-5" >
                    <div className="col-md-8">
                        <div className="form-group input-group ">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-pencil" ></i></div>
                            <input type="text" className="form-control" value={question&&question.title?question.title:""} onChange={(e)=>setQuestion({...question,title:e.target.value})}  placeholder="Enter Question Title"  />
                        </div>
                        <div className="text-left px-lg-4">
                            <div className="custom-control custom-checkbox d-inline" >
                                <input type="checkbox" className="custom-control-input" id="customCheck1" checked={isTimed} onChange={(e)=>setIsTimed(e.target.checked)} />
                                <label className="custom-control-label" htmlFor="customCheck1" >Timed</label>
                            </div>
                            {isTimed?<input type="number" className="form-control d-inline" value={time} onChange={(e)=>setTime(e.target.value)} placeholder="Minutes" style={{width:"100px",marginLeft:"10px",height:"25px"}} />:null}
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-1 f-20 " ><b> Points </b></div>
                            <input type="number" className="form-control"  value={question&&question.points?question.points:""} onChange={(e)=>setQuestion({...question,points:e.target.value})}  placeholder="Enter Points"  />
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

                                    {!question.sampleUrl?<button className="btn btn-outline-grad ml-4 mt-2" onClick={()=>setShowImgUploader(true)} > Add Image <i className="fa fa-img"></i> </button>
                                    :
                                    <img src={question.sampleUrl} alt="UI Image" style={{width:"400px",borderRadius:"12px",boxShadow:"0px 4px 12px #0000008a"}} />}
                                </div>
                                <Editor
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                editorState={sampleEditorState}
                                onEditorStateChange={(editorState)=>{handleUpdate(editorState);setSampleEditorState(editorState)}}
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
