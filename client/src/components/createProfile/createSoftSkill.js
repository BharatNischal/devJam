import React, { useState } from "react";

const CreateSoftSkill=(props)=>{
    const [skill,setSkill] = useState({
        name:"",
        rating:1,
        description:""
    });
    const resetSk=()=>{
        setSkill({
            name:"",
            rating:1,
            description:""
        });
    }
    return(
        <React.Fragment>
            <ol className="text-left ml-3">
                {props.sk.map(e=>(
                    <li className="mb-1"><b>{e.name} : </b>{e.rating}  &nbsp;&nbsp; <button className="btn btn-sm btn-danger" onClick={(ev)=>{ev.preventDefault(); props.del(e._id) }} > X </button></li>
                ))}
            </ol>
            <div className="form-group input-group">
                <input type="text"  name="name"  placeholder="Enter Skill Name" value={skill.name} onChange={(e)=>setSkill({...skill,name:e.target.value})} className="form-control" />
            </div>
            <div className="text-left" >Rating</div>
            <div className="form-group input-group">
                    <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fas fa-star" ></i></div>
                    <input type="number" min="1" max="5" name="rating"  placeholder="Enter Rating" value={skill.rating} onChange={(e)=>setSkill({...skill,rating:e.target.value})} className="form-control" />
            </div>
            <div className="form-group input-group">
                    <textarea className="form-control" placeholder="Enter Description" onChange={(e)=>setSkill({...skill,description:e.target.value})} value={skill.description} >  </textarea>
            </div>
            <button className="btn btn-primary" onClick={(e)=>{e.preventDefault();props.addSk(skill);resetSk();}} > Add </button>

        </React.Fragment>
    );

    
};

export default CreateSoftSkill;