import React from 'react';
import TopBar from "../../learnerPlatform/TopBar";
import "./liveTest.css";
import StartPage from './startPage';


function LiveTest(props) {
    return (
        <React.Fragment>
            <TopBar/>
            <div className="bgwhiteoverlay"></div>
            
                <div className="frame p-4">
                    <StartPage/>
                </div>
            
        </React.Fragment>
    )
}



export default LiveTest

