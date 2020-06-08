import React from "react";
import {withRouter} from "react-router-dom";


// Component to show basic details in the profiles page for a particular profile
const IndividualProfile = (props)=>{
    const copyToClipBoard=()=>{ //Copy to clipboard Logic
      var textField = document.createElement('textarea')
        textField.innerText =window.location.host+`/profile/${personalInfo.firstName}/${props.data._id}`;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        console.log("Coppied");
        props.showCopyAlert();
    }
    const {profilePic,personalInfo} = props.data;
    return (
      <div className="col-12 col-md-4 mb-4 " >
        <div className="card " style={{height:"100%",borderRadius:"18px"}}>
          <div className="profileImg mt-3 mb-3" style={{width:"180px",height:"180px"}}>
            <div style={{backgroundImage:"url(" + profilePic +")",width:"160px",height:"160px",padding:"10px"}}></div>
          </div>
          <div className="card-body">
            <h5 className="card-title">{`${personalInfo.firstName} ${personalInfo.lastName}`}</h5>
            <p className="card-text">{personalInfo.title}</p>
            <div className="row">
              <div className="col-5 p-0">
                <a className="btn btn-primary btn-block  float-left ml-1 text-white " onClick={()=>{props.history.push(`/profile/${personalInfo.firstName}/${props.data._id}`)}}> View </a>
              </div>
              <div className="col-2 text-white p-0" onClick={copyToClipBoard}> <i className="fa fa-share bg-grad" style={{borderRadius:"50%",padding:"10px"}} ></i> </div>
              <div className="col-5 p-0">
                <a className="btn float-right mr-1 btn-block text-white bgd-gradient b-none" onClick={()=>{props.history.push(`/editProfile/${personalInfo.firstName}/${props.data._id}`)}}> Edit </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default withRouter(IndividualProfile);
