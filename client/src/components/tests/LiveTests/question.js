import React from 'react';
import "./liveTest.css";
import placeholder from "../Placeholder.png";
import MCQ from './mcq';
import Paragraph from './paragraph';
import MGrid from './mGrid';

function Question(props) {
    return (
       <React.Fragment>
           <div className="d-flex justify-content-between">
               <h1 className="timer">23:22</h1>
               <div> <button className="btn btn-outline-grad"> Finish </button></div>
           </div>
           <hr/>
           <div className="progress" style={{height:"15px",backgroundColor:"#dabec2"}}>
                <div className="progress-bar progress-bar-striped bgd-gradient" style={{width:`50%`}} role="progressbar"  aria-valuenow="" aria-valuemin="0" aria-valuemax="100"></div>
           </div>
           <div className="text-left p-3"> Question <b>23/49</b></div>
            
            {/* <MCQ/> */}
            {/* <Paragraph/> */}
            <MGrid/>
            
            <div className="navigator row mt-5">
                <div className="col-md-4 text-left">
                    <div><span className="onlyind submitted-q" style={{width:"30px",height:"30px",padding:"0"}}> &nbsp; </span> Submitted </div>
                    <div><span className="onlyind not-submitted-q" style={{width:"30px",height:"30px",padding:"0"}}> &nbsp; </span> Not Submitted </div>
                    
                    <h5 className="mt-2" >Filter</h5>
                    <select className="form-control">
                        <option value="all"> All</option>
                        <option value="submitted"> Submitted</option>
                        <option value="notSubmitted"> Not Submitted</option>
                    </select>
                </div>
                <div className="col-md-8 d-flex flex-wrap">
                    <div className="ind submitted-q"> 1 </div>
                    <div className="ind not-submitted-q"> 2 </div>
                    <div className="ind not-submitted-q"> 3 </div>
                    
                    <div className="ind submitted-q"> 3 </div>
                    <div className="ind not-submitted-q"> 4 </div>
                    <div className="ind not-submitted-q"> 5 </div>

                    
                    
                    <div className="ind submitted-q"> 6 </div>
                    <div className="ind not-submitted-q"> 7 </div>
                    <div className="ind not-submitted-q"> 8 </div>

                    
                    <div className="ind submitted-q"> 9 </div>
                    <div className="ind not-submitted-q"> 10 </div>
                    <div className="ind not-submitted-q"> 11 </div>

                    
                    <div className="ind submitted-q"> 12 </div>
                    <div className="ind not-submitted-q"> 13 </div>
                    <div className="ind not-submitted-q"> 14 </div>



                </div>
            </div>
       </React.Fragment>
    )
}


export default Question;

