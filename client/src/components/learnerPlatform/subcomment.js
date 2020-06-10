import React,{useState} from "react";


const SubComment = (props)=>{

  const [commentMsg,setCommentMsg] = useState("");
  const comment = props.comment;

  return (
    <div className="row">
        <div className="col-2 profile-pic"><img src={comment.author.profilePic} className="rounded-circle" style={{maxHeight:"35px",width:"auto"}} /></div>
        <div className="col-10">
          <h6 className="text-left">{comment.author.username}<span className="ml-2" style={{fontSize:"0.8em"}}>10 july</span></h6>
          <p className="text-left" style={{lineHeight:"100%"}}>{comment.text}</p>
          <form onSubmit={(e)=>{e.preventDefault();props.handleAdd(commentMsg,props.mainCommentId);setCommentMsg("")}}>
            <div className="row">
              <div className="col-2 profile-pic"><img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png" className="rounded-circle" style={{maxHeight:"25px",width:"auto"}}/></div>
              <div className="col-10">
                <input type="text" placeholder="Reply to this thread" value={commentMsg} onChange={(e)=>{setCommentMsg(e.target.value)}} className="w-100" style={{border:"none",borderBottom:"2px solid black",background:"inherent",outline:"none"}}/>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
}

export default SubComment;
