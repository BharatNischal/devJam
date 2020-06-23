import React from 'react';

function StartPage(props) {
    return (
        <React.Fragment>
            <h1 className="text-center text-pink" style={{fontSize:"36px"}}> {props.title} </h1>
            <div className="mt-3 text-left">
                <p className="mb-2">You have been invited to take an assessment. </p>
                <p className="mb-2">This gives you an opportunity to demonstrate your abilities in a fair and objective way.</p>
                <p className="mb-2">You will be awarded one point for each correct answer and no points will be deducted for incorrect answers. Once all questions are submitted, the test will be complete. </p>
            </div>
            <div className="mt-3 text-left">
                <h2 className="topicTitle mainH"> Instructions</h2>
                <p>{props.instruction} </p>

            </div>
            <div className="mt-3 text-left">
            <h2 className="topicTitle mainH"> Duration </h2>

               {props.duration?<p>This test will have a countdown timer. You will have <b>{props.duration} minutes </b> to complete this assessment. Please ensure that you have a stable internet connection. Once you start a test your timer will be tracked. If you leave the page and join again, the timer will start from time left according to your start time. Ensure you are in a conducive work environment. </p>
                :<p>You can do this test at your own pace. No timer is present for this test.</p>}
            </div>
            <div className="my-3">
                <button className="btn btn-outline-grad"> Start Test </button>
            </div>
        </React.Fragment>
    )
}



export default StartPage;

