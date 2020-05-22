import React, { useState } from "react";

const Experience = (props)=>{
    const [edData,setedData] = useState({
        to:{present:true,date:""},
        company:"",
        position:"",
        description:"",
        from:""
    });
    const resetEd=()=>{
        setedData({
            to:{present:true,date:""},
            company:"",
            position:"",
            description:"",
            from:""
        });
    }


    return(
        <React.Fragment>
            <ol>
                {props.ex.map(e=>(
                <li key={e._id} className="text-left ml-2">

                     <ul className=" ml-3">
                         <li><b>Company </b> {e.company} </li>
                         <li><b>Position:  </b> {e.position} </li>
                         <li><b>Description :  </b> {e.description} </li>
                         <li><i> {e.from} to {e.to.present?"Present": e.to.date} </i> </li>
                     </ul>
                    <button className="btn text-danger" onClick={(ev)=>{ev.preventDefault(); props.del(e._id) }} ><i className="fa fa-close"></i> Remove </button> 
                 </li>
                ))}

            </ol>
            <div className="form-group input-group">
                    <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fas fa-university" ></i></div>
                    <input type="text" name="Company"  placeholder="Enter Company Name" value={edData.company} onChange={(e)=>setedData({...edData,company:e.target.value})} className="form-control" />
            </div>
            <div className="form-group input-group">
                    <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fas fa-briefcase" ></i></div>
                    <input type="text" name="position"  placeholder="Enter Position" value={edData.position} onChange={(e)=>setedData({...edData,position:e.target.value})} className="form-control" />
            </div>
            <div className="form-group input-group">
                    <textarea className="form-control" placeholder="Enter Description" onChange={(e)=>setedData({...edData,description:e.target.value})} value={edData.description} >  </textarea>
            </div>
            <div className="form-group  text-left">
                    From<br/>
                    <input type="date" name="subject"  placeholder="Enter From" value={edData.from} onChange={(e)=>setedData({...edData,from:e.target.value})} className="form-control" />
            </div>


            <div className="checkbox text-left">
                To: <br/>
                <label><input type="checkbox" value="present" onChange={(e)=>{setedData({...edData,to:{...edData.to,present:!edData.to.present}})}} checked={edData.to.present} /> Present </label>
                <br/>
                {!edData.to.present?<input type="date" name="to"  placeholder="Enter to" value={edData.to.date} onChange={(e)=>setedData({...edData,to:{...edData.to,date:e.target.value}})} className="form-control" />:null}
            </div>
            <button className="btn btn-primary" onClick={(e)=>{e.preventDefault();props.addEx(edData);resetEd();}} > Add </button>
        </React.Fragment>
    )

}

export default Experience;
