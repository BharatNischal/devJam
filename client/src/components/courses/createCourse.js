import React, { useState,useEffect } from 'react';
import Nav from '../profile/Nav/Nav';
import "./courses.css";
import Calendar from './calendar';
import monthMap from "./monthMap";
import Alert from '../ui/alert/alert';
import AlertBody from './alertBody';
import axios from "axios";

function CreateCourse(props) {
    const [startingMonth,setStartingMonth] = useState(-1);
    const [endingMonth,setEndingMonth] = useState(-1);
    const [videoAlert,setVideoAlert] = useState({show:false,date:null});
    const [deliverableAlert,setDeliverableAlert] = useState({show:false,date:null});
    const [testAlert,setTestAlert] = useState({show:false,date:null});
    const [eventAlert,setEventAlert] = useState({show:false,date:null});
    const [course,setCourse] = useState({title:"",status:"Draft",instructions:""});
    const [events,setEvents] = useState({
        "06-01-2020":[{video:{title:"video"}}],
        "06-11-2020":[{deliverable:{title:"deliverable"}},{test:{title:"test"}}],
        "08-13-2020":[{video:{title:"video"}}]
    });

    const [saveAlert,setSaveAlert] = useState(false);

    useEffect(()=>{
      axios.get(`/course/find/${props.match.params.id}`)
      .then(res=>{
        if(res.data.success){
          const {title,status,instructions} = res.data.course;
          setCourse({title,status,instructions});
          setEvents(res.data.course.events);
          let obj ={};
          res.data.course.events.forEach(event=>{
            obj[event.date] = event.items;
          })
          setEvents(obj);
          setStartingMonth(res.data.course.startMonth);
          setEndingMonth(res.data.course.endMonth);
        }else{
          console.log(res.data.msg);
        }
      })
      .catch(err=>{
        console.log(err.message);
      })
    },[])

    const calendars=[];
    if(+startingMonth!=-1 && +endingMonth!=-1 &&+startingMonth<=+endingMonth){
        for(let i=+startingMonth;i<=+endingMonth;i++){
            calendars.push((
                <div className="mt-4 mb-5" >
                    <h2 className="topicTitle mainH text-left"> {monthMap[i].name} </h2>
                    <Calendar start={new Date(`${i}-01-${new Date().getFullYear()}`).getDay()} lastEnd={i==1?monthMap[12].days:monthMap[i-1].days} end={monthMap[i].days}  month={i} setVideoAlert={setVideoAlert} setDeliverableAlert={setDeliverableAlert} setEventAlert={setEventAlert} setTestAlert={setTestAlert} events={events} />
                </div>
            ))
        }
    }

    function handleAdd(data,date) {
      const newEvents = JSON.parse(JSON.stringify(events));
      if(newEvents[date]){
        newEvents[date].push(...data);
      }else{
        newEvents[date] = data;
      }
      setEvents(newEvents);
    }


    function handleSave() {
      const eventData = Object.keys(events).map(event=>(
        {
          date:event,
          items:events[event]
        }
      ))
      const {title,status,instructions} = course;
      const newCourse = {title,status,instructions,events:eventData,startMonth:startingMonth,endMonth:endingMonth};
      axios.put(`/course/${props.match.params.id}`,{course:newCourse})
      .then(res=>{
          console.log(res.data.success);
        if(res.data.success){
          console.log("Saved");
          setSaveAlert(true);
          setTimeout(()=>{
              setSaveAlert(false);
          },2000)
        }else{
          console.log(res.data.msg);
        }
      })
      .catch(err=>{
        console.log(err.message);
      })
    }

    return (
        <React.Fragment>
            <Nav show={true} menu={true}/>
            {saveAlert?<div className="custom-alert"> Course Saved</div>:null}
            <div className="bgwhiteoverlay"></div>

            {videoAlert.show?<Alert cancel={()=>setVideoAlert({show:false,date:null})}>

                <AlertBody date={videoAlert.date} type="video" add={handleAdd}/>
            </Alert>:null}
            {deliverableAlert.show?<Alert cancel={()=>setDeliverableAlert({show:false,date:null})}>
                <AlertBody date={deliverableAlert.date} type="deliverable" add={handleAdd}/>
            </Alert>:null}
            {testAlert.show?<Alert cancel={()=>setTestAlert({show:false,date:null})}>
                <AlertBody date={testAlert.date} type="test" add={handleAdd}/>
            </Alert>:null}
            {eventAlert.show?<Alert cancel={()=>setEventAlert({show:false,date:null})}>
                <h2 className="topicTitle mainH"> Add Event </h2>
                <p>  {eventAlert.date} </p>
            </Alert>:null}

            <div className="container" style={{marginTop:"120px"}} >
                <div className="d-flex justify-content-between">
                    <h1 className="topicTitle mainH text-left text-pink">{course.status=="Draft"?"Create Course":"View Course"}  <span style={{fontSize:"16px"}} >( X Months )</span></h1>
                    <div>
                        <span className="h3" style={{position:"relative", top:"5px" }} > <i className="fa fa-eye  hover-pink pointer" ></i></span>
                        <button className="btn btn-outline-grad ml-2" onClick={handleSave}> Save </button>
                        <button className="btn btn-outline-grad ml-2" > Publish / Close </button>
                        <button className="btn btn-outline-grad ml-2" > Generate Reminder </button>

                    </div>
                </div>
                <div className="row my-5" >
                    <div className="col-12" >
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-pencil" ></i></div>
                            <input type="text" className="form-control"   placeholder="Enter Course Title" value={course.title} onChange={(e)=>setCourse({...course,title:e.target.value})}/>
                        </div>
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-align-justify" ></i></div>
                            <textarea rows="5" placeholder="Enter Course Description  " className="form-control" value={course.instructions} onChange={(e)=>setCourse({...course,instructions:e.target.value})}></textarea>

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
