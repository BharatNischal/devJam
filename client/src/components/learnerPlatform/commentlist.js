import React,{useState,useEffect,useContext} from "react";
import Comment from "./comment";
import axios from "axios";
import {CurUserContext} from "../../contexts/curUser";
import "./topic/topic.css";

const CommentList = (props)=>{

    // To get the profilePic of current user
    const {user} = useContext(CurUserContext);
    // State to store input field for reply
    const [comments,setComments] = useState([]);

    // Used for main comment on video/deliverable
    const [commentMsg,setCommentMsg] = useState("");

    // Initialize all comments
    useEffect(()=>{
      axios.get(`/${props.type}/${props.itemId}/getComments`)
      .then(res=>{
        setComments(res.data.comments);
      })
      .catch(err=>{
        console.log(err);
      })

    },[])
    useEffect(()=>{
      axios.get(`/${props.type}/${props.itemId}/getComments`)
      .then(res=>{
        setComments(res.data.comments);
      })
      .catch(err=>{
        console.log(err);
      })

    },[props.itemId]);

    // Handles Main Comment
    const handleComment = (e)=>{
      e.preventDefault();
      axios.post(`/${props.type}/${props.itemId}/new`,{text:commentMsg})
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
