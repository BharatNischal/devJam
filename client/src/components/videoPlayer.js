import React from "react";
import { Player, ControlBar,BigPlayButton, LoadingSpinner,ReplayControl,ForwardControl,PlaybackRateMenuButton } from 'video-react';

const VideoPlayer = (props)=>{
    return (
          <Player>
            <source src="http://localhost:8080/video/123" />
            <ControlBar autoHide={false}>
              <PlaybackRateMenuButton rates={[2, 1, 0.5, 0.1]} />
              <ReplayControl seconds={10} order={2.2} />
              <ForwardControl seconds={10} order={3.2} />
            </ControlBar>
            <BigPlayButton position="center" />
            <LoadingSpinner/>
          </Player>
    );
}

export default VideoPlayer;
