import React from 'react';

function PlaylistItem(props) {
    return (
        <div className=" pl-2 pr-0 mb-2 w-100 py-2 playlistItemWrapper" >
                                
            <div> 1.&nbsp; </div>

            <div className="row ml-0 mr-0">
            <div className="col-5 p-0 playlistThumbnailWrapper" >
                <img src={"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"} alt="thumbnail" className="responsive-img" />
                {props.isVideo?(<div className="time"> 04:03 </div>):null}
            </div>
            <div className="col-7 pl-2 pr-2">
                <div className="playlist-title"> Video Title Will Go here</div>
                {props.isDeliverable?(<b>Points: 100</b>):null}
            </div>

            </div>
        

        </div>
    )
};



export default PlaylistItem;

