import React,{useState,useEffect,useContext} from "react";
import TopBar from "../TopBar";
import "./topic.css";
import VideoPlayer from "../videoPlayer";
import placeholder from "../../content/emptyTopic.png";
import Playlist from "./playlist";
import Deliverable from "./deliverable";
import Comments from "../commentlist";
import {CurUserContext} from "../../../contexts/curUser"
import axios from "axios";

const Topic =(props)=>{

    const [showTopicDescription, setShowTopicDescription] = useState(false);
    const [showItemDescription, setShowItemDescription] = useState(true);
    const [topic,setTopic] = useState({title:"",description:""})
    const [curItem,setCurItem] = useState(null);
    const [curItemIndex,setCurItemIndex] = useState(0);
    const [items,setItems] = useState([]);
    const {user} = useContext(CurUserContext);

    const handleChangeCurItem = (ind)=>{
      setCurItem(items[ind]);
      console.log(items[ind]);
    }

    useEffect(()=>{
      // Frontend authorization
      if(!user.loggedIn)
        props.history.push("/login");

      axios.get(`/content/topic/${props.match.params.topicId}`)
        .then(res=>{
            if(res.data.success){
              setItems(res.data.data.items);
              setTopic({title:res.data.data.title,description:res.data.data.description});
              if(res.data.data.items.length>0){
                setCurItem(res.data.data.items[0])
                console.log(res.data.data.items[0]);
              }
            }else{
                console.log(res.data.msg);
            }
        })
        .catch(err=>{
            console.log(err.message);
        })
    },[])

    return (
        <React.Fragment>
            <TopBar/>
            <div className="bgwhiteoverlay"></div>
            <div className="container text-left" style={{marginTop:"100px"}}>

                <div className="row  " style={{position:"relative"}}>
                    <div className="col-12">
                        <h2 className="topicTitle mainH text-left text-pink"> {topic.title} </h2>
                        <span className="cursor-pointer p-2 pb-4" onClick={()=>props.history.push("/studDash")}><i className="fa fa-arrow-left "></i> Go Back</span><br/>
                        <b className="showDescText cursor-pointer px-2" onClick={()=>setShowTopicDescription(!showTopicDescription)} >
                            {showTopicDescription?"Hide":"Show"} Description <i className={showTopicDescription?"fa fa-arrow-down rotate arrowIcon ":"fa fa-arrow-down arrowIcon"}></i>
                        </b>
                        <p className={showTopicDescription?"px-2 showDescription description":"px-2 description"}>{topic.description}</p>
                    </div>
                    <div className="col-lg-8  mt-4">
                    {curItem?
                           (curItem && curItem.video)?<React.Fragment>
                           <div className="m-3 p-1 " style={{borderRadius:"18px",border:"1px solid #e1e1e1",overflow:"hidden"}}>
                                   <VideoPlayer items={items} setCurItem={setCurItem} curItemIndex={curItemIndex} setCurItemIndex={setCurItemIndex} videoId={items[curItemIndex].video.url}/>
                           </div>
                            <div className="ml-3">
                                <h3 className="topicTitle px-3 text-pink ">{curItem.video.title} </h3>
                                <div className="px-3">
    
                                    <b className="showDescText cursor-pointer mb-2" onClick={()=>setShowItemDescription(!showItemDescription)} >
                                        {showItemDescription?"Hide":"Show"} Video Description <i className={showItemDescription?"fa fa-arrow-down rotate arrowIcon ":"fa fa-arrow-down arrowIcon"}></i>
                                    </b>
                                    <p className={showItemDescription?"showDescription description":"px-3 description"}>{curItem.video.description}</p>
                                </div>
                            </div>
                        </React.Fragment>:<Deliverable deliverable={curItem?curItem.deliverable:null}/> 
                    :null}
                    
                    </div>
                    <div className="col-lg-4 p-2" >
                        <Playlist items={items} topic={topic} handleChangeCurItem={handleChangeCurItem} setCurItemIndex={setCurItemIndex}/>
                    </div>
                    <div className="col-12 mt-5">
                        {curItem?
                            <Comments type={curItem.video?"video":"deliverable"} itemId={curItem.video?curItem.video._id:curItem.deliverable._id} comments={curItem.video?curItem.video.comments:curItem.deliverable.comments} />
                        :null
                        }
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
};

export default Topic;
