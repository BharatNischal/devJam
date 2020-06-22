import React from 'react';
import Modal from '../ui/modal/modal';
import Nav from '../profile/Nav/Nav';
import Select from "react-select";

function Test(props) {
    return (

        <React.Fragment>
            <Nav show={true} menu={true} />
            <div className="bgwhiteoverlay"></div>
            <div className="container" style={{marginTop:"120px"}} >
                <div style={{display:"flex",justifyContent:"space-between"}} ><h1 className="topicTitle mainH text-left text-pink">Tests </h1>  <div> <button className="btn btn-outline-grad" > Create </button> </div> </div>
                <div className="row my-5" >
                    

                    <div className="col-lg-4 mt-1 order-lg-2">
                        <div className="p-3 shadow mt-lg-5" style={{borderRadius:"18px",minHeight:"200px",backgroundColor:"#f8f8f8"}}>
                            <h4 className="mb-2">Filters</h4>

                            <Select
                                className="mb-2"
                                placeholder="Sort "
                                
                             />
                            <Select
                               className="Filter"
                            />
                            {/* {showNumberOptions!=0?
                            <form className="values mt-2" onSubmit={filterAdvanceHandler}>
                                 <div className="px-2 mb-1">Number 1 &nbsp;&nbsp;&nbsp; <input type="Number" className="form-control " value={numbers[0]} onChange={(e)=>setNumbers([e.target.value,numbers[1]])} style={{width:"80px",display:"inline"}} />   </div>
                                 <div className="px-2 mb-1">{showNumberOptions==2?<React.Fragment>Number 2 &nbsp;&nbsp;&nbsp; <input type="Number" className="form-control " value={numbers[1]} onChange={(e)=>setNumbers([numbers[0],e.target.value])} style={{width:"80px",display:"inline"}} /> </React.Fragment>:null}<button className="btn btn-outline-grad float-right"> Filter </button>  </div>
                            </form>
                            :null
                            } */}
                            <button className="btn btn-link text-danger" >Clear</button>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-2 mb-5 " >
                        <div className="p-3 my-2" style={{position:"relative",borderRadius:"20px", boxShadow:"0px 4px  10px rgba(0,0,0,0.3)"}}>
                            <div className="align-center" style={{ display:"flex" , justifyContent:"space-between" }} >
                                <h3 className="topicTitle cursor-pointer" style={{fontSize:"20px"}} > Maths Test</h3>
                                <div> <button className="btn btn-grad" > Publish </button> </div>
                            </div>
                        </div>
                        <div className="p-3 my-2" style={{position:"relative",borderRadius:"20px", boxShadow:"0px 4px  10px rgba(0,0,0,0.3)"}}>
                            <div className="align-center" style={{ display:"flex" , justifyContent:"space-between" }} >
                                <h3 className="topicTitle cursor-pointer" style={{fontSize:"20px"}} > Maths Test</h3>
                                <div> <button className="btn btn-grad" > Publish </button> </div>
                            </div>
                        </div>
                        <div className="p-3 my-2" style={{position:"relative",borderRadius:"20px", boxShadow:"0px 4px  10px rgba(0,0,0,0.3)"}}>
                            <div className="align-center" style={{ display:"flex" , justifyContent:"space-between" }} >
                                <h3 className="topicTitle cursor-pointer" style={{fontSize:"20px"}} > Maths Test</h3>
                                <div> <button className="btn btn-grad" > Publish </button> </div>
                            </div>
                        </div>
                       
                       
                </div>
            </div>
            </div>
        </React.Fragment>
    )
}



export default Test;

