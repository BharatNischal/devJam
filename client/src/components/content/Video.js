import React,{useState,useRef,useEffect} from "react";
import axios from "axios";

const VideoPage = (props)=>{

  const [details,setDetails] = useState({title:"",description:"",filename:"",url:""});
  const [file,setFile] = useState(undefined);
  const [uploadPercentage,setUploadPercentage] = useState(0);
  const [uploading,setUploading] = useState(false);
  const videoRef = useRef(null);

  useEffect(()=>{
    console.log("component did mount");
    axios.get(`http://localhost:8080/video/${props.match.params.id}`)
      .then(res=>{
        if(res.data.success){
          setDetails(res.data.video);
        }else{
          console.log(res.data.msg);
        }
      })
      .catch(err=>{
        console.log(err.msg);
      })
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
    axios.post("http://localhost:8080/video",formData,config)
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
    axios.put(`/video/${props.match.params.id}`,{details})
      .then(res=>{
          if(res.data.success){
              console.log("Success");
          }else{
            console.log(res.data.msg);
          }
      })
      .catch(err=>{
        console.log(err.message);
      })
  }

  let button = uploading?<div className="progress mt-3" style={{height:"20px"}}>
                          <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width:`${String(uploadPercentage)}%`}} role="progressbar"  aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>:<div className="form-group input-group mt-2 w-50">
                                  <input  ref={videoRef} onChange={onUpload} type="file" name="profilePic"  placeholder="Upload Profile Pic" className="form-control"/>
                                </div>;
  let thumbnail = uploading?<div className="py-5 w-100"><p>Uploading video</p></div>:<div>
                              <img src={details.url.length>4?details.url.substr(0, details.url.lastIndexOf("."))+".jpg":""} alt="" className="img-thumbnail"/>
                            </div>

  return (
    <div className="mt-5">
      <div className="container">
        <div className="row mb-3">
          <div >
            <span className="pointer" onClick={()=>{props.history.push("/profiles")}} style={{fontSize:"1.5em"}}><i className="fa fa-close"></i> Video</span>
            <button className="btn btn-success float-right" onClick={handleSave}>Save</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 col-12">
            <h2 className="text-left text-white">Details</h2>
            <div className="input-group input-group-lg">
              <input type="text" className="form-control" placeholder="Title" value={details.title} onChange={(e)=>{setDetails({...details,title:e.target.value})}} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
            </div>
            <br/>
            <div className="input-group" style={{height:"30vh"}}>
              <textarea className="form-control" aria-label="With textarea" value={details.description} onChange={(e)=>{setDetails({...details,description:e.target.value})}} placeholder="Description" style={{resize:"none"}}></textarea>
            </div>
          </div>
          <div className="col-md-3 col-12 mt-2">
            {thumbnail}
            <div>
              <p>{details.url}</p>
              <p>{details.filename}</p>
            </div>
          </div>
        </div>
          {button}

      </div>
    </div>
  );

}

export default VideoPage;
