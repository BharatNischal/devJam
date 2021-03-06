import React, { useState,useEffect,useContext } from 'react';
import Nav from '../profile/Nav/Nav';
import "./courses.css";
import Calendar from './calendar';
import monthMap from "./monthMap";
import Alert from '../ui/alert/alert';
import AlertBody from './alertBody';
import axios from "axios";
import {CurUserContext} from "../../contexts/curUser";
import TopBar from "../learnerPlatform/TopBar";
import Deliverable from '../learnerPlatform/topic/deliverable';
import UpcomingEvent from './UpcomingEvent';

function CreateCourse(props) {
    const [startingMonth,setStartingMonth] = useState(-1);
    const [endingMonth,setEndingMonth] = useState(-1);
    const [videoAlert,setVideoAlert] = useState({show:false,date:null});
    const [deliverableAlert,setDeliverableAlert] = useState({show:false,date:null});
    const [testAlert,setTestAlert] = useState({show:false,date:null});
    const [eventAlert,setEventAlert] = useState({show:false,date:null});
    const [course,setCourse] = useState({title:"",status:"Draft",instructions:""});
    const [events,setEvents] = useState({});
    const [eventModal,setEventModal] = useState({show:false,type:null,index:null,date:null});
    const [saveAlert,setSaveAlert] = useState(false);
    const [showDeliverableAlert,setShowDeliverableAlert] = useState({show:false,deliverable:null});
    const [preview,setPreview] = useState(false);
    const {user} = useContext(CurUserContext);
    const [showUpcomingAlert,setShowUpcomingAlert] = useState(false);


    useEffect(()=>{
      if(user.loggedIn){

        axios.get(`/course/find/${props.match.params.id}`)
        .then(res=>{
          if(res.data.success){
            const {title,status,instructions} = res.data.course;
            if(status!="Published" && user.student){
              props.history.push('/studDash');
            }
            setCourse({title,status,instructions});
            setEvents(res.data.course.events);
            let obj ={};
            res.data.course.events.forEach(event=>{
              obj[event.date.substr(0,10)] = event.items;
            })
            console.log("event",obj);
            console.log("backend",res.data.course.events);
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

      }else{
        props.history.push('/login')
      }

    },[])

    const calendars=[];
    if(+startingMonth!=-1 && +endingMonth!=-1 &&+startingMonth<=+endingMonth){
        for(let i=+startingMonth;i<=+endingMonth;i++){
            calendars.push((
                <div className="mt-4 mb-5" >
                    <h2 className="topicTitle mainH text-left"> {monthMap[i].name} </h2>
                    <Calendar start={new Date(`${i}-01-${new Date().getFullYear()}`).getDay()} lastEnd={i==1?monthMap[12].days:monthMap[i-1].days} end={monthMap[i].days}  month={i} setVideoAlert={setVideoAlert} setDeliverableAlert={setDeliverableAlert} setEventAlert={setEventAlert} setTestAlert={setTestAlert} events={events} setEventModal={setEventModal} isStudent={user.student||preview} />
                </div>
            ))
        }
    }

    function handleClose(id){
      axios.put(`/course/close/${props.match.params.id}`)
        .then(res=>{
          if(res.data.success){
            setCourse({...course,status:"Closed"})
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.msg);
        })
    }

    // To make reminders
    function handleReminder() {
      axios.get(`/reminder/course/${props.match.params.id}`)
        .then(res=>{
          if(res.data.success){
            console.log("Done");
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    }

    // Add an event to frontend
    function handleAdd(data,date) {
      if(!user.student&&!preview){
          const newEvents = JSON.parse(JSON.stringify(events));
          if(newEvents[date]){
            newEvents[date].push(...data);
          }else{
            newEvents[date] = data;
          }
          console.log(newEvents);
          setEvents(newEvents);
          setVideoAlert({show:false,date:null});
          setTestAlert({show:false,date:null});
          setDeliverableAlert({show:false,date:null});
          setEventAlert({show:false,date:null});
      }else{
          alert("Not Allowed");
      }
    }

    // Save the page
    function handleSave(publish) {
      if(!user.student){
        const eventData = Object.keys(events).map(event=>(
            {
            date:event,
            items:events[event].map(item=>{
                console.log(item);
                if(item.video){
                return {video:item.video._id}
                }else if(item.deliverable){
                return {deliverable:item.deliverable._id}
                }else if(item.test){
                return {test:item.test._id}
                }else{
                    return {event:item.event._id}
                }
            })
            }

        ))
        const {title,status,instructions} = course;
        const newCourse = {title,status,instructions,events:eventData,startMonth:startingMonth,endMonth:endingMonth};
        console.log(newCourse);
        axios.put(`/course/${props.match.params.id}`,{course:newCourse})
        .then(res=>{
            console.log(res.data.success);
            if(res.data.success){
            console.log("Saved");
            setSaveAlert(true);
            if(publish){
                props.history.push(`/publish/course/${props.match.params.id}`);
              }else{
                setTimeout(()=>{
                    setSaveAlert(false);
                },2000)
              }
            }else{
            console.log(res.data.msg);
            }
        })
        .catch(err=>{
            console.log(err.message);
        })
      }else{
          alert("Not Allowed");
      }
    }

    // To edit the details of an event
    function handleSaveEvent(type,date,index) {
      // Save deliverable
      console.log(type,date,index);
      if(type=="deliverable"){

        axios.put('/course/deliverables/dateChange',{deliverables:[events[date][index][type]._id],date:events[date][index][type].dueDate})
        .then(res=>{
          if(res.data.success){
              setEventModal({...eventModal,show:false});
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })

      }else if(type=="test"){

        axios.put('/course/test/dateChange',{tests:[events[date][index][type]._id],startTime:events[date][index][type].startTime,endTime:events[date][index][type].endTime})
        .then(res=>{
          if(res.data.success){
              setEventModal({...eventModal,show:false});
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })

      }else if(type=="event"){
        axios.put(`/gevent/${events[date][index][type]._id}`,{event:events[date][index][type]})
        .then(res=>{
          if(res.data.success){
              setEventModal({...eventModal,show:false});
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
      }else{
        setEventModal({...eventModal,show:false});
      }
    }

    function handleDelEvent(type,date,index) {
      console.log(type,date,index);
      const copyEv = {...events};
      copyEv[date].splice(index,1);
      setEventModal({...eventModal,show:false})
      setEvents(copyEv);
      handleSave();
    }

    return (
        <React.Fragment>

            {showUpcomingAlert?
                <Alert cancel={()=>setShowUpcomingAlert(false)} >
                    <h2> Upcoming Events</h2>
                    <UpcomingEvent events={events} />
                </Alert>
            :null}

            {showDeliverableAlert.show?
                <Alert cancel={()=>setShowDeliverableAlert({show:false,deliverable:null})} >
                    <Deliverable deliverable={showDeliverableAlert.deliverable} />
                </Alert>
            :null}
            {eventModal.show?
                <Alert cancel={()=>setEventModal({show:false,type:null,index:null,date:null})}>
                    <h2>{events[eventModal.date][eventModal.index][eventModal.type].title}</h2>
                    {eventModal.type=="deliverable"?
                        <div className="mx-3 p-3" >
                            <b>Due Date</b><br/>
                            <div className="form-group input-group ml-4 mt-2">
                                <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-calendar" ></i></div>
                                <input
                                    className="form-control" type="date"
                                    value={events[eventModal.date][eventModal.index][eventModal.type].dueDate?events[eventModal.date][eventModal.index][eventModal.type].dueDate.substr(0,10):""}
                                    onChange={(e)=>{const copyEv={...events}; copyEv[eventModal.date][eventModal.index][eventModal.type].dueDate=e.target.value; setEvents(copyEv);}}
                                    readOnly={user.student||preview}
                                />
                            </div>

                        </div>
                    :eventModal.type == "test"?
                        <div className="row justify-content-center">
                            <div className="col-8 text-left row">
                                <div className="col-md-6 mb-2" >
                                    <b>Start Time: </b><br/>
                                    <div className="form-group input-group ">
                                        <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-clock" ></i></div>
                                        <input className="form-control" type="time"  readOnly={user.student||preview} value={events[eventModal.date][eventModal.index][eventModal.type].startTime} onChange={(e)=>{const copyEv={...events}; copyEv[eventModal.date][eventModal.index][eventModal.type].startTime=e.target.value; setEvents(copyEv);}}/>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-2" >
                                    <b>End Time: </b><br/>
                                    <div className="form-group input-group ">
                                        <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-clock" ></i></div>
                                        <input className="form-control" type="time" readOnly={user.student||preview} value={events[eventModal.date][eventModal.index][eventModal.type].endTime} onChange={(e)=>{const copyEv={...events}; copyEv[eventModal.date][eventModal.index][eventModal.type].endTime=e.target.value; setEvents(copyEv);}}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    :eventModal.type == "event"?
                        <div className="row">
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-9">
                                <div className="form-group input-group px-lg-4">
                                    <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-pencil" ></i></div>
                                    <input type="text" className="form-control"  value={events[eventModal.date][eventModal.index][eventModal.type].title} placeholder="Enter Course Title" readOnly={user.student||preview} onChange={(e)=>{const copyEv={...events}; copyEv[eventModal.date][eventModal.index][eventModal.type].title=e.target.value; setEvents(copyEv);}} />
                                </div>
                                <div className="form-group input-group px-lg-4">
                                    <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-align-justify" ></i></div>
                                    <textarea rows="3" placeholder="Enter Course Description  " className="form-control" value={events[eventModal.date][eventModal.index][eventModal.type].description} readOnly={user.student||preview} onChange={(e)=>{const copyEv={...events}; copyEv[eventModal.date][eventModal.index][eventModal.type].description=e.target.value; setEvents(copyEv);}} ></textarea>

                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-2" >
                                        <b>Start Time: </b><br/>
                                        <div className="form-group input-group px-lg-2">
                                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 "  ><i className="fa fa-clock" ></i></div>
                                            <input className="form-control" type="time" value={events[eventModal.date][eventModal.index][eventModal.type].startTime} readOnly={user.student||preview} onChange={(e)=>{const copyEv={...events}; copyEv[eventModal.date][eventModal.index][eventModal.type].startTime=e.target.value; setEvents(copyEv);}} />
                                            </div>
                                    </div>
                                    <div className="col-md-6 mb-2" >
                                        <b>End Time: </b><br/>
                                        <div className="form-group input-group ">
                                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-clock" ></i></div>
                                            <input className="form-control" type="time" value={events[eventModal.date][eventModal.index][eventModal.type].endTime} readOnly={user.student||preview} onChange={(e)=>{const copyEv={...events}; copyEv[eventModal.date][eventModal.index][eventModal.type].endTime=e.target.value; setEvents(copyEv);}} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    :null
                    }
                    <div className="mt-2" >
                    {eventModal.type=="deliverable" || eventModal.type=="video"?
                        <button
                            className="btn btn-outline-grad ml-2"
                            onClick={()=>{
                                if(eventModal.type=="deliverable" ){
                                    setShowDeliverableAlert({show:true,deliverable:events[eventModal.date][eventModal.index][eventModal.type]})
                                    setEventModal({show:false,type:null,index:null,date:null});
                                }else{
                                  window.open(events[eventModal.date][eventModal.index][eventModal.type].url?"https://res.cloudinary.com/nischalbharat/video/upload/"+events[eventModal.date][eventModal.index][eventModal.type].url:"", "_blank")
                                }
                            }}>
                            View {eventModal.type=="deliverable"?"Deliverable":" Video" }
                        </button>:null}

                    {!user.student&&!preview?
                        <React.Fragment>
                            <button className="btn btn-outline-grad ml-2" onClick={()=>handleSaveEvent(eventModal.type,eventModal.date,eventModal.index)}> Save Event </button>
                            <button className="btn btn-outline-grad ml-2" onClick={()=>handleDelEvent(eventModal.type,eventModal.date,eventModal.index)}> Delete Event </button>
                        </React.Fragment>
                    :null}

                    </div>
                </Alert>
            :null}

            {!user.student&&!preview?
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
                        <AlertBody date={eventAlert.date} type="event" add={handleAdd} />
                    </Alert>:null}<span style={{fontSize:"16px"}} >( {isNaN(Math.max(0,endingMonth-startingMonth+1))?0:Math.max(0,endingMonth-startingMonth+1)} Months )</span>



                    <div className="container" style={{marginTop:"120px"}} >
                        <div className="d-flex justify-content-between">
                            <h1 className="topicTitle mainH text-left text-pink">{course.status=="Draft"?"Create Course":"View Course"}  <span style={{fontSize:"16px"}} >( {isNaN(Math.max(0,endingMonth-startingMonth+1))?0:Math.max(0,endingMonth-startingMonth+1)} Months )</span></h1>
                            <div>

                                <span className="h3" style={{position:"relative", top:"5px" }} onClick={()=>setPreview(true)} > <i className="fa fa-eye  hover-pink pointer" ></i></span>

                                {course.status=="Draft"?<button className="btn btn-outline-grad ml-2" onClick={()=>handleSave(false)}> Save </button>:null}
                                {course.status=="Draft"?<button className="btn btn-outline-grad ml-2" onClick={()=>handleSave(true)}> Publish </button>:null}
                                {course.status=="Published"?<button className="btn btn-outline-grad ml-2" onClick={handleClose}> Close </button>:null}
                                {course.status=="Published"?<button className="btn btn-outline-grad ml-2" onClick={handleReminder} > Generate Reminder </button>:null}

                            </div>
                        </div>
                        <div className="pl-2 text-left"> <span className="cursor-pointer p-2 pb-4" onClick={()=>props.history.push("/courses")}><i className="fa fa-arrow-left anim-hil text-pink"></i> Go Back</span><br/></div>
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
                                        <option value="-1" > Select Ending Month </option>
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

            :
                <React.Fragment>
                  {user.student?<TopBar/>
                    :<Nav show={true} menu={true}/>}

                    <div className="bgwhiteoverlay"></div>
                    <div className="container" style={{marginTop:"120px"}} >
                        <div className="d-flex justify-content-between">
                            <h1 className="topicTitle mainH text-left text-pink"> {course.title} <span style={{fontSize:"16px"}} >( {endingMonth-startingMonth+1} Months )</span> </h1>
                            <div>
                                {preview?<span className="h3" style={{position:"relative", top:"5px" }} onClick={()=>setPreview(false)} > <i className="fa fa-eye-slash  hover-pink pointer" ></i></span>:null}
                                <button className="btn btn-outline-grad ml-2" onClick={()=>setShowUpcomingAlert(true)} > View Upcoming </button>

                            </div>
                        </div>
                        <div className="pl-2 text-left"> <span className="cursor-pointer p-2 pb-4" onClick={()=>props.history.push("/learner/courses")}><i className="fa fa-arrow-left anim-hil text-pink"></i> Go Back</span><br/></div>
                        <div className="my-2 text-left">
                            <h2> Instructions </h2>
                            <p className="ml-2"> {course.instructions} </p>
                        </div>
                        {calendars}
                    </div>

                </React.Fragment>
            }
        </React.Fragment>
    )
}


export default CreateCourse;
