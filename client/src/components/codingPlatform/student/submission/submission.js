import React from 'react';
import Row from './row';

function Submission(props) {
    return (
        <div className="p-3" >
            <h3 className="mb-3" ><b> Your Submissions </b></h3>
            <div className="p-3">
                <div className="row py-2" style={{boxShadow:"0px 4px 8px rgba(0,0,0,0.5)"}} >
                    <div className="col-1"> <b>Sr. No.</b> </div>
                    <div className="col-4"> <b>Language</b> </div>
                    <div className="col-4"> <b>Points</b>  </div>
                    <div className="col-3"> </div>
                </div>
                <Row/>
                <Row index={2} language={"python"} points={30} code={`print("Hello World")`} />
                <Row/>
                <Row/>
                <Row/>
                
            </div>
        </div>
    )
}

export default Submission;