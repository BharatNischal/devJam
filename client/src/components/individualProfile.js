import React from "react";

const IndividualProfile = (props)=>{

    return (
      <div className="col-12 col-md-4 my-2" style={{height:"100%"}}>
        <div className="card mx-2" >
            <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png" className="card-img-top mx-auto d-block mt-1" style={{maxWidth:"100px"}} />
          <div className="card-body">
            <h5 className="card-title">Bharat Nischal</h5>
            <p className="card-text">Details................</p>
            <div className="row">
              <div className="col-5">
                <a className="btn btn-primary float-left ml-1 text-white w-100"> View </a>
              </div>
              <div className="col-2"></div>
              <div className="col-5">
                <a className="btn float-right mr-1 text-white bgd-gradient b-none w-100"> Edit </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default IndividualProfile;
