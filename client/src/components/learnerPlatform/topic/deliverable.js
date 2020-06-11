import React,{useState,useRef,useEffect} from 'react';
import Axios from 'axios';

function Deliverable(props) {
    const [showItemDescription, setShowItemDescription] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const SubmissionRef=useRef(null);

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
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
          };
          const formData = new FormData();
          formData.append('zip',SubmissionRef.current.files[0]);
          Axios.post(`/submission/${props.deliverable._id}`,formData,config)
          .then(res=>{
              if(res.data.success){
                  setIsSubmitted(true);
                  alert("Work Submitted Successfully");
              }else{
                  alert(res.data.msg);
              }
          }).catch(Err=>{
              console.log(Err);
          });
     }
    return (
        <div >
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
                                    <input type="file" ref={SubmissionRef}></input>

                                    <button className="mt-3 btn btn-outline-grad btn-block"> Submit  </button>
                                </form>}
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2"></div>
                        <div className="col-lg-3 col-md-2"></div>

                        <div className="col-lg-6 col-md-8 mt-5">
                            <div style={{borderRadius:"18px"}} className="shadow p-3">
                                <h5 className="text-center text-pink mb-3"> Private Comments </h5>
                                <div style={{borderBottom:"2px solid pink"}} className="mt-3">
                                    <input type="text" style={{background:"none",outline:"none",border:"none",width:"88%"}} placeholder="Enter Comment"></input>
                                    <i className="fa fa-send text-pink"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2"></div>
                </div>
            </div>
        </div>
    )
}

export default Deliverable;
