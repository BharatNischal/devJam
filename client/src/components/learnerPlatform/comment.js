import React,{useState,useEffect} from "react";
import SubComment from "./subcomment";
import axios from "axios";

const Comment = (props)=>{

  const [subComments, setSubComments] = useState([]);
  const [commentMsg,setCommentMsg] = useState("");
  const comment = props.comment;

  //UI STATES
  const [showReply,setShowReply]= useState(false);


  useEffect(()=>{
    setSubComments(comment.subComments);
  },[])

  // Handle subComment
  const handleSubComment = (e)=>{
    e.preventDefault();
    axios.post(`/comment/${comment._id}/new`,{text:commentMsg})
      .then(res=>{
        if(res.data.success){
          const data = {...res.data.subComment,author:{username:props.user.username,profilePic:props.user.profilePic},subComments:[]};
          const newSubComments = subComments.slice();
          newSubComments.push(data);
          setSubComments(newSubComments);
          setCommentMsg("");
        }else{
          console.log(res.data.msg);
        }
      })
      .catch(err=>{
        console.log(err.message);
      })
  }

  // Add subcomments to UI
  const handleAdd = (text,mainCommentId)=>{
    axios.post(`/comment/${mainCommentId}/new`,{text})
      .then(res=>{
        if(res.data.success){
          const data = {...res.data.subComment,author:{username:props.user.username,profilePic:props.user.profilePic},subComments:[]};
          const newSubComments = subComments.slice();
          newSubComments.push(data);
          setSubComments(newSubComments);
        }else{
          console.log(res.data.msg);
        }
      })
      .catch(err=>{
        console.log(err.message);
      })
  }

    return(
      <div className="row mt-3" style={{justifyContent:"center"}}>

        <div className="profile-pic rounded-circle border " style={{height:"50px",width:"50px",overflow:"hidden"}}><img src={comment.author.profilePic}  className="rounded-circle  responsive-img" /></div>
        <div className="col-9">
          <h6 className="text-left"><b>{comment.author.username} <span className="ml-2" style={{fontSize:"0.8em"}}>10 july</span></b></h6>
          <div className="text-left" style={{lineHeight:"100%"}}>{comment.text}
            <div className="pt-2  mb-2 pl-2" style={{color:"#666",fontSize:"12px"}}><b onClick={()=>setShowReply(!showReply)} className="cursor-pointer">{showReply?"Cancel":"Reply"}</b></div>
          </div>

          {showReply?
            <form className="mb-3" onSubmit={handleSubComment}>
                  <input type="text" placeholder="Reply to this message" value={commentMsg} onChange={(e)=>{setCommentMsg(e.target.value)}} className="w-100 comment-inp" />
            </form>
            :null
          }
          {(subComments && subComments.length>0)?
            subComments.slice().reverse().map(subComment=>(
            <SubComment comment={subComment} mainCommentId={comment._id} key={subComment._id} handleAdd={handleAdd} user={props.user}/>
          )):null}
        </div>
      </div>
      );
}

export default Comment;
