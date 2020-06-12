import React from 'react';

function PlaylistItem(props) {

  let url="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg";
  if(props.isVideo){
      const ind = props.item.video.url.lastIndexOf(".");
      url = "http://localhost:8080/video/"+ props.item.video.url.substr(0,ind)+".jpg/100";
  }

    return (
        <div className={props.active?"pl-2 pr-0 mb-2 w-100 py-2 playlistItemWrapper active":"pl-2 pr-0 mb-2 w-100 py-2 playlistItemWrapper"} onClick={()=>{props.setCurItemIndex(props.count-1);props.handleChangeCurItem(props.count-1)}}>
            <div> {props.count}&nbsp; </div>

            <div className="row ml-0 mr-0">
            <div className="col-5 p-0 playlistThumbnailWrapper" >
                <img src={url} alt="thumbnail" className="responsive-img" />
                {props.isVideo?(<div className="time"> {props.item.video.duration} </div>):null}
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
