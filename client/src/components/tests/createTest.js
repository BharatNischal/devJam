import React, { useState } from 'react';
import Nav from '../profile/Nav/Nav';
import Question from './question/question';

function CreateTest(props) {

    //UI STATES
    const [isTimed,setIsTimed] = useState(false);
    
    return (
        <React.Fragment>
            <Nav show={true} menu={true}/>
            <div className="bgwhiteoverlay"></div>
            <div className="container" style={{marginTop:"120px"}} >
                <h1 className="topicTitle mainH text-left text-pink">Create Test  <span style={{fontSize:"16px"}} >(X Questions)</span></h1>  

                <div className="row my-5" >
                    <div className="col-12" >
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-pencil" ></i></div>
                            <input type="text" className="form-control"  placeholder="Enter Test Title" />
                        </div>
                        <div className="form-group input-group px-lg-4">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-align-justify" ></i></div>
                            <textarea rows="5"  placeholder="Enter Test Instructions " className="form-control" ></textarea>
                           
                        </div>
                        <div className="row text-left">
                            <div className="col-md-6  px-lg-5">
                                <div className="custom-control custom-checkbox d-inline" >
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" checked={isTimed} onChange={(e)=> setIsTimed(e.target.checked)} />
                                    <label className="custom-control-label" htmlFor="customCheck1">Timed</label>
                                </div>
                                {isTimed?<input type="number"  value="0" className="form-control d-inline" style={{width:"80px",marginLeft:"10px",height:"25px"}}  ></input>:null}
                            </div>
                            <div className="col-md-6">
                                <div className="custom-control custom-checkbox d-inline" >
                                    <input type="checkbox" className="custom-control-input" id="customCheck2" />
                                    <label className="custom-control-label" htmlFor="customCheck2">Shuffled</label>
                                </div>
                            </div>
                        </div>    
                    </div>

                    <div className="col-12 my-5" >
                        <Question id="1" />
                        <Question id="2" />

                    </div>
                    
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default CreateTest;

