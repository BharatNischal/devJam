import React,{useState,useEffect} from "react";
import "./marks.css"
import $ from 'jquery';
import axios from "axios";
import Cell from "./cell";
import Nav from "../profile/Nav/Nav";

function MarksList(props){

    const [marksList,setMarksList] = useState([]);
    useEffect(()=>{
      axios.post('/deliverables')
        .then(res=>{
          if(res.data.success){
            setMarksList(res.data.deliverables);
            console.log(res.data.deliverables);
          }else{
            console.log(res.data.err);
          }
        })
        .catch(err=>{
          console.log(err.message);
        })
      $('tbody').scroll(function(e) { //detect a scroll event on the tbody
        $('thead').css("left", -$("tbody").scrollLeft()); //fix the thead relative to the body scrolling
        $('thead th:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first cell of the header
        $('tbody th:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first column of tdbody
      });
    },[])

    // Function to get new deliverables on reaching end of scroll
    function handleScroll(e) {
      if(e.target.scrollLeft == (e.target.scrollWidth - e.target.clientWidth)){
        console.log("reached");
        axios.post('/deliverables',{date:marksList[marksList.length-1].timestamp})
          .then(res=>{
            if(res.data.success){
              setMarksList([...marksList,...res.data.deliverables]);
            }else{
              console.log(res.data.msg);
            }
          })
          .catch(err=>{
            console.log(err.message);
          })
      }
    }

    function handleUpdate(i,j,val) {
      let newMarksList = Array.from(marksList);
      newMarksList[i].submissions[j].submissionId.marks = Number(val);
      setMarksList(newMarksList);
    }

    let tableData = [];
    let sumOfDeliverable=[],rows=0,cols=0;
    if(marksList.length>0){
      rows = marksList.length;cols=marksList[0].submissions.length;
      sumOfDeliverable = Array(rows).fill(0);
      for(let j=0;j<cols;j++){
        let row=[]
        row.push(<th>{marksList[0].submissions[j].userId.name}</th>)
        for(let i=0;i<rows;i++){
            sumOfDeliverable[i] +=  marksList[i].submissions[j].submissionId?(marksList[i].submissions[j].submissionId.marks==-1?0:marksList[i].submissions[j].submissionId.marks):0;
            row.push(<Cell i={i} j={j} handleUpdate={handleUpdate} maxPoints={marksList[i].points} submission={marksList[i].submissions[j].submissionId} dueDate={marksList[i].dueDate} view={()=>{props.history.push({pathname:`/submission/${marksList[i]._id}/${j}`,deliverable:marksList[i]})}}/>)
        }
        tableData.push(<tr>{row}</tr>);
      }
    }

    return (
      <React.Fragment>
      <Nav show={true} />
      <div style={{minHeight:"100vh",backgroundColor:"white"}}>
        <div className="bgwhiteoverlay"></div>

          <div className="horizontal-scroll-except-first-column" style={{marginTop:"80px"}} >
          <table className="custom-table">
              <thead>
                <tr>
                  <th></th>
                  {marksList.map(deliverable=>(
                    <th className="pointer" onClick={()=>{props.history.push({pathname:`/marks/deliverable/${deliverable._id}`,deliverable:deliverable})}}>{deliverable.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody onScroll={handleScroll}>
                <tr>
                  <th>Average</th>
                  {sumOfDeliverable.map(sum=>(
                    <td>{(sum/cols).toFixed(2)}</td>
                  ))}
                </tr>
                {tableData}
              </tbody>
            </table>
          </div>
    </div>
    </React.Fragment>
    );
}

export default MarksList;
