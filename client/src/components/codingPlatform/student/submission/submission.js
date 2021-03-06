import React,{useEffect,useState} from 'react';
import {withRouter} from 'react-router-dom';
import Row from './row';
import axios from "axios";

function Submission(props) {

    const [submissions,setSubmissions] = useState([]);
    const language = {71:"python",62:"java",63:"javascript"};

    useEffect(()=>{

      axios.get(`/submissions/question/${props.match.params.id}`)
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
                    <div className="col-1"> <b>Sr. No.</b> </div>
                    <div className="col-4"> <b>Language</b> </div>
                    <div className="col-4"> <b>Points</b>  </div>
                    <div className="col-3"> </div>
                </div>
                {submissions.map((sub,i)=>(
                  <Row index={i+1} language={language[sub.languageCode]} points={sub.marks} code={sub.sourceCode} />
                ))}

            </div>
        </div>
    )
}

export default withRouter(Submission);
