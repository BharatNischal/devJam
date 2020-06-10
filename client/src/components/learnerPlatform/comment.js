import React,{useState,useEffect} from "react";
import SubComment from "./subcomment";
import axios from "axios";

const Comment = (props)=>{

  const [subComments, setSubComments] = useState([]);
  const [commentMsg,setCommentMsg] = useState("");
  const comment = props.comment;

  useEffect(()=>{
    setSubComments(comment.subComments);
  },[])

  // Handle subComment
  const handleSubComment = (e)=>{
    e.preventDefault();
    axios.post(`/comment/${comment._id}/new`,{text:commentMsg})
      .then(res=>{
        if(res.data.success){
          const data = {...res.data.comment,author:{username:props.user.username,profilePic:props.user.profilePic},subComments:[]};
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

  const handleAdd = (text,mainCommentId)=>{
    axios.post(`/comment/${mainCommentId}/new`,{text})
      .then(res=>{
        if(res.data.success){
          const data = {...res.data.comment,author:{username:props.user.username,profilePic:props.user.profilePic},subComments:[]};
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
      <div className="row">
        <div className="col-2 profile-pic"><img src={comment.author.profilePic} className="rounded-circle" style={{maxHeight:"50px",width:"auto"}}/></div>
        <div className="col-10">
          <h6 className="text-left">{comment.author.username} <span className="ml-2" style={{fontSize:"0.8em"}}>10 july</span></h6>
          <p className="text-left" style={{lineHeight:"100%"}}>{comment.text}</p>
          <form className="mb-3" onSubmit={handleSubComment}>
            <div className="row">
              <div className="col-2 profile-pic"><img src={props.user.username} className="rounded-circle" style={{maxHeight:"35px",width:"auto"}}/></div>
              <div className="col-10">
                <input type="text" placeholder="Reply to this message" value={commentMsg} onChange={(e)=>{setCommentMsg(e.target.value)}} className="w-100" style={{border:"none",borderBottom:"2px solid black",background:"inherent",outline:"none"}}/>
              </div>
            </div>
          </form>
          {(subComments && subComments.length>0)?
            subComments.slice().reverse().map(subComment=>(
            <SubComment comment={subComment} mainCommentId={comment._id} key={subComment._id} handleAdd={handleAdd} user={props.user}/>
          )):null}
        </div>
      </div>
      );
}

export default Comment;
