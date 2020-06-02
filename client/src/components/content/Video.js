import React,{useState,useRef,useEffect,useContext} from "react";
import Modal from "../ui/modal/modal";
import Nav from "../profile/Nav/Nav";
import axios from "axios";
import {CurUserContext} from "../../contexts/curUser";

const VideoPage = (props)=>{

  const [details,setDetails] = useState({title:"",description:"",filename:"",url:""});
  const [file,setFile] = useState(undefined);
  const [uploadPercentage,setUploadPercentage] = useState(0);
  const [uploading,setUploading] = useState(false);
  const videoRef = useRef(null);
  const {login} = useContext(CurUserContext);
  const [loading,setLoading]= useState(true);
  const [err,setErr] = useState(null);
  const [copyAlert,setCopyAlert] = useState(false);

  useEffect(()=>{
    if(login){
      axios.get(`/topic/video/${props.match.params.id}`)
        .then(res=>{
          if(res.data.success){
            setDetails(res.data.video);
          }else{
            console.log(res.data.msg);
            setErr(res.data.msg);
          }
          setLoading(false);
        })
        .catch(err=>{
          console.log(err.msg);
          setLoading(false);
          setErr(err.msg);
        })
    }else{
      props.history.push("/login");
    }
  },[])

  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        let percent = Math.floor( (loaded * 100) / total )
        // console.log( `${loaded}kb of ${total}kb | ${percent}%` );
        if( percent < 80 ){
          setUploadPercentage(percent);
        }
      }
  };

  const onUpload = (e)=>{
    setDetails({...details,filename:videoRef.current.files[0].name});
    setUploading(true);
    const formData = new FormData();
    formData.append('video',videoRef.current.files[0]);
    axios.post("/topic/video",formData,config)
      .then(res=>{
        setUploadPercentage(100);
        setDetails({...details,url:res.data.result.secure_url});
        console.log(res.data.result);
        setTimeout(()=>{
          setUploading(false);
        },1000);
      })
      .catch(err=>{
        console.log(err);
      })
  }

  const handleSave = ()=>{
    setLoading(true);
    axios.put(`/topic/video/${props.match.params.id}`,{details})
      .then(res=>{
          if(res.data.success){
              console.log("Success");
          }else{
            setErr(res.data.msg);
            console.log(res.data.msg);
          }
          setLoading(false);
      })
      .catch(err=>{
        console.log(err.message);
        setErr(err.msg);
        setLoading(false);
      })
  }

  const copyHandler = ()=>{
    var textField = document.createElement('textarea')
    textField.innerText = details.url.length>0?details.url:"empty";
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    console.log("Coppied");
    setCopyAlert(true);
    setTimeout(()=>{setCopyAlert(false)},2000);
  }



  let button = details.url.length<4?(uploading?<div className="progress mt-3" style={{height:"10px"}}>
                          <div className="progress-bar progress-bar-striped bgd-gradient" style={{width:`${String(uploadPercentage)}%`}} role="progressbar"  aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>:<div className="form-group input-group col-md-9 col-sm-12 mt-2 mt-lg-4">
                                  <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-video-camera" ></i></div>
                                  <input type="file" name="profilePic" ref={videoRef} onChange={onUpload} placeholder="Upload Profile Pic" className="form-control"/>
                                </div>):null;
  let thumbnailSrc = uploading?"https://gifimage.net/wp-content/uploads/2018/06/upload-animated-gif-3.gif":(details.url.length>4?details.url.substr(0, details.url.lastIndexOf("."))+".jpg":"https://simplylandscapingct.com/wp-content/uploads/2017/11/large-white-background.jpg")

let videoMain =    <div>
        <div className="row">
          <div className="col-md-9 col-12 mt-3" style={{borderRight:"1px solid #aaa"}}>
              <div className="form-group input-group px-lg-4">
                  <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-pencil" ></i></div>
                  <input type="text" name="title" value={details.title} onChange={(e)=>{setDetails({...details,title:e.target.value})}} placeholder="Enter Title" className="form-control" required />
              </div>
              <div className="form-group input-group px-lg-4">
                  <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-align-justify" ></i></div>
                  <textarea name="instructions"  onChange={(e)=>{setDetails({...details,description:e.target.value})}} rows="5" placeholder="Enter Instructions" className="form-control" value={details.description}></textarea>
              </div>
          </div>
          <div className="col-md-3 col-12 mt-2">
            <div className="px-lg-2">
              <img src={thumbnailSrc} alt="" className="img-thumbnail img-responsive"/>
            </div>
            <div>
              <div className="px-lg-2 mt-2">
                  <p className="my-0" style={{fontSize:"0.8em",position:"relative",top:"5px",fontWeight:"bold",left:"-2px"}}>Video Url</p>
                  <input type="text" name="title" value={details.url.length>0?details.url:"Empty"}  className="" readOnly style={{border:"none",outline:"none",maxWidth:"80%",marginRight:"5px"}} />
                  <i className="fa fa-clone pointer" onClick={copyHandler} ></i>
              </div>
              <div className="px-lg-2">
                  <p className="my-0" style={{fontSize:"0.8em",position:"relative",top:"5px",fontWeight:"bold",left:"-2px"}}>Filename</p>
                  <input type="text" name="title" value={details.filename.length>0?details.filename:"Empty"} className="" readOnly style={{border:"none",width:"95%", outline:"none"}} />
              </div>
            </div>
          </div>
        </div>
          {button}
      </div>

  return (
    <React.Fragment>
    <Nav show={true} menu={true}/>
    <Modal title="Video" save={handleSave} close={()=>{props.history.push(`/topic/${props.location.topicId}`)}} >
        {loading?<div className="text-center"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" /></div>
            :err?<p>{err}</p>:videoMain}
    </Modal>
    {copyAlert?<div className="custom-alert"> Link Coppied to Clibard </div>:null}
    </React.Fragment>
  );

}

export default VideoPage;
