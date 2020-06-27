import React, { useState } from 'react';
import Nav from '../profile/Nav/Nav';
import Select from "react-select";
import Alert from "../ui/alert/alert";

function Courses(props) {

    //UI STATES
    const [copyAlert,setCopyAlert] = useState(false);
    const [showConfirmAlert,setShowConfirmAlert] = useState(false);

    const copyToClipBoard=function(id){
        var textField = document.createElement('textarea')
        textField.innerText =`${window.location.host}/course/${id}` ;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        console.log("Coppied");
        setCopyAlert(true);
        setTimeout(()=>{setCopyAlert(false)},2000);
    }
    return (
        <React.Fragment>
            <Nav show={true} menu={true} />
            {copyAlert?<div className="custom-alert"> Link Coppied to Clibard </div>:null}
            {showConfirmAlert?<Alert msg={<React.Fragment> <h3>Are You Sure to continue?</h3><p> Click Ok to Proceed.</p> </React.Fragment>} ok={null} cancel={()=>setShowConfirmAlert(false)} />:null}
            <div className="bgwhiteoverlay"></div>
            <div className="container" style={{marginTop:"120px"}} >
                <div style={{display:"flex",justifyContent:"space-between"}} ><h1 className="topicTitle mainH text-left text-pink">Courses </h1>  <div> <button className="btn btn-outline-grad"> Create </button> </div> </div>
                <div className="row my-5" >


                    <div className="col-lg-4 mt-1 order-lg-2">
                        <div className="p-3 shadow mt-lg-5" style={{borderRadius:"18px",minHeight:"200px",backgroundColor:"#f8f8f8"}}>
                            <h4 className="mb-2">Filters</h4>
                            <Select
                               className="Filter"
                               placeholder="Select Filter"
                               
                            />
                            
                            <button className="btn btn-link text-danger" >Clear</button>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-2 mb-5 " >
                      
                        <div className="p-3 my-2 pointer" style={{position:"relative",borderRadius:"20px", boxShadow:"0px 4px  10px rgba(0,0,0,0.3)"}} >
                            <div className="align-center" style={{ display:"flex" , justifyContent:"space-between" }} >
                                <div className="pt-2 hover-pink"  ><h3 className="topicTitle d-inline mr-2" style={{fontSize:"20px"}}>Maths Course</h3><i style={{fontSize:"14px",color:"#333"}} >Published</i></div>
                                <div> 
                                     <span className="hover-pink pointer" onClick={()=>copyToClipBoard("XYZ")}  > <i className="fa fa-copy"></i> </span>
                                     <button className="btn btn-grad ml-2" onClick={()=>setShowConfirmAlert(true)} >Close</button>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 my-2 pointer" style={{position:"relative",borderRadius:"20px", boxShadow:"0px 4px  10px rgba(0,0,0,0.3)"}} >
                            <div className="align-center" style={{ display:"flex" , justifyContent:"space-between" }} >
                                <div className="pt-2 hover-pink"  ><h3 className="topicTitle d-inline mr-2" style={{fontSize:"20px"}}>Maths Course</h3><i style={{fontSize:"14px",color:"#333"}} >Draft</i></div>
                                <div> 
                                     
                                     <button className="btn btn-grad ml-2" >Publish</button>
                                </div>
                            </div>
                        </div>
                     
                    </div>
            </div>
            </div>
        </React.Fragment>
    )
}


export default Courses

