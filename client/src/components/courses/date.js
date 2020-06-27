import React, { useState } from 'react';

function DateEl(props) {
    const [showOptions,setShowOption] =useState(false);

    const thisDate=`${props.date}-${props.month}-${new Date().getFullYear()}`;
    return (
        <div className="border date p-2">
            <div><b>{props.date}</b></div>
            <div className="event pill p-1">
                Event Name Hello.....
            </div>
            <div className="deliverable pill p-1">
                Event Name Hello.....
            </div>
            <div className="test pill p-1">
                Event Name Hello.....
            </div>
            <div className="video pill p-1">
                Event Name Hello.....
            </div>




            <span className="dots hover-pink" onClick={()=>setShowOption(true)}> <i className="fa fa-ellipsis-v "></i> </span>

            {showOptions?
                <React.Fragment>
                    <div className="d-backdrop" onClick={()=>setShowOption(false)}></div>
                    <div className="optionDiv">
                        <div className="opt hover-pink pointer" onClick={()=>{setShowOption(false);props.setVideoAlert({show:true,date:thisDate});}} >Add Video</div>
                        <div className="opt hover-pink pointer" onClick={()=>{setShowOption(false);props.setTestAlert({show:true,date:thisDate});}} >Add Test</div>
                        <div className="opt hover-pink pointer" onClick={()=>{setShowOption(false);props.setDeliverableAlert({show:true,date:thisDate});}} >Add Deliverable</div>
                        <div className="opt hover-pink pointer" onClick={()=>{setShowOption(false);props.setEventAlert({show:true,date:thisDate});}} >Add Events</div>
                    </div>
                </React.Fragment>
            :null}
        </div>
    )
}

export default DateEl;

