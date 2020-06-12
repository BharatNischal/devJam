import React,{useState,useRef,useEffect} from 'react';
import Axios from 'axios';

function Deliverable(props) {
    const [showItemDescription, setShowItemDescription] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [comment, setComment] = useState("");
    const SubmissionRef=useRef(null);

    //UI STATES
    const [showSubmitAlert, setShowSubmitAlert] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    useEffect(() => {
        Axios.get(`/issubmitted/${props.deliverable._id}`)
        .then(res=>{
            if(res.data.success){
                setIsSubmitted(res.data.isSubmitted);
            }else{
                alert(res.data.msg);
            }
        }).catch(err=>{
            alert(err.message);
        });

    }, [props.deliverable._id]);

    const submitHandler=(e)=>{
        e.preventDefault();
        setShowLoader(true);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
          };
          const formData = new FormData();
          formData.append('zip',SubmissionRef.current.files[0]);
          formData.append('comment',comment);
          Axios.post(`/submission/${props.deliverable._id}`,formData,config)
          .then(res=>{
              setShowLoader(false);
              if(res.data.success){
                  setIsSubmitted(true);
                  setComment("");
                  
                  setShowSubmitAlert(true);
                  setTimeout(()=>{
                    setShowSubmitAlert(false);
                  },2000)
              }else{
                  alert(res.data.msg);
              }
          }).catch(Err=>{
              setShowLoader(false);
              console.log(Err);
          });
        
     }
    return (
        <div >
            {showLoader?<div className="d-backdrop text-center pt-5" onClick={props.close}><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" className="mt-5"/></div>:null}
             {showSubmitAlert?<div className="custom-alert"> <i className="fa fa-check-circle text-success" ></i> Work Submitted Successfully </div>:null}
            <h3 className="topicTitle "><span className="pr-3" style={{borderBottom:"2px solid pink"}}>{props.deliverable?props.deliverable.title:""}</span></h3>
            <div className="px-3">
                <div><b>Points: </b>{props.deliverable?props.deliverable.points:0} Points</div>
                <div className="mb-3"><b>Due Date: </b>{props.deliverable?props.deliverable.dueDate.substr(0,10):""}</div>
                <b className="showDescText cursor-pointer mb-2" onClick={()=>setShowItemDescription(!showItemDescription)} >
                    {showItemDescription?"Hide":"Show"} Deliverable Description <i className={showItemDescription?"fa fa-arrow-down rotate arrowIcon ":"fa fa-arrow-down arrowIcon"}></i>
                </b>
                <p className={showItemDescription?"showDescription description":"px-3 description"}>{props.deliverable?props.deliverable.instruction:""}</p>
                <div className="row my-5" >
                        <div className="col-lg-3 col-md-2"></div>

                        <div className="col-lg-6 col-md-8">
                            <div style={{borderRadius:"18px"}} className="shadow p-3">
                                <h4 className="text-center text-pink mb-3"> Submit Work </h4>
                                {isSubmitted?<h5 className="text-center"> Work Submitted Already </h5>:
                                <form onSubmit={submitHandler}>
                                    <div className="mb-2"><b>Upload Zip File</b> </div>
                                    <input type="file" ref={SubmissionRef} accept=".zip,.rar,.7zip"/>

                                      <h5 className="text-left text-pink mb-3 mt-3"> Private Comments </h5>
                                      <div style={{borderBottom:"2px solid pink"}} className="mt-3">
                                          <input type="text" style={{background:"none",outline:"none",border:"none",width:"88%"}} value={comment} onChange={(e)=>{setComment(e.target.value)}} placeholder="Enter Comment"></input>
                                      </div>

                                    <button className="mt-3 btn btn-outline-grad btn-block"> Submit  </button>
                                </form>}
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2"></div>
                        <div className="col-lg-3 col-md-2"></div>


                        <div className="col-lg-3 col-md-2"></div>
                </div>
            </div>
        </div>
    )
}

export default Deliverable;
