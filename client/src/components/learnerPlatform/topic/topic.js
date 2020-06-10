import React,{useState} from "react";
import TopBar from "../TopBar";
import "./topic.css";
import VideoPlayer from "../videoPlayer";
import placeholder from "../../content/emptyTopic.png";
import Playlist from "./playlist";
import Deliverable from "./deliverable";
import Comment from "../comment";

const Topic =(props)=>{

    const [showTopicDescription, setShowTopicDescription] = useState(false);
    const [showItemDescription, setShowItemDescription] = useState(true);

    return (
        <React.Fragment>
            <TopBar/>
            <div className="bgwhiteoverlay"></div>
            <div className="container text-left" style={{marginTop:"100px"}}>
                
                <div className="row  " style={{position:"relative"}}>
                    <div className="col-12">
                        <h2 className="topicTitle mainH text-left text-pink"> Topic Title </h2>
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
                    <div className="col-lg-8  mt-4">
                        {/* <Deliverable/> */}
                        <div className="m-3 p-1 " style={{borderRadius:"18px",border:"1px solid #e1e1e1",overflow:"hidden"}}>
                                <VideoPlayer ></VideoPlayer>
                        </div>

                        <div className="ml-3">
                            <h3 className="topicTitle px-3 text-pink ">Topic Title </h3>
                            <div className="px-3">
                                
                                <b className="showDescText cursor-pointer mb-2" onClick={()=>setShowItemDescription(!showItemDescription)} > 
                                    {showItemDescription?"Hide":"Show"} Video Description <i className={showItemDescription?"fa fa-arrow-down rotate arrowIcon ":"fa fa-arrow-down arrowIcon"}></i> 
                                </b>
                                <p className={showItemDescription?"showDescription description":"px-3 description"}>
                                    
                                    Lorem Ipsum Hello how are you....Lorem Ipsum Hello how are you....
                                    Lorem Ipsum Hello how are you....Lorem Ipsum Hello how are you....
                                    Lorem Ipsum Hello how are you....Lorem Ipsum Hello how are you....
                                    Lorem Ipsum Hello how are you....Lorem Ipsum Hello how are you....
                                </p>     
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-lg-4 p-2" >
                        <Playlist/>
                    </div>
                    
                </div>

            </div>
        </React.Fragment>
    )
};

export default Topic;