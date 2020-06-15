import React,{useState} from 'react';

function Cell(props) {
    const [showMenu, setshowMenu] = useState(false);

    return (
        <td style={{position:"relative"}}>
          
              <p className="m-0 text-center"><input type="text" placeholder="points" className="no-style"/>&nbsp;&nbsp;/100</p>
              <span className="font-sm">Remarks</span>
            
            <div style={{position:"absolute",right:"5px",top:"5px"}} onClick={()=>setshowMenu(true)} ><i className="fa fa-ellipsis-v pointer" aria-hidden="true"></i></div>
            
            
            
            {showMenu?<React.Fragment>
                <div className="black" onClick={()=>setshowMenu(false)}>  </div>
                <div className="subMenu"> <span>View Submission</span> </div>
                </React.Fragment>:null}
        </td>
    )
}



export default Cell;

