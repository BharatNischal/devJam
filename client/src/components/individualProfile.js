import React from "react";
import {withRouter} from "react-router-dom";

const IndividualProfile = (props)=>{
    const {profilePic,personalInfo} = props.data;
    return (
      <div className="col-12 col-md-4 my-2" style={{height:"100%"}}>
        <div className="card mx-2" >
            <img src={profilePic} className="card-img-top mx-auto d-block mt-1" style={{maxWidth:"100px"}} />
          <div className="card-body">
            <h5 className="card-title">{`${personalInfo.firstName} ${personalInfo.lastName}`}</h5>
            <p className="card-text">{personalInfo.title}</p>
            <div className="row">
              <div className="col-5">
                <a className="btn btn-primary float-left ml-1 text-white w-100" onClick={()=>{props.history.push(`/profile/${personalInfo.firstName}/${props.data._id}`)}}> View </a>
              </div>
              <div className="col-2"></div>
              <div className="col-5">
                <a className="btn float-right mr-1 text-white bgd-gradient b-none w-100" onClick={()=>{props.history.push(`/editProfile/${personalInfo.firstName}/${props.data._id}`)}}> Edit </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default withRouter(IndividualProfile);
