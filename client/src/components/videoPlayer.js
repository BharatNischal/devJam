import React,{useState,useEffect,useRef} from "react";
import { Player, ControlBar,BigPlayButton, LoadingSpinner,ReplayControl,ForwardControl,PlaybackRateMenuButton } from 'video-react';
import axios from "axios";

const VideoPlayer = (props)=>{

    // Control the quality of video
    const [qlt,setQlt] = useState(70);
    const [timeWatched,setTimeWatched] = useState(0);
    // Used to authorize a video to user for a small window
    const [authorize,setAuthorize] = useState(false);
    const playerRef = useRef(null);
    // Authorize user to access a video for a small window (To avoid downloading)
    useEffect(()=>{
      axios.post('/video/access')
        .then(res=>{
          if(res.data.success){
            setAuthorize(true);
            // playerRef.current.getState().player.play();
            console.log(playerRef.current.getState());
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    },[])

    useEffect(()=>{
      const time = playerRef.current.getState().player.currentTime;
      setAuthorize(false);
      console.log("called",qlt);
      setTimeWatched(playerRef.current.getState().player.currentTime);
      console.log(playerRef.current.getState().player.currentTime);
      axios.post('/video/access')
        .then(res=>{
          if(res.data.success){
            setAuthorize(true);
            playerRef.current.load(`/video/${props.videoId}/${qlt}`);
            console.log(time,"sec");
            playerRef.current.forward(time);
            // playerRef.current.play();
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    },[qlt])

    return (
        <div style={{height:"60%"}}>
          <Player fluid={false} height={300} width={600} ref={playerRef}>
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
        </div>
    );
}

export default VideoPlayer;
