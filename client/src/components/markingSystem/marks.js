import React,{useState,useEffect} from "react";
import "./marks.css"
import $ from 'jquery';
import axios from "axios";
import Cell from "./cell";

function MarksList(props){

    const [marksList,setMarksList] = useState([]);
    useEffect(()=>{
      axios.post('/deliverables')
        .then(res=>{
          if(res.data.success){
            setMarksList(res.data.deliverables);
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

    let tableData = [];
    if(marksList.length>0){
      let rows = marksList.length,cols=marksList[0].submissions.length;
      for(let j=0;j<cols;j++){
        let row=[]
        row.push(<th>{marksList[0].submissions[j].userId.name}</th>)
        for(let i=0;i<rows;i++){
            row.push(<Cell maxPoints={marksList[i].points} submission={marksList[i].submissions[j].submissionId} dueDate={marksList[i].dueDate} />)
        }
        tableData.push(<tr>{row}</tr>);
      }
    }


    return (
      <div style={{minHeight:"100vh",backgroundColor:"white"}}>
        <div className="container">
          <div className="horizontal-scroll-except-first-column">
          <table className="">
              <thead>
                <tr>
                  <th></th>
                  {marksList.map(deliverable=>(
                    <th>{deliverable.title}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData}
              </tbody>
            </table>
          </div>
        </div>
    </div>
    );
}

export default MarksList;
