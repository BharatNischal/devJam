import React,{useState,useEffect} from 'react';
import axios from "axios";

var data = [];
export default function AlertBody(props) {

  const [filteredData,setFilteredData] = useState([]);
  //UI STATES
  const [focusInp,setFocusInp] = useState(false);
  const [srchTxt,setSrchTxt] = useState("");
  const [selectAll,setSelectAll] = useState(false);
  const [showConfirmation,setShowConfirmation] = useState(false);

  useEffect(()=>{
    if(true){
      axios.get('/videos/all')
        .then(res=>{
          if(res.data.success){
            data = res.data.topics;
            setFilteredData(res.data.topics)
          }else{
            console.log(res.data.msg);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
    }else if(props.type=="Deliverable"){
      axios.get('/deliverables/all')
      .then(res=>{
        if(res.data.success){
          data = res.data.topics;
          setFilteredData(res.data.topics)
        }else{
          console.log(res.data.msg);
        }
      })
      .catch(err=>{
        console.log(err.message);
      })
    }else if(props.type=="Test"){
      axios.get('/tests/all')
      .then(res=>{
        if(res.data.success){
          data = res.data.tests;
          setFilteredData(res.data.tests)
        }else{
          console.log(res.data.msg);
        }
      })
      .catch(err=>{
        console.log(err.message);
      })
    }else{

    }
  },[])

  return (
    <div className="col-12 mt-4">
        <div className="round border p-3" style={{minHeight:"200px",backgroundColor:"#fcfcfc"}}>
            <div className="d-flex justify-content-between align-content-center ">
                <h2> {props.type} </h2>
                <div><button className="btn btn-outline-grad" onClick={console.log("add")} > Add </button></div>
            </div>
            <div className="row align-content-center justify-content-center mt-3">
                <div className="col-md-3 pt-2">
                    <div className="custom-control custom-checkbox d-inline" >
                        <input type="checkbox" className="custom-control-input" id="isSelectAll"  checked={selectAll} onChange={ setSelectAll(!selectAll) } />
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

                    {/*{data.map((student,i)=>(
                        <div key={student._id} className={(srchTxt!=""?(student.name.toLowerCase().includes(srchTxt.toLowerCase())?"custom-control custom-checkbox mt-3":"custom-control custom-checkbox mt-3 d-none"):"custom-control custom-checkbox mt-3")} >
                            <input type="checkbox" className="custom-control-input" id={"s"+student._id}  checked={student.selected} onChange={(e)=>{const sts=[...students]; sts[i].selected=!sts[i].selected; setStudents(sts)}} />
                            <label className="custom-control-label" htmlFor={"s"+student._id} >
                                <img src={student.profilePic} style={{width:"40px",height:"40px",objectFit:"cover"}} className="rounded-circle shadow" />
                                &nbsp;&nbsp; {student.name}
                            </label>
                        </div>
                    ))}*/}


                </div>
            </div>
        </div>
    </div>
  )
}
