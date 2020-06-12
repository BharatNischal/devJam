import React,{useState,useEffect,useRef} from "react";
import { Player, ControlBar,BigPlayButton, LoadingSpinner,ReplayControl,ForwardControl,PlaybackRateMenuButton } from 'video-react';
import axios from "axios";

const VideoPlayer = (props)=>{

    // Control the quality of video
    const [qlt,setQlt] = useState(70);

    // Quality Control Box
    const [showQBox, setShowQBox] = useState(false);
    // Reference of Video Player
    const playerRef = useRef(null);


    // Authorize user to access a video for a small window (To avoid downloading)
    useEffect(()=>{
      axios.post('/video/access')
        .then(res=>{
          if(!res.data.success){
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    },[])

    // Steps to perform on video Quality Change
    const handleQualityChange = (newQlt)=>{
      setQlt(newQlt)
      const time = playerRef.current.getState().player.currentTime;  //video time of already watched content
      axios.post('/video/access')
        .then(res=>{
          if(res.data.success){
            playerRef.current.load(`/video/${props.videoId}/${newQlt}`); //New Quality Video
            window.setTimeout(()=>{
              playerRef.current.forward(time);
              playerRef.current.play();
            },100)
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    }

    useEffect(()=>{
      axios.post('/video/access')
        .then(res=>{
          if(res.data.success){
            setQlt(70);
            playerRef.current.load(`/video/${props.videoId}/${qlt}`);
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    },[props.videoId])

    return (
        <React.Fragment>
          <div style={{borderRadius:"18px",overflow:"hidden",position:"relative"}}>
          {showQBox?
          <div className="qDiv text-center " >
            <div onClick={()=>{handleQualityChange(100);setShowQBox(false)}}>Best</div>
            <div onClick={()=>{handleQualityChange(70);setShowQBox(false)}}>Good</div>
            <div onClick={()=>{handleQualityChange(30);setShowQBox(false)}}>Low</div>
          </div>:null
          }
          <Player fluid={true}  ref={playerRef} aspectRatio={"16:9"}>
            <source src={`/video/${props.videoId}/${qlt}`} />
            <ControlBar autoHide={false}>
              <PlaybackRateMenuButton rates={[2, 1, 0.5, 0.1]} />
              {props.curItemIndex!=0?<a className="video-react-control video-react-button fa fa-arrow-left" onClick={()=>{props.setCurItem(props.items[props.curItemIndex-1]);props.setCurItemIndex(props.curItemIndex-1)}} order={7}></a>:null}
              {props.curItemIndex!=props.items.length-1?<a className="video-react-control video-react-button fa fa-arrow-right" onClick={()=>{props.setCurItem(props.items[props.curItemIndex+1]);props.setCurItemIndex(props.curItemIndex+1)}} order={7} ></a>:null}
              <a className="video-react-control video-react-button fa fa-cog" onClick={()=>setShowQBox(!showQBox)} order={7.2}></a>
            </ControlBar>
            <BigPlayButton position="center"/>
            <LoadingSpinner/>
          </Player>
          </div>
        </React.Fragment>
    );
}

export default VideoPlayer;
