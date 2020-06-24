import React, { useState } from 'react';
import placeholder from "../Placeholder.png";

function MGrid(props) {

    const [gridSize,setGridSize] = useState({columns:10,rows:8})

    const headers=[];
    for(let i=0; i< gridSize.columns;i++){
        headers.push((<div className="headCol pt-2" > Column {i} </div>));
    }
    const rows=[];
    for(let i=0;i<gridSize.rows;i++){
        
        rows.push(<div className="headRow pt-2"> Row {i} </div>)
        for(let j=0;j<gridSize.columns;j++){
            rows.push(<div className="pt-2"> <div className=" custom-control custom-radio"><input type="radio" name={`opt${i}`} id={`op${i}${j}`} className="custom-control-input"/>  <label className="custom-control-label" htmlFor={`op${i}${j}`}> <b></b>  </label> </div></div>)
        }
    }
    return (
        <div className="mt-3 text-center pl-3">
               <h4 className="text-left"> 12 is 40% of what number? </h4>
               <div className="qImg mb-2"  >
                    <span > <img src={placeholder} style={{maxHeight:"200px"}} className="img-fluid" /></span>
                </div>

                <div className="gridWrapper ">
                    <div className="mGrid m-3" style={{gridTemplateColumns:`170px repeat(${gridSize.columns},120px)`,gridTemplateRows:`80px repeat(${gridSize.rows},40px)`}} >
                        <div className="headCol"></div>
                        {headers}
                        {rows}
                    </div>

                </div>
                <div className="text-center mt-4">
                    <span className="mr-4 pointer hover-pink">
                        <i className="fa fa-less-than"></i>
                    </span>
                    <span className="mr-4"> <button className="btn bg-grad text-white"> Submit </button> </span>
                    <span className="mr-2 pointer hover-pink" >
                        <i className="fa fa-greater-than"></i>
                    </span>
                    
                </div>
                
           </div>
    )
}



export default MGrid;

