import React,{useState} from "react";
import TopBar from "../TopBar";
import "./topic.css";
import VideoPlayer from "../../videoPlayer";

const Topic =(props)=>{

    const [showTopicDescription, setShowTopicDescription] = useState(false);

    return (
        <React.Fragment>
            <TopBar/>
            <div className="bgwhiteoverlay"></div>
            <div className="container text-left" style={{marginTop:"100px"}}>
                <div className="row border " style={{position:"relative"}}>
                    <div className="col-12">
                        <h2 className="topicTitle text-grad text-left text-pink"> Topic Title </h2>
                        <b className="showDescText cursor-pointer px-2" onClick={()=>setShowTopicDescription(!showTopicDescription)} > 
                            {showTopicDescription?"Hide":"Show"} Topic Description <i className={showTopicDescription?"fa fa-arrow-down rotate arrowIcon ":"fa fa-arrow-down arrowIcon"}></i> 
                        </b>
                        <p className={showTopicDescription?"px-2 showDescription description":"px-2 description"}>
                            
                            Lorem Ipsum Hello how are you....Lorem Ipsum Hello how are you....
                            Lorem Ipsum Hello how are you....Lorem Ipsum Hello how are you....
                            Lorem Ipsum Hello how are you....Lorem Ipsum Hello how are you....
                            Lorem Ipsum Hello how are you....Lorem Ipsum Hello how are you....
                        </p>
                    </div>
                    <div className="col-lg-8 border p-2">
                        <VideoPlayer></VideoPlayer>
                        
                    </div>
                    <div className="col-lg-4 border p-3" >
                        
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
};

export default Topic;