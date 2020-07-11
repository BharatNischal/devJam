import React,{useEffect,useState} from 'react';
import {withRouter} from 'react-router-dom';
import Row from './row';
import axios from "axios";

function Submission(props) {

    const [submissions,setSubmissions] = useState([]);

   useEffect(()=>{

     axios.get(`/submissions/frontendquestion/${props.match.params.id}`)
       .then(res=>{
         if(res.data.success){
           console.log(res.data.submissions);
           setSubmissions(res.data.submissions);
         }else{
           console.log(res.data.msg);
         }
       })
       .catch(err=>{
         console.log(err.message);
       })


   },[])


    return (
        <div className="p-3" >
            <h3 className="mb-3" ><b> Your Submissions </b></h3>
            <div className="p-3">
                <div className="row py-2" style={{boxShadow:"0px 4px 8px rgba(0,0,0,0.5)"}} >
                    <div className="col-2"> <b>Sr. No.</b> </div>
                    <div className="col-6"> <b>Points</b>  </div>
                    <div className="col-4"> </div>
                </div>
                {submissions.map((sub,i)=>(
                  <Row index={i+1}  points={sub.marks} html={sub.html} css={sub.css} js={sub.js} />
                ))}

            </div>
        </div>
    )
}

export default withRouter(Submission);
