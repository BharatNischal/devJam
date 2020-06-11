import React from 'react';

function PlaylistItem(props) {
    return (
        <div className=" pl-2 pr-0 mb-2 w-100 py-2 playlistItemWrapper" onClick={()=>{props.setCurItemIndex(props.count-1);props.handleChangeCurItem(props.count-1)}}>

            <div> {props.count}&nbsp; </div>

            <div className="row ml-0 mr-0">
            <div className="col-5 p-0 playlistThumbnailWrapper" >
                <img src={props.isVideo?"":"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"} alt="thumbnail" className="responsive-img" />
                {props.isVideo?(<div className="time"> 04:03 </div>):null}
            </div>
            <div className="col-7 pl-2 pr-2">
                <div className="playlist-title"> {props.isVideo?props.item.video.title:props.item.deliverable.title}</div>
                {!props.isVideo?(<b>Points: {props.item.deliverable.points}</b>):null}
            </div>

            </div>


        </div>
    )
};



export default PlaylistItem;
