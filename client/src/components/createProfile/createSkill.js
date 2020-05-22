import React, { useState } from "react";

const CreateSkill=(props)=>{
    const [skill,setSkill] = useState({
        name:props.op[0],
        rating:1,
        experience:1
    });
    const resetSk=()=>{
        setSkill({
            name:props.op[0],
            rating:1,
            experience:1
        });
    }
    return(
        <React.Fragment>
            <ol className="text-left ml-3">
                {props.sk.map(e=>(
                    <li className="mb-1" key={e._id} ><b>{e.name} : </b>{e.rating} experience:  {e.experience} &nbsp;&nbsp; <button className="btn text-danger" onClick={(ev)=>{ev.preventDefault(); props.del(e._id) }} ><i className="fa fa-close"></i> Remove </button></li>
                ))}
            </ol>
            <div className="form-group input-group">
                    <select name="name" placeholder="select Language" value={skill.name} className="form-control" onChange={(e)=>setSkill({...skill,name:e.target.value})} >
                        {props.op.map(o=><option key={o} value={o}>{o}</option>)}
                    </select>

            </div>
            <div className="text-left" >Rating</div>
            <div className="form-group input-group">
                    <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fas fa-star" ></i></div>
                    <input type="number" min="1" max="5" name="rating"  placeholder="Enter Rating" value={skill.rating} onChange={(e)=>setSkill({...skill,rating:e.target.value})} className="form-control" />
            </div>
            <div className="text-left" >Enter Experience in Years</div>
            <div className="form-group input-group">
                    <input type="number" min="1"  name="experience"  placeholder="Enter Experience" value={skill.experience} onChange={(e)=>setSkill({...skill,experience:e.target.value})} className="form-control" />
            </div>
            <button className="btn btn-primary" onClick={(e)=>{e.preventDefault();props.addSk(skill);resetSk();}} > Add </button>

        </React.Fragment>
    );


};

export default CreateSkill;
