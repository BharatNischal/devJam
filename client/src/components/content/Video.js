import React,{useState,useRef} from "react";
import axios from "axios";

const VideoPage = (props)=>{

  const [details,setDetails] = useState({title:"",desc:""});
  const [file,setFile] = useState(undefined);
  const [uploadPercentage,setUploadPercentage] = useState(0);
  const [uploading,setUploading] = useState(false);
  const [uploadDetails,setUploadDetails] = useState({url:"",thumbnail:"",filename:""});
  const videoRef = useRef(null);

  const config = {
    headers: {
        'content-type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
        const {loaded, total} = progressEvent;
        let percent = Math.floor( (loaded * 100) / total )
        console.log( `${loaded}kb of ${total}kb | ${percent}%` );

        if( percent < 95 ){
          setUploadPercentage({ uploadPercentage: percent })
        }
      }
  };

  const onUpload = (e)=>{
    setUploadDetails({filename:videoRef.current.files[0].name});
    setUploading(true);
    const formData = new FormData();
      formData.append('video',videoRef.current.files[0]);
    axios.post("http://localhost:8080/video",formData,config)
      .then(res=>{
        setUploadPercentage(100);
        setUploadDetails({url:res.data.secure_url});
        console.log(res.data);
        setTimeout(()=>{
          setUploading(false);
        },1000);
      })
      .catch(err=>{
        console.log(err);
      })
  }

  let button = uploading?<div className="progress mt-3" style={{height:"20px"}}>
                          <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width:`${String(uploadPercentage)}%`}} role="progressbar"  aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>:<div className="form-group input-group mt-2 w-50">
                                  <input  ref={videoRef} onChange={onUpload} type="file" name="profilePic"  placeholder="Upload Profile Pic" className="form-control"/>
                                </div>;
  let thumbnail = uploading?<div className="py-5 w-100"><p>Uploading video</p></div>:<div>
                              <img src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" className="img-thumbnail"/>
                            </div>

  return (
    <div className="mt-5">
      <div className="container">
        <div className="row mb-3">
          <div >
            <span className="" style={{fontSize:"1.5em"}}><i className="fa fa-close"></i> Video</span>
            <button className="btn btn-success float-right">Save</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9 col-12">
            <h2 className="text-left text-white">Details</h2>
            <div className="input-group input-group-lg">
              <input type="text" className="form-control" placeholder="Title" value={details.title} onChange={(e)=>{setDetails({title:e.target.value})}} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
            </div>
            <br/>
            <div className="input-group" style={{height:"30vh"}}>
              <textarea className="form-control" aria-label="With textarea" value={details.desc} onChange={(e)=>{setDetails({desc:e.target.value})}} placeholder="Description" style={{resize:"none"}}></textarea>
            </div>
          </div>
          <div className="col-md-3 col-12 mt-2">
            {thumbnail}
            <div>
              <p>{uploadDetails.url}</p>
              <p>{uploadDetails.filename}</p>
            </div>
          </div>
        </div>
          {button}

      </div>
    </div>
  );

}

export default VideoPage;
