import React, { useState, useEffect } from 'react';
import Nav from '../profile/Nav/Nav';
import placeholder from "./Placeholder.png";
import Axios from 'axios';
import Alert from '../ui/alert/alert';

function PublishTest(props) {
    const [students,setStudents]=useState([]);

    //UI STATES
    const [focusInp,setFocusInp] = useState(false);
    const [srchTxt,setSrchTxt] = useState("");
    const [selectAll,setSelectAll] = useState(false);
    const [showConfirmation,setShowConfirmation] = useState(false);

    useEffect(()=>{
        Axios.get("/students")
        .then(res=>{
            if(res.data.success){
                setStudents(res.data.students.map(s=>{
                    if(!s.name){
                        s.name="";
                    }
                    return {...s,selected:false};
                }));
            }
        }).catch(err=>{
            console.log(err);
        })
    },[]);

    const handlePublish=function(){
        setShowConfirmation(true);
    }
    const finalPublishHandler=function(){
        const data={};
        data.students =students.filter((st)=>st.selected).map(s=>s._id);

        console.log(data);
        // Publish request to server.....

        Axios.put(`/test/publish/${props.match.params.id}`,data)
        .then(res=>{
           setShowConfirmation(false);
            if(res.data.success){
                console.log("Successful");
            }else{
                alert(res.data.msg);
            }

        }).catch(err=>{
           setShowConfirmation(false);
            alert(err.message);
        })
        setShowConfirmation(false);
    }



    return (
        <React.Fragment>
            <Nav show={true}/>
            <div className="bgwhiteoverlay" ></div>
            {showConfirmation?<Alert msg={(
                <React.Fragment>
                <h4>Click Ok To Confirm Selected Students</h4>
                {students.map((student,i)=>(
                    <React.Fragment key={i}>
                    {student.selected?<div className="text-left mb-2">
                        <img src={student.profilePic} style={{width:"40px",height:"40px",objectFit:"cover"}} className="rounded-circle shadow" />
                        &nbsp;&nbsp; {student.name}
                        </div>:null}
                    </React.Fragment>))}


            </React.Fragment>)}
            cancel={()=>setShowConfirmation(false)}
            ok={finalPublishHandler}
            />:null}
            <div className="container text-left" style={{marginTop:"100px"}}>
                <div className="row">
                    <div className="col-12 p-3">
                        <div className=" p-3  shadow" style={{borderRadius:"18px",backgroundColor:"rgb(255, 235, 249)"}}>
                            <h2 className="topicTitle mainH text-left text-pink" >
                                    Test Title
                            </h2>
                                <span className="cursor-pointer p-2 pb-4" onClick={()=>props.history.push("/test")}><i className="fa fa-arrow-left anim-hil text-pink"></i> Go Back</span><br/>
                        </div>
                    </div>
                    <div className="col-12 mt-4">
                        <div className="round border p-3" style={{minHeight:"200px",backgroundColor:"#fcfcfc"}}>
                            <div className="d-flex justify-content-between align-content-center ">
                                <h2> Students </h2>
                                <div><button className="btn btn-outline-grad" onClick={handlePublish} > Publish </button></div>
                            </div>
                            <div className="row align-content-center justify-content-center mt-3">
                                <div className="col-md-3 pt-2">
                                    <div className="custom-control custom-checkbox d-inline" >
                                        <input type="checkbox" className="custom-control-input" id="isSelectAll"  checked={selectAll} onChange={()=>{setStudents(students.map(s=>{s.selected=!selectAll; return s;})); setSelectAll(!selectAll) }} />
                                        <label className="custom-control-label" htmlFor="isSelectAll" >Select All</label>
                                    </div>

                                </div>
                                <div className="col-md-9">
                                    <div className={focusInp?"srch focus w-100 ml-0":"srch w-100 ml-0"} style={{height:"40px"}}>
                                        <input type="text" onFocus={()=>{setFocusInp(true)}} onBlur={()=>{setFocusInp(false)}}   placeholder="Type to Search Students" value={srchTxt} onChange={(e)=>setSrchTxt(e.target.value)} ></input>
                                        <span className="float-right pr-3 srchIcon"><i className="fa fa-search"></i></span>
                                    </div>
                                </div>
                                <div className="col-md-6  pl-5" style={{height:"500px"}}>

                                    {students.map((student,i)=>(
                                        <div key={student._id} className={(srchTxt!=""?(student.name.toLowerCase().includes(srchTxt.toLowerCase())?"custom-control custom-checkbox mt-3":"custom-control custom-checkbox mt-3 d-none"):"custom-control custom-checkbox mt-3")} >
                                            <input type="checkbox" className="custom-control-input" id={"s"+student._id}  checked={student.selected} onChange={(e)=>{const sts=[...students]; sts[i].selected=!sts[i].selected; setStudents(sts)}} />
                                            <label className="custom-control-label" htmlFor={"s"+student._id} >
                                                <img src={student.profilePic} style={{width:"40px",height:"40px",objectFit:"cover"}} className="rounded-circle shadow" />
                                                &nbsp;&nbsp; {student.name}
                                            </label>
                                        </div>
                                    ))}


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}


export default PublishTest;
