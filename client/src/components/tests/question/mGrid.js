import React,{useState} from 'react';

function MGrid(props) {

  const [row,setRow] = useState("");
  const [col,setCol] = useState("");

  function addRow(e) {
      e.preventDefault();
      props.handleUpdate(null,row,"rows");
      setRow("");
  }

  function addCol(e) {
    e.preventDefault();
    props.handleUpdate(null,{title:col},"options");
    setCol("");
  }

  function removeRow(ind) {
      props.handleUpdate(null,ind,"rows",true);
  }

  function removeCol(ind) {
    props.handleUpdate(null,ind,"options",true);
  }

    return (
        <div className="row text-left mt-3">
            {/* Rows */}
            <div className="col-md-6">
                <h4>Rows</h4>
                {props.rows?props.rows.map((row,i)=>(
                  <div className="row mb-1" key={i}>
                      <div className="col-10">
                          {i+1}.  {row}
                      </div>
                      {props.test.status=="Draft"&&!props.preview?<div className="col-2" onClick={()=>{removeRow(i)}}> <i className="fa fa-close hover-danger pointer"></i> </div>:null}
                  </div>
                )):null}
                <div className="mt-2">
                {props.test.status=="Draft"&&!props.preview?
                  <form onSubmit={addRow}> <input className="w-75 p-2" value={row} onChange={e=>setRow(e.target.value)} style={{border:"none",borderBottom:"2px solid #a1a1a1a1"}} placeholder="Add Row"/></form>
                  :null}
                </div>
            </div>

            {/* Collumns */}
            <div className="col-md-6">
                <h4>Columns</h4>
                {props.cols?props.cols.map((col,i)=>(
                  <div className="row" key={i}>
                      <div className="col-10">
                          <div className=" custom-control custom-radio">
                              <input type="radio" name="opt" id="o1" className="custom-control-input" disabled />
                              <label className="custom-control-label" htmlFor="o1"> {col.title} </label>
                          </div>
                      </div>
                      {props.test.status=="Draft"&&!props.preview?<div className="col-2" onClick={()=>{removeCol(i)}}> <i className="fa fa-close hover-danger pointer"></i> </div>:null}
                  </div>
                )):null}
                <div className="mt-2">
                  {props.test.status=="Draft"&&!props.preview?
                    <form onSubmit={addCol}> <input className="w-75 p-2" value={col} onChange={e=>setCol(e.target.value)} style={{border:"none",borderBottom:"2px solid #a1a1a1a1"}} placeholder="Add Collumn"/></form>
                    :null}
                </div>
            </div>

        </div>
    )
}


export default MGrid;
