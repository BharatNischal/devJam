import React from 'react';

//To Populate this take reference from liveTest/mGrid.js

function MGrid(props) {
    return (
        <div className="gridWrapper text-center ">
            <div className="mGrid m-3" style={{gridTemplateColumns:`170px repeat(4,120px)`,gridTemplateRows:`80px repeat(4,40px)`}} >
                <div className="headCol pt-2"></div>
                <div className="headCol pt-2"> Col 1</div>
                <div className="headCol pt-2"> Col 2</div>
                <div className="headCol pt-2"> Col 3</div>
                <div className="headCol pt-2"> Col 4</div>
                
                <div className="headRow text-center pt-2"> Manjot </div>
                <div className="pt-2"> 
                    <div className=" custom-control custom-radio">
                        <input type="radio" name={`opt1`} id={`op1a`}  className="custom-control-input" checked={true} />
                        <label className="custom-control-label" htmlFor={`op1a`}> <b></b>  </label> 
                    </div>
                </div>
                <div className="pt-2"> 
                    <div className=" custom-control custom-radio">
                        <input type="radio" name={`opt1`} id={`op1b`}  className="custom-control-input" disabled />
                        <label className="custom-control-label" htmlFor={`op1b`}> <b></b>  </label> 
                    </div>
                </div>
                <div className="pt-2"> 
                    <div className=" custom-control custom-radio">
                        <input type="radio" name={`opt1`} id={`op1c`}  className="custom-control-input"  disabled />
                        <label className="custom-control-label" htmlFor={`op1c`}> <b></b>  </label> 
                    </div>
                </div>
                <div className="pt-2"> 
                    <div className=" custom-control custom-radio">
                        <input type="radio" name={`opt1`} id={`op1d`}  className="custom-control-input"  disabled />
                        <label className="custom-control-label" htmlFor={`op1d`}> <b></b>  </label> 
                    </div>
                </div>
                <div className="headRow text-center pt-2"> Manjot </div>
                <div className="pt-2"> 
                    <div className=" custom-control custom-radio">
                        <input type="radio" name={`opt2`} id={`op2a`}  className="custom-control-input" checked={true} />
                        <label className="custom-control-label" htmlFor={`op2a`}> <b></b>  </label> 
                    </div>
                </div>
                <div className="pt-2"> 
                    <div className=" custom-control custom-radio">
                        <input type="radio" name={`opt2`} id={`op2b`}  className="custom-control-input" disabled />
                        <label className="custom-control-label" htmlFor={`op2b`}> <b></b>  </label> 
                    </div>
                </div>
                <div className="pt-2"> 
                    <div className=" custom-control custom-radio">
                        <input type="radio" name={`opt2`} id={`op2c`}  className="custom-control-input"  disabled />
                        <label className="custom-control-label" htmlFor={`op2c`}> <b></b>  </label> 
                    </div>
                </div>
                <div className="pt-2"> 
                    <div className=" custom-control custom-radio">
                        <input type="radio" name={`opt2`} id={`op2d`}  className="custom-control-input"  disabled />
                        <label className="custom-control-label" htmlFor={`op2d`}> <b></b>  </label> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MGrid

