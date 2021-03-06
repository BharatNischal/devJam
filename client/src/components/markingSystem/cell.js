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
          // Handle the case where marks are given out of range
          if(marks>props.maxPoints){
            setMarks(props.maxPoints);
          }else if(marks<0){
            setMarks(0);
          }
          axios.post(`/updateMarks/${props.submission._id}`,{marks:marks<0?0:Math.min(marks,props.maxPoints)})
            .then(res=>{
              if(res.data.success){
                props.handleUpdate(props.i,props.j,marks<0?0:Math.min(marks,props.maxPoints));
                props.updateAlert(true);
                setTimeout(()=>{
                  props.updateAlert(false);
                },2000);
              }else{
                console.error(res.data.msg);
                alert(res.data.msg);
              }
            })
            .catch(err=>{
              alert(err.message);
              console.error(err.message);
            })
        }
    }

    const dueDate = new Date(props.dueDate);
    const curDate = new Date();
    const disable = !props.submission && dueDate.getTime()<curDate.getTime();
    let cellData = "";
    if(disable){
      cellData = <span className="text-danger">Missing</span>
    }else if(props.submission){
      const subDate = new Date(props.submission.timestamp);
      if(subDate.getTime()>dueDate.getTime()){
        cellData =  [<p className="m-0 text-center"><input type="number" placeholder="points"onKeyDown={handleMarksUpdate} value={marks==-1?"":marks} onChange={e=>setMarks(e.target.value)} className="no-style text-right" min="0" max={props.maxPoints}/>&nbsp;&nbsp;/{props.maxPoints}</p>,
                    <span className="font-sm text-warning">Done Late</span>]
      }else{
        cellData = [<p className="m-0 text-center"><input type="number" placeholder="points" onKeyDown={handleMarksUpdate} value={marks==-1?"":marks} onChange={e=>setMarks(e.target.value)} className="no-style text-right" min="0" max={props.maxPoints}/>&nbsp;&nbsp;/{props.maxPoints}</p>,
                    <span className="font-sm text-warning">&nbsp;</span>]
      }
    }

    return (
        <td style={{position:"relative"}} className={disable?"disable":""}>
              {cellData}

            <div className={disable?"menu-toggle d-none":"menu-toggle"} onClick={()=>setshowMenu(true)} ><i className="fa fa-ellipsis-v pointer" aria-hidden="true"></i></div>



            {showMenu?<React.Fragment>
                <div className="black" onClick={()=>setshowMenu(false)}>  </div>
                <div className="subMenu" onClick={props.view}> <span>View Submission</span> </div>
                </React.Fragment>:null}
        </td>
    )
}



export default Cell;
