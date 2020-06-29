import React, { useState } from 'react';

function DateEl(props) {
    const [showOptions,setShowOption] =useState(false);

    const thisDate=`${props.date}-${props.month}-${new Date().getFullYear()}`;
    return (
        <div className="border date p-2">
            <div><b>{props.date.substr(8,2)}</b></div>
            {props.data?
               props.data.map((d,i)=>(
                   <React.Fragment key={i} >
                   {d.deliverable?
                        <div className="deliverable pill p-1" onClick={()=>props.setEventModal({show:true,date:props.date,type:"deliverable",index:i})}>
                            {d.deliverable.title}...
                        </div>
                     :
                     d.test?
                        <div className="test pill p-1" onClick={()=>props.setEventModal({show:true,date:props.date,type:"test",index:i})}>
                            {d.test.title}...
                        </div>
                    :d.video?
                        <div className="video pill p-1" onClick={()=>props.setEventModal({show:true,date:props.date,type:"video",index:i})}>
                            {d.video.title}...
                        </div> 
                    :
                        <div className="event pill p-1" onClick={()=>props.setEventModal({show:true,date:props.date,type:"event",index:i})} >
                            {d.event.title}...
                        </div>   
                    }
                   </React.Fragment>
               )) 
            :null}
          




            <span className="dots hover-pink" onClick={()=>setShowOption(true)}> <i className="fa fa-ellipsis-v "></i> </span>

            {showOptions?
                <React.Fragment>
                    <div className="d-backdrop" onClick={()=>setShowOption(false)}></div>
                    <div className="optionDiv">
                        <div className="opt hover-pink pointer" onClick={()=>{setShowOption(false);props.setVideoAlert({show:true,date:props.date});}} >Add Video</div>
                        <div className="opt hover-pink pointer" onClick={()=>{setShowOption(false);props.setTestAlert({show:true,date:props.date});}} >Add Test</div>
                        <div className="opt hover-pink pointer" onClick={()=>{setShowOption(false);props.setDeliverableAlert({show:true,date:props.date});}} >Add Deliverable</div>
                        <div className="opt hover-pink pointer" onClick={()=>{setShowOption(false);props.setEventAlert({show:true,date:props.date});}} >Add Events</div>
                    </div>
                </React.Fragment>
            :null}
        </div>
    )
}

export default DateEl;

