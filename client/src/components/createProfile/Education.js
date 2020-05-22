import React, { useState } from "react";

const Education = (props)=>{
    const [edData,setedData] = useState({
        to:{present:true,date:""},
        schoolName:"",
        degree:"",
        subject:"",
        from:""
    });
    const resetEd=()=>{
        setedData({
            to:{present:true,date:""},
            schoolName:"",
            degree:"",
            subject:"",
            from:""
        });
    }

    return(
        <React.Fragment>
            <ol>
                {props.ed.map(e=>(
                <li key={e._id} className="text-left ml-2">

                     <ul className=" ml-3">
                         <li><b>School Name : {e.schoolName} </b> </li>
                         <li><b>Degree: {e.degree} </b> </li>
                         <li><b>Subject : {e.subject} </b> </li>
                         <li><i> {e.from} to {e.to.present?"Present": e.to.date} </i> </li>
                     </ul>
                     <button className="text-danger border-none btn" onClick={(ev)=>{ev.preventDefault(); props.del(e._id) }} ><i className="fa fa-close"></i> Remove</button>
                 </li>
                ))}

            </ol>
            <div className="form-group input-group">
                    <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fas fa-university" ></i></div>
                    <input type="text" name="schoolName"  placeholder="Enter school name" value={edData.schoolName} onChange={(e)=>setedData({...edData,schoolName:e.target.value})} className="form-control" />
            </div>
            <div className="form-group input-group">
                    <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fas fa-graduation-cap" ></i></div>
                    <input type="text" name="degree"  placeholder="Enter degree" value={edData.degree} onChange={(e)=>setedData({...edData,degree:e.target.value})} className="form-control" />
            </div>
            <div className="form-group input-group">
                    <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fas fa-book" ></i></div>
                    <input type="text" name="subject"  placeholder="Enter subject" value={edData.subject} onChange={(e)=>setedData({...edData,subject:e.target.value})} className="form-control" />
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
            <button className="btn btn-primary" onClick={(e)=>{e.preventDefault();props.addEd(edData);resetEd();}} > Add </button>
        </React.Fragment>
    )

}

export default Education;
