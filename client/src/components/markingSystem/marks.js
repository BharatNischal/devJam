import React,{useState,useEffect} from "react";
import "./marks.css"
import $ from 'jquery';
import Cell from "./cell";

function MarksList(props){

    const [marksList,setMarksList] = useState([]);
    useEffect(()=>{
      $('tbody').scroll(function(e) { //detect a scroll event on the tbody
        $('thead').css("left", -$("tbody").scrollLeft()); //fix the thead relative to the body scrolling
        $('thead th:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first cell of the header
        $('tbody th:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first column of tdbody
      });
    },[])


    return (
      <div style={{minHeight:"100vh",backgroundColor:"white"}}>
        <div className="container">
          <div className="horizontal-scroll-except-first-column">
          <table className="">
    <thead>
      <tr>
        <th></th>
        <th>Deliverable 1</th>
        <th>Deliverable 2</th>
        <th>Deliverable 3</th>
        <th>Deliverable 4</th>
        <th>Deliverable 5</th>
        <th>Deliverable 6</th>
        <th>Deliverable 7</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Student 1</th>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
        <Cell/>
      </tr>
 
 
      
    </tbody>
  </table>
          </div>
        </div>
    </div>
    );
}

export default MarksList;
