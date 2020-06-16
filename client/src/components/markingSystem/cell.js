import React,{useState,useEffect} from 'react';
import axios from "axios";

function Cell(props) {
    const [showMenu, setshowMenu] = useState(false);
    const [marks, setMarks] = useState("");

    useEffect(()=>{
      console.log(props.submission);
      setMarks(props.submission?props.submission.marks:"");
    },[])

    function handleMarksUpdate(e){
        if(e.key==="Enter"){
          axios.post(`/updateMarks/${props.submission._id}`,{marks})
            .then(res=>{
              if(res.data.success){
                console.log("updated");
              }else{
                console.log(res.data.msg);
              }
            })
            .catch(err=>{
              console.log(err.message);
            })
        }
    }

    const dueDate = new Date(props.dueDate);
    const curDate = new Date();
    let cellData = "";
    if(!props.submission && dueDate.getTime()<curDate.getTime()){
      cellData = <span className="text-danger">Missing</span>
    }else if(props.submission){
      const subDate = new Date(props.submission.timestamp);
      if(subDate.getTime()>dueDate.getTime()){
        cellData =  [<p className="m-0 text-center"><input type="number" placeholder="points"onKeyDown={handleMarksUpdate} value={marks} onChange={e=>setMarks(e.target.value)} className="no-style text-right" min="0" max={props.maxPoints}/>&nbsp;&nbsp;/{props.maxPoints}</p>,
                    <span className="font-sm text-warning">Due Late</span>]
      }else{
        cellData = [<p className="m-0 text-center"><input type="number" placeholder="points" onKeyDown={handleMarksUpdate} value={marks} onChange={e=>setMarks(e.target.value)} className="no-style text-right" min="0" max={props.maxPoints}/>&nbsp;&nbsp;/{props.maxPoints}</p>,
                    <span className="font-sm text-warning">&nbsp;</span>]
      }
    }

    return (
        <td style={{position:"relative"}}>
              {cellData}
            <div style={{position:"absolute",right:"5px",top:"5px"}} onClick={()=>setshowMenu(true)} ><i className="fa fa-ellipsis-v pointer" aria-hidden="true"></i></div>



            {showMenu?<React.Fragment>
                <div className="black" onClick={()=>setshowMenu(false)}>  </div>
                <div className="subMenu"> <span>View Submission</span> </div>
                </React.Fragment>:null}
        </td>
    )
}



export default Cell;
