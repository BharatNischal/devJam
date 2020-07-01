import React,{useState,useEffect} from 'react';

//To Populate this take reference from liveTest/mGrid.js

function MGrid(props) {

    const [ans,setAns] = useState([]);

    useEffect(()=>{
      console.log(props.answer);
      setAns(props.answer.split(""));
    },[])

    let rows = [];
    {props.rows.forEach((row,i)=>{
        rows.push(<div className="headRow text-center pt-2"> {row} </div>)
        
        props.options.forEach((opt,j)=>{
          rows.push(
            <div className="pt-2">
                <div className=" custom-control custom-radio">
                    <input type="radio"   className="custom-control-input" checked={+ans[i]==j+1} disabled/>
                    <label className="custom-control-label"> <b></b>  </label>
                </div>
            </div>
          );
        })
        
    })}


    return (
        <div className="gridWrapper text-center ">
            <div className="mGrid m-3" style={{gridTemplateColumns:`170px repeat(${props.options.length},120px)`,gridTemplateRows:`80px repeat(${props.rows.length},40px)`}} >

                <div className="headCol pt-2"></div>
                {props.options.map(opt=>(
                  <div className="headCol pt-2">{opt.title}</div>
                ))}

                {rows}

            </div>
        </div>
    )
}

export default MGrid
