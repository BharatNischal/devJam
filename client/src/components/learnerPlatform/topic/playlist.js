import React,{useEffect,useState} from 'react';
import PlaylistItem from './playlistItem';
import axios from "axios";
import Skeleton from 'react-loading-skeleton';


function Playlist(props) {

    const [mounted,setMounted] = useState(false);

    useEffect(()=>{
      axios.post('/video/access')
        .then(res=>{
          if(res.data.success){
            setMounted(true);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    },[]);

    return (
        <React.Fragment>
          {mounted?
            <div className="playlistWrapper  m-3 p-3">
                <div><b> {props.topic.title?props.topic.title.length>40?props.topic.title.substr(0,36)+"...":props.topic.title:<Skeleton/>} </b></div>
                <div className="playlistDiv mt-2 pt-2">
                  {props.items.map((item,count)=>(
                      <PlaylistItem isVideo={item.video?true:false} item={item} count={count+1} handleChangeCurItem={props.handleChangeCurItem} active={props.curItemIndex==count} setCurItemIndex={props.setCurItemIndex}/>
                  ))}
                  {props.items.length==0?<Skeleton height={80} count={3}/>:null}
                </div>
            </div>:null}
        </React.Fragment>
    )
}



export default Playlist
