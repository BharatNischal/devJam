import React,{useState} from "react";

const Comment = (props)=>{

    const comments = useState([1,2,3])

  const subComments = comments.map(comment=>(
    <div className="row">
      <div className="col-2 profile-pic"><img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png" className="rounded-circle" style={{maxHeight:"35px",width:"auto"}} /></div>
      <div className="col-10">
        <h6 className="text-left">Bharat Nischal<span className="ml-2" style={{fontSize:"0.8em"}}>10 july</span></h6>
        <p className="text-left" style={{lineHeight:"100%"}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English</p>
      </div>
    </div>
  ))


  return (
          <div className="jumbotron">
            <h4 className="mb-3 text-left">115 Comments</h4>
            <hr/>
                <form className="mb-3">
                  <div className="row">
                    <div className="col-2 profile-pic"><img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png" className="rounded-circle" style={{maxHeight:"50px",width:"auto"}}/></div>
                    <div className="col-10">
                      <input type="text" placeholder="Add a public Comment" className="w-100" style={{border:"none",borderBottom:"2px solid black",background:"inherent",outline:"none"}}/>
                    </div>
                  </div>
                </form>
                <div className="row">
                  <div className="col-2 profile-pic"><img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png" className="rounded-circle" style={{maxHeight:"50px",width:"auto"}}/></div>
                  <div className="col-10">
                    <h6 className="text-left">Bharat Nischal <span className="ml-2" style={{fontSize:"0.8em"}}>10 july</span></h6>
                    <p className="text-left" style={{lineHeight:"100%"}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English</p>
                    {subComments}
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 profile-pic"><img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_turban_sikh-512.png" className="rounded-circle" style={{maxHeight:"50px",width:"auto"}}/></div>
                  <div className="col-10">
                    <h6 className="text-left">Bharat Nischal <span className="ml-2" style={{fontSize:"0.8em"}}>10 july</span></h6>
                    <p className="text-left" style={{lineHeight:"100%"}}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English</p>
                    {subComments}
                  </div>
                </div>
          </div>
  );

}

export default Comment;
