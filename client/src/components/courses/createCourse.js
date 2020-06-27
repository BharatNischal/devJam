import React, { useState } from 'react';
import Nav from '../profile/Nav/Nav';
import "./courses.css";
import Calendar from './calendar';
import monthMap from "./monthMap";
import Alert from '../ui/alert/alert';


function CreateCourse(props) {
    const [startingMonth,setStartingMonth] = useState(-1);
    const [endingMonth,setEndingMonth] = useState(-1);
    const [videoAlert,setVideoAlert] = useState({show:false,date:null});
    const [deliverableAlert,setDeliverableAlert] = useState({show:false,date:null});
    const [testAlert,setTestAlert] = useState({show:false,date:null});
    const [eventAlert,setEventAlert] = useState({show:false,date:null});


    const calendars=[];
    if(+startingMonth!=-1 && +endingMonth!=-1 &&+startingMonth<+endingMonth){
        for(let i=+startingMonth;i<=+endingMonth;i++){
            calendars.push((
                <div className="mt-4 mb-5" >
                    <h2 className="topicTitle mainH text-left"> {monthMap[i].name} </h2>
                    <Calendar start={new Date(`${i}-01-${new Date().getFullYear()}`).getDay()} lastEnd={i==1?monthMap[12].days:monthMap[i-1].days} end={monthMap[i].days}  month={i} setVideoAlert={setVideoAlert} setDeliverableAlert={setDeliverableAlert} setEventAlert={setEventAlert} setTestAlert={setTestAlert} />        
                </div>
            ))
        }
    }
    return (
        <React.Fragment>
            <Nav show={true} menu={true}/>
            <div className="bgwhiteoverlay"></div>

            {videoAlert.show?<Alert cancel={()=>setVideoAlert({show:false,date:null})}> 
                <h2 className="topicTitle mainH"> Add Video </h2> 
                <p>  {videoAlert.date} </p>
            </Alert>:null}
            {deliverableAlert.show?<Alert cancel={()=>setDeliverableAlert({show:false,date:null})}> 
                <h2 className="topicTitle mainH"> Add Deliverable </h2> 
                <p>  {deliverableAlert.date} </p>
            </Alert>:null}
            {testAlert.show?<Alert cancel={()=>setTestAlert({show:false,date:null})}> 
                <h2 className="topicTitle mainH"> Add Test </h2> 
                <p>  {testAlert.date} </p>
            </Alert>:null}
            {eventAlert.show?<Alert cancel={()=>setEventAlert({show:false,date:null})}> 
                <h2 className="topicTitle mainH"> Add Event </h2> 
                <p>  {eventAlert.date} </p>
            </Alert>:null}
            
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
                            <select className="form-control" value={startingMonth} onChange={(e)=>setStartingMonth(e.target.value)}  >
                                <option value="-1" > Select Starting Month </option>
                                <option value="1" > January </option>
                                <option value="2" > Feburary </option>
                                <option value="3" > March </option>
                                <option value="4" > April </option>
                                <option value="5" > May </option>
                                <option value="6" > June </option>
                                <option value="7" > July </option>
                                <option value="8" > August </option>
                                <option value="9" > September </option>
                                <option value="10" > October </option>
                                <option value="11" > November </option>
                                <option value="12" > Deceber </option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-4">
                    <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-calendar-alt" ></i></div>
                            <select className="form-control" value={endingMonth} onChange={(e)=>setEndingMonth(e.target.value)}  >
                                <option value="-1" > Select Starting Month </option>
                                <option value="1" > January </option>
                                <option value="2" > Feburary </option>
                                <option value="3" > March </option>
                                <option value="4" > April </option>
                                <option value="5" > May </option>
                                <option value="6" > June </option>
                                <option value="7" > July </option>
                                <option value="8" > August </option>
                                <option value="9" > September </option>
                                <option value="10" > October </option>
                                <option value="11" > November </option>
                                <option value="12" > Deceber </option>
                            </select>
                        </div>  
                    </div>
                    <div className="col-lg-4"></div>
                </div>
                {calendars}
            </div>
        </React.Fragment>
    )
}


export default CreateCourse;

