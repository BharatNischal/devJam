import React,{useState} from 'react';

function Deliverable(props) {
    const [showItemDescription, setShowItemDescription] = useState(true);
    return (
        <div >
            <h3 className="topicTitle ">Deliverable Title </h3>
            <div className="px-3">
                <div><b>Points: </b> 100 Points</div>
                <div className="mb-3"><b>Due Date: </b> 16, July, 2020 </div>
                
                <b className="showDescText cursor-pointer mb-2" onClick={()=>setShowItemDescription(!showItemDescription)} > 
                    {showItemDescription?"Hide":"Show"} Deliverable Description <i className={showItemDescription?"fa fa-arrow-down rotate arrowIcon ":"fa fa-arrow-down arrowIcon"}></i> 
                </b>
                <p className={showItemDescription?"showDescription description":"px-3 description"}>
                    
                    Lorem Ipsum Hello how are you....Lorem Ipsum Hello how are you....
                    Lorem Ipsum Hello how are you....Lorem Ipsum Hello how are you....
                    Lorem Ipsum Hello how are you....Lorem Ipsum Hello how are you....
                    Lorem Ipsum Hello how are you....Lorem Ipsum Hello how are you....
                </p>
                <div className="row my-5" >
                        <div className="col-lg-3 col-md-2"></div>
                        
                        <div className="col-lg-6 col-md-8">
                            <div style={{borderRadius:"18px"}} className="shadow p-3">
                                <h4 className="text-center text-pink mb-3"> Submit Work </h4>
                                
                                <div className="mb-2"><b>Upload Zip File</b> </div>
                                <input type="file" ></input>

                                <button className="mt-3 btn btn-outline-grad btn-block"> Submit  </button>

                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2"></div>
                        <div className="col-lg-3 col-md-2"></div>
                        
                        <div className="col-lg-6 col-md-8 mt-5">
                            <div style={{borderRadius:"18px"}} className="shadow p-3">
                                <h5 className="text-center text-pink mb-3"> Private Comments </h5>
                                <div style={{borderBottom:"2px solid pink"}} className="mt-3">
                                    <input type="text" style={{background:"none",outline:"none",border:"none",width:"88%"}} placeholder="Enter Comment"></input>
                                    <i className="fa fa-send text-pink"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-2"></div>
                </div>
            </div>
        </div>
    )
}

export default Deliverable;

