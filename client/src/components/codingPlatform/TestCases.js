import React from 'react'

export default function TestCases(props) {
  return (
    <React.Fragment>
        <h2 className="topicTitle text-pink mb-2"  ><b>Test Cases</b></h2>

        <div className=" mb-3">
            <div className=" row">
                <div className="col-md-6">
                    <h6>Input</h6>
                    <div className="form-group">
                        <textarea className="form-control" rows="4" ></textarea>
                    </div>
                </div>
                <div className="col-md-6">
                    <h6> Output</h6>
                    <div className="form-group">
                        <textarea className="form-control" rows="4" ></textarea>
                    </div>
                </div>

            </div>
            <div className="d-flex justify-content-between">
                <div className="custom-control custom-switch " >
                    <input type="checkbox" className="custom-control-input" id="isHidden" />
                    <label className="custom-control-label" htmlFor="isHidden" >Hidden</label>
                </div>
                <div><button className="btn btn-grad float-right"> Add Test Case </button></div>
            </div>
            <hr className="mt-2" />
        </div>
        <div className=" mb-3">
            <h5>  Test Case #1 <i className="fa fa-lock text-pink ml-2 "></i></h5>
            <div className=" row">
                <div className="col-md-6">
                    <h6>Input</h6>
                    <div className="form-group">
                        <textarea className="form-control" rows="3" disabled={true} ></textarea>
                    </div>
                </div>
                <div className="col-md-6">
                    <h6> Output</h6>
                    <div className="form-group">
                        <textarea className="form-control" rows="3" disabled={true}></textarea>
                    </div>
                </div>

            </div>

        </div>
        <div className=" mb-3">
            <h5>  Test Case #2 <i className="fa fa-unlock text-pink ml-2 "></i>  </h5>
            <div className=" row">
                <div className="col-md-6">
                    <h6>Input</h6>
                    <div className="form-group">
                        <textarea className="form-control" rows="3" disabled={true} ></textarea>
                    </div>
                </div>
                <div className="col-md-6">
                    <h6> Output</h6>
                    <div className="form-group">
                        <textarea className="form-control" rows="3" disabled={true}></textarea>
                    </div>
                </div>

            </div>

        </div>
    </React.Fragment>
  )
}
