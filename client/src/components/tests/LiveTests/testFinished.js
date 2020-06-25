import React from 'react';
import completed from "./completed.png";
import { Link } from "react-router-dom";

function TestFinished(props) {
    return (
        <div>
            <div style={{padding:"8px"}} className="bg-grad d-inline-block rounded-circle mt-5 shadow" > 
                <img src={completed} style={{width:"140px"}} /> 
            </div>
            <h2 className="mainH topicTitle text-pink mt-3"> Test Finished</h2>
            <p className="mt-2" style={{maxWidth:"400px",display:"inline-block"}}> 
                You reached this screen because You  either Clicked Finish Button or You Ran Out Of Time.
            </p>
            <div>
                <Link to="/studDash" className="btn btn-outline-grad"> Go To Home </Link>
            </div>
        </div>
    )
}



export default TestFinished;

