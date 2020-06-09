import React,{useState,useEffect} from "react";
import { Player, ControlBar,BigPlayButton, LoadingSpinner,ReplayControl,ForwardControl,PlaybackRateMenuButton } from 'video-react';
import axios from "axios";

const VideoPlayer = (props)=>{

    // Control the quality of video
    const [qlt,setQlt] = useState(70);
    // Used to authorize a video to user for a small window
    const [authorize,setAuthorize] = useState(false);

    // Authorize user to access a video for a small window (To avoid downloading)
    useEffect(()=>{
      axios.post('/video/access')
        .then(res=>{
          if(res.data.success){
            setAuthorize(true);
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    },[])

    useEffect(()=>{
      setAuthorize(false);
      console.log("called",qlt);
      axios.post('/video/access')
        .then(res=>{
          if(res.data.success){
            setAuthorize(true);
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    },[qlt])

    return (
          {authorize}?<div style={{height:"60vh"}}>
          <Player>
            <source src={`/video/${props.videoId}/${qlt}`} />
            <ControlBar autoHide={false}>
              <PlaybackRateMenuButton rates={[2, 1, 0.5, 0.1]} />
              <ReplayControl seconds={10} order={2.2} />
              <ForwardControl seconds={10} order={3.2} />
            </ControlBar>
            <BigPlayButton position="center" />
            <LoadingSpinner/>
          </Player>
          <button onClick={()=>setQlt(30)}>Qlt low</button>
          </div>:<div></div>
    );
}

export default VideoPlayer;
