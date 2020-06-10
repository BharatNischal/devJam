import React,{useState,useEffect} from "react";
import Comment from "./comment";
import axios from "axios";

const CommentList = (props)=>{

    const [comments,setComments] = useState([{_id:1,text:"Hello World",author:{
      profilePic:"https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png",username:"manjot"},
      subComments:[{_id:2,text:"Hello World",author:{profilePic:"https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png",username:"Bharat"}}]
    }]);

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
            const data = {...res.data.comment,author:{username:"username",profilePic:"profilePic"},subComments:[]};
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
          <div className="jumbotron">
            <h4 className="mb-3 text-left">{comments?comments.length:0} Comments</h4>
            <hr/>
                <form className="mb-3" onSubmit={handleComment}>
                  <div className="row">
                    <div className="col-2 profile-pic"><img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png" className="rounded-circle" style={{maxHeight:"50px",width:"auto"}}/></div>
                    <div className="col-10">
                      <input type="text" className="background-inherent w-100" placeholder="Add a public Comment" value={commentMsg} onChange={(e)=>{setCommentMsg(e.target.value)}} style={{border:"none",borderBottom:"2px solid black",backgroundColor:"inherent",outline:"none"}}/>
                    </div>
                  </div>
                </form>
                {(comments && comments.length>0)?
                  comments.slice().reverse().map(comment=>(
                  <Comment comment={comment} key={comment._id} />
                )):null}
          </div>
  );

}

export default CommentList;
