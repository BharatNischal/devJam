import React from 'react'
import PlaylistItem from './playlistItem'

function Playlist(props) {
    return (
        <div className="playlistWrapper  m-3 p-3">
                            <div><b> {props.topic.title.length>40?props.topic.title.substr(0,36)+"...":props.topic.title} </b></div>
                            <div className="playlistDiv mt-2 pt-2">
                              {props.items.map((item,count)=>(
                                  <PlaylistItem isVideo={item.video?true:false} item={item} count={count+1} handleChangeCurItem={props.handleChangeCurItem} setCurItemIndex={props.setCurItemIndex}/>
                              ))}
                            </div>
                        </div>
    )
}



export default Playlist
