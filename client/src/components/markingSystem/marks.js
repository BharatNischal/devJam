import React,{useState,useEffect} from "react";
import "./marks.css"
import $ from 'jquery';

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
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i className="fa fa-ellipsis-v pointer" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0"><input type="text" placeholder="points" className="no-style"/>/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
      </tr>
      <tr>
        <th>Student 2</th>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
      </tr>
      <tr>
        <th>Student 3</th>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
        <td>
          <div className="row">
            <div className="col-10" style={{}}>
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            </div>
            <div className="col-2"><i class="fa fa-ellipsis-v" aria-hidden="true"></i></div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
          </div>
        </div>
    </div>
    );
}

export default MarksList;
