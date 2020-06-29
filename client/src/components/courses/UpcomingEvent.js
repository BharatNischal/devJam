import React from 'react';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
const dayMap={0:"Sunday",1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday"};


function UpcomingEvent(props) {

    const elements=[];
    var today=new Date();
    today.setDate(today.getDate()+1);
    for(let i=0;i<7;i++){
        console.log(formatDate(today),props.events[formatDate(today)]);
        elements.push((
            <div className="text-left mt-2 pl-3"  key={i}>
            <h5><b> {dayMap[today.getDay()]} </b></h5>
            <div className="d-flex ml-2 date" style={{flexWrap:"wrap"}} >
            {props.events[formatDate(today)]?
               props.events[formatDate(today)].map((d,i)=>(
                   <React.Fragment key={i} >
                   {d.deliverable?
                        <div className="deliverable pill p-2" style={{fontSize:"15px", borderRadius:"16px"}}>
                            {d.deliverable.dueDate?`${d.deliverable.dueDate.substr(8,2)}-${d.deliverable.dueDate.substr(5,2)}`:null} {d.deliverable.title}
                        </div>
                     :
                     d.test?
                        <div className="test pill p-2"  style={{fontSize:"15px", borderRadius:"16px"}}>
                            {d.test.startTime} {d.test.title}
                        </div>
                    :d.video?
                        <div className="video pill p-2"  style={{fontSize:"15px", borderRadius:"16px"}}>
                            {d.video.title}
                        </div> 
                    :
                        <div className="event pill p-2"  style={{fontSize:"15px", borderRadius:"16px"}}>
                            {d.event.startTime} {d.event.title}
                        </div>   
                    }
                   </React.Fragment>
               )) 
            :null}
                     
            </div>
            </div >
        ));
        today.setDate(today.getDate()+1);
    }

    return (
        <React.Fragment>
            {elements}
        </React.Fragment>
    )
}


export default UpcomingEvent;

