import React from 'react';
import Nav from '../profile/Nav/Nav';
import "./courses.css";

function CreateCourse(props) {
    return (
        <React.Fragment>
            <Nav show={true} menu={true}/>
            <div className="bgwhiteoverlay"></div>
            <div className="container" style={{marginTop:"120px"}} >
                <div className="d-flex justify-content-between">
                    <h1 className="topicTitle mainH text-left text-pink">Create Test  <span style={{fontSize:"16px"}} >( X Months )</span></h1>
                    <div>
                        <span className="h3" style={{position:"relative", top:"5px" }} > <i className="fa fa-eye  hover-pink pointer" ></i></span>
                        <button className="btn btn-outline-grad ml-2" > Save </button>
                        <button className="btn btn-outline-grad ml-2" > Publish / Close </button>
                        <button className="btn btn-outline-grad ml-2" > Generate Reminder </button>

                    </div>
                </div>
                <div className="row my-5" >
                    <div className="col-12" >
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-pencil" ></i></div>
                            <input type="text" className="form-control"   placeholder="Enter Course Title" />
                        </div>
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-align-justify" ></i></div>
                            <textarea rows="5" placeholder="Enter Course Description  " className="form-control"></textarea>

                        </div>
                        
                    </div>
                    <div className="col-lg-4">
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-calendar-alt" ></i></div>
                            <input type="date" className="form-control"   placeholder="Enter Course Title" />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-calendar-check" ></i></div>
                            <input type="date" className="form-control"   placeholder="Enter Course Title" />
                        </div>    
                    </div>
                    <div className="col-lg-4"></div>
                </div>
                <div className="mt-4 mb-5" >
                    <div className="calendar-grid">
                        <div className="cal-header border"> Monday </div>
                        <div className="cal-header border"> Tuesday </div>
                        <div className="cal-header border"> Wednesday </div>
                        <div className="cal-header border"> Thursday </div>
                        <div className="cal-header border"> Friday </div>
                        <div className="cal-header border"> Saturday </div>
                        <div className="cal-header border"> Sunday </div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                        <div className="border"></div>
                    </div>        
                </div>
            </div>
        </React.Fragment>
    )
}


export default CreateCourse;

