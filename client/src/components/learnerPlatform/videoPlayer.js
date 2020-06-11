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
          <div style={{borderRadius:"18px",overflow:"hidden"}}>
          <Player fluid={true}  ref={playerRef} aspectRatio={"16:9"}>
            <source src={`http://localhost:8080/video/${props.videoId}/${qlt}`} />
            <ControlBar autoHide={false}>
              <PlaybackRateMenuButton rates={[2, 1, 0.5, 0.1]} />
              <ReplayControl seconds={10} order={2.2} />
              <ForwardControl seconds={10} order={3.2} />
            </ControlBar>
            <BigPlayButton position="center"/>
            <LoadingSpinner/>
          </Player>
          </div>
          <button onClick={()=>handleQualityChange(30)}>Qlt low</button>
          {props.curItemIndex!=0?<button onClick={()=>{props.setCurItem(props.items[props.curItemIndex-1]);props.setCurItemIndex(props.curItemIndex-1)}}>Prev</button>:null}
          {props.curItemIndex!=props.items.length-1?<button onClick={()=>{props.setCurItem(props.items[props.curItemIndex+1]);props.setCurItemIndex(props.curItemIndex+1)}}>Next</button>:null}
        </React.Fragment>
    );
}

export default VideoPlayer;
