import React from 'react';

function MGrid(props) {
    return (
        <div className="row text-left mt-3">
            {/* Rows */}
            <div className="col-md-6">
                <h4>Rows</h4>
                <div className="row mb-1">
                    <div className="col-10">
                        1.  Row Name 1
                    </div>
                    <div className="col-2"> <i className="fa fa-close hover-danger pointer"></i> </div>
                </div>
                <div className="row mb-1">
                    <div className="col-10">
                        2.  Row Name 2
                    </div>
                    <div className="col-2"> <i className="fa fa-close hover-danger pointer"></i> </div>
                </div>
                <div className="row mb-1">
                    <div className="col-10">
                        3.  Row Name 3 
                    </div>
                    <div className="col-2"> <i className="fa fa-close hover-danger pointer"></i> </div>
                </div>
                <div className="mt-2">
                <form > <input className="w-75 p-2" style={{border:"none",borderBottom:"2px solid #a1a1a1a1"}} placeholder="Add Row"/></form>
                </div>
            </div>

            {/* Collumns */}
            <div className="col-md-6">
                <h4>Columns</h4>
                <div className="row">
                    <div className="col-10">
                        <div className=" custom-control custom-radio">
                            <input type="radio" name="opt" id="o1" className="custom-control-input" />
                            <label className="custom-control-label" htmlFor="o1"> Column 1 </label>
                        </div>
                    </div>
                    <div className="col-2"> <i className="fa fa-close hover-danger pointer"></i> </div>
                </div>
                <div className="row">
                    <div className="col-10">
                        <div className=" custom-control custom-radio">
                            <input type="radio" name="opt" id="o2" className="custom-control-input" />
                            <label className="custom-control-label" htmlFor="o2"> Column 2 </label>
                        </div>
                    </div>
                    <div className="col-2"> <i className="fa fa-close hover-danger pointer"></i> </div>
                </div>
                <div className="mt-2">
                    <form > <input className="w-75 p-2" style={{border:"none",borderBottom:"2px solid #a1a1a1a1"}} placeholder="Add Collumn"/></form>
                </div>
            </div>
            
        </div>
    )
}


export default MGrid;

