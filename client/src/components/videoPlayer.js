import React,{useState,useEffect,useRef} from "react";
import { Player, ControlBar,BigPlayButton, LoadingSpinner,ReplayControl,ForwardControl,PlaybackRateMenuButton } from 'video-react';
import axios from "axios";

const VideoPlayer = (props)=>{

    // Control the quality of video
    const [qlt,setQlt] = useState(70);
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
    useEffect(()=>{
      const time = playerRef.current.getState().player.currentTime;  //video time of already watched content
      axios.post('/video/access')
        .then(res=>{
          if(res.data.success){
            playerRef.current.load(`/video/${props.videoId}/${qlt}`); //New Quality Video
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
    },[qlt])

    return (
        <React.Fragment>
          <Player fluid={false} height={300} width={600} ref={playerRef}>
            <source src={`/video/${props.videoId}/${qlt}`} />
            <ControlBar autoHide={false}>
              <PlaybackRateMenuButton rates={[2, 1, 0.5, 0.1]} />
              <ReplayControl seconds={10} order={2.2} />
              <ForwardControl seconds={10} order={3.2} />
            </ControlBar>
            <BigPlayButton position="center"/>
            <LoadingSpinner/>
          </Player>
          <button onClick={()=>setQlt(30)}>Qlt low</button>
        </React.Fragment>
    );
}

export default VideoPlayer;
