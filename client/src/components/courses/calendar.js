import React from 'react';
import DateEl from "./date";

function Calendar(props) {


    const days=[];
    var start=props.start==0?7:props.start;
    var dd="";
    var mm="",date="";
    for(let i=1;i<=42;i++){
        if(i<start){
            days.push((<div className="border date p-2 disabled"> <b>{props.lastEnd-start+i+1 }</b> </div>))
        }else if(i<start+props.end){
            dd="0"+(i-start+1);
            dd=dd.slice(dd.length-2);
            mm="0"+props.month;
            mm=mm.slice(mm.length-2);

            date=`${new Date().getFullYear()}-${mm}-${dd}`;
            
            days.push((<DateEl date={date} setVideoAlert={props.setVideoAlert} month={props.month} setDeliverableAlert={props.setDeliverableAlert} setEventAlert={props.setEventAlert} setTestAlert={props.setTestAlert} data={props.events[date]} setEventModal={props.setEventModal} ></DateEl>));
        }else{
            days.push((<div className="border date p-2 disabled"> <b>{i-start-props.end+1}</b> </div>))
        }
       
    }
    return (
        <div className="calendar-grid">
            <div className="cal-header border"> Monday </div>
            <div className="cal-header border"> Tuesday </div>
            <div className="cal-header border"> Wednesday </div>
            <div className="cal-header border"> Thursday </div>
            <div className="cal-header border"> Friday </div>
            <div className="cal-header border"> Saturday </div>
            <div className="cal-header border"> Sunday </div>
            
            {days}
        </div>
    )
}



export default Calendar;

