import React from 'react';
import "../test.css";
import placeholder from "../Placeholder.png";
import MCQ from './mcq/mcq';
import MGrid from './mGrid';
import Paragraph from './paragraph';


function Question(props) {
    return (
        <div className="row my-4">
            <div className="col-10 col-lg-11">
                <div style={{border:"1px solid #c1c1c1",backgroundColor:"#f9f9f9", borderRadius:"18px",padding:"20px"}} >
                    <div className="row p-0 " style={{alignItems:"center"}} >
                        <div className="col-md-7 col-lg-8">
                        <input type="text" placeholder="Enter Question" className="w-100 comment-inp" />
                        </div>
                        <div className="col-md-5 col-lg-4 mt-2 mt-md-0">
                            <span className="pointer hover-pink" style={{fontSize:"24px"}} ><i className="fa fa-image"></i></span>
                            <select className="form-control d-inline ml-2" style={{maxWidth:"200px"}}>
                                <option value="mcq">Multiple Choice</option>
                                <option value="mcg">Multiple Choice Grid</option>
                                <option value="pg">Paragraph</option>
                            </select>
                        </div>

                    </div>
                    <div className="qImg mt-3"  >
                       <span > <img src={placeholder} style={{maxHeight:"200px"}} className="img-fluid" /></span>
                    </div>
                    {props.type=="MCQ"?<MCQ id={props.id} />:null}
                    {props.type=="MGrid"?<MGrid/>:null}
                    {props.type=="Paragraph"? <Paragraph/> :null}
                </div>
            </div>
            <div className="col-2 col-lg-1 px-2">
                  <div className="round py-2 qOpt" >
                    <div className=" pointer hover-pink"><i className="fa fa-copy"></i></div>
                    <div className=" pointer hover-pink"> <i className="fa fa-plus-circle" ></i> </div>
                    <div className="text-danger pointer" > <i className="fa fa-trash" ></i> </div>
                  </div>  
            </div>
        </div>
    )
}

export default Question

