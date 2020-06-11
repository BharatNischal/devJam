import React,{useState,useEffect,useContext} from "react";
import Comment from "./comment";
import axios from "axios";
import {CurUserContext} from "../../contexts/curUser";
import "./topic/topic.css";

const CommentList = (props)=>{

    const {user} = useContext(CurUserContext);

    const [comments,setComments] = useState([
      {
        _id:1,text:"Hello World",
        author:{
          profilePic:"https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png",username:"manjot"},
          subComments:
          [
            {_id:2,text:"Hello World",author:{profilePic:"https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png",username:"Bharat"}},
            {_id:3,text:"Hello World",author:{profilePic:"https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png",username:"Manjot"}}
          ]
      },
      {
        _id:4,text:"Hello World",
        author:{
          profilePic:"https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png",username:"manjot"},
          subComments:
          [
            {_id:5,text:"Hello World",author:{profilePic:"https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png",username:"Bharat"}},
            {_id:6,text:"Hello World",author:{profilePic:"https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png",username:"Manjot"}}
          ]
      },
      ]);

    // Used for main comment on video/deliverable
    const [commentMsg,setCommentMsg] = useState("");

    // Initialize all comments
    // useEffect(()=>{
    //   setComments(props.comments);
    // },[])

    // Handles Main Comment
    const handleComment = (e)=>{
      e.preventDefault();
      axios.post(`/${props.item.type}/${props.idemId}/new`,{text:commentMsg})
        .then(res=>{
          if(res.data.success){
            const data = {...res.data.comment,author:{username:user.username,profilePic:user.profilePic},subComments:[]};
            const newComments = comments.slice();
            newComments.push(data);
            setComments(newComments);
            setCommentMsg("");
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    }

  return (
          <div className="jumbotron w-100" style={{borderRadius:"18px"}}>
            <h4 className="mb-3 text-left">{comments?comments.length:0} Comments</h4>
            <hr/>
                <form className="mb-3" onSubmit={handleComment}>
                  <div className="row" style={{justifyContent:"center",alignItems:"center"}}>
                    <div className="profile-pic rounded-circle border " style={{height:"50px",width:"50px",overflow:"hidden"}}><img src={user.profilePic} className="rounded-circle responsive-img" /></div>
                    <div className="col-9">
                      <input type="text" className="w-100 comment-inp" placeholder="Add a public Comment " value={commentMsg} onChange={(e)=>{setCommentMsg(e.target.value)}} />
                    </div>
                  </div>
                </form>
                {(comments && comments.length>0)?
                  comments.slice().reverse().map(comment=>(
                  <Comment comment={comment} key={comment._id} user={user}/>
                )):null}
          </div>
  );

}

export default CommentList;
