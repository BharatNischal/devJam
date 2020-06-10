import React from 'react'
import PlaylistItem from './playlistItem'

function Playlist(props) {
    return (
        <div className="playlistWrapper  m-3 p-3">
                            <div><b> Topic Title </b></div>
                            <div className="playlistDiv mt-2 pt-2">
                                <PlaylistItem isVideo={true}/>
                                <PlaylistItem isDeliverable={true}/>
                                
                                <PlaylistItem isVideo={true}/>
                                <PlaylistItem isDeliverable={true}/>
                                
                                <PlaylistItem isVideo={true}/>
                                <PlaylistItem isDeliverable={true}/>
                                
                                <PlaylistItem isVideo={true}/>
                                <PlaylistItem isDeliverable={true}/>
                                
                                <PlaylistItem isVideo={true}/>
                                <PlaylistItem isDeliverable={true}/>
                                
                                <PlaylistItem isVideo={true}/>
                                <PlaylistItem isDeliverable={true}/>
                                
                                <PlaylistItem isVideo={true}/>
                                <PlaylistItem isDeliverable={true}/>
                                
                                <PlaylistItem isVideo={true}/>
                                <PlaylistItem isDeliverable={true}/>
                                
                                <PlaylistItem isVideo={true}/>
                                <PlaylistItem isDeliverable={true}/>
                                
                            </div>
                        </div>
    )
}



export default Playlist

