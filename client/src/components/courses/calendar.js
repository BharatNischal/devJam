import React from 'react';

function Calendar(props) {


    const days=[];
    for(let i=1;i<=35;i++){
        if(i<props.start){
            days.push((<div className="border p-2 disabled"> <b>{props.lastEnd-props.start+i+1 }</b> </div>))
        }else if(i<props.start+props.end){
            days.push((<div className="border p-2 "> <b>{i-props.start+1}</b> </div>))
        }else{
            days.push((<div className="border p-2 disabled"> <b>{i-props.start-props.end+1}</b> </div>))
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

