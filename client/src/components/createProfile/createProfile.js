import React,{useState,useEffect, useRef, useContext} from "react";
import axios from "axios";
import Education from "./Education";
import Experience from "./Experience";
import CreateSkill from "./createSkill";
import CreateSoftSkill from "./createSoftSkill";
import Nav from "../profile/Nav/Nav";
import {CurUserContext} from "../../contexts/curUser";


const languageOptions=["java","javascript","c++","python","c#","vb","swift"];
const frontendOptions=["React","jquery","html","css","Bootstrap","Angular","Vue"];
const backendOptions=["NodeJS","Django","Flask","Spring","Asp.Net"];
const databaseOptions=["MySQL","MongoDB","SQLlite","SQLserver"];
const toolsOptions=["Git","Android","IOS","ReactNative","Flutter","CI"];
const removeKey=(arr)=>{
  const duplicate=[...arr];
  duplicate.forEach(d=>delete d._id);
  return JSON.stringify(duplicate);
}

const CreateProfile = (props)=>{
  
  //Authorization
  const {setUser,user} = useContext(CurUserContext);

  useEffect(()=>{
    console.log("USER ",user);
      if(!user.loggedIn){
        props.history.push("/login");
      }},[]);



    const [personalInfo,setPersonalInfo]= useState({firstName:props.firstName?props.firstName:"",lastName:"",title:""});
    const [contact,setContact] = useState({email:"",phone:"",github:"",youtube:""});  
    const [education,setEducation] = useState([]); 
    const [experience,setExperience] = useState([]); 
    const profilePicRef=useRef(null);
    const [id,setID] = useState(0);
    const [language,setLanguage]=useState([]);
    const [frontend,setFrontend] = useState([]);
    const [backend,setBackend] = useState([]);
    const [database,setDatabase] = useState([]);
    const [tools,setTools] = useState([]);
    const [softSkills,setSoftSkills] = useState([]);
    const [hobbies,setHobbies] = useState([]);
    const [hobby,setHobby] = useState("");
    const [rating,setRating] = useState(1);

    const submitHandler=(e)=>{
      e.preventDefault();
      console.log({personalInfo:personalInfo,contact:contact,education},profilePicRef.current.files[0]);
      const config = {
        headers: {
            'enctype': 'multipart/form-data'
        }
      };
      const formData = new FormData();
        formData.append('image',profilePicRef.current.files[0]);
        formData.append('personalInfo',JSON.stringify(personalInfo));
        formData.append('contact',JSON.stringify(contact));
        formData.append('education',removeKey(education));
        formData.append('experience',removeKey(experience));
        formData.append('languages',removeKey(language));
        formData.append('frontend',removeKey(frontend));
        formData.append('backend',removeKey(backend));
        formData.append('database',removeKey(database));
        formData.append('tools',removeKey(tools));
        formData.append('softSkills',removeKey(softSkills));
        formData.append('hobbies',JSON.stringify(hobbies));
        formData.append('rating',JSON.stringify(rating));
        
      axios.post("http://localhost:8080/createProfile",formData)
      .then(res => {
        if (res.data.success) {
          props.history.push("/profiles");
        }
        else {
          console.log(res.data);
        }
      }).catch(err => {
        alert(err.message);
       
      });      
      }

    const delEdHandler =(i)=>{
      
      
      setEducation(education.filter(ed=>{
        console.log("_id",ed._id," i: ",i,ed._id!==i);
       return ed._id!==i;
      }));
    }
    const delExHandler = (i)=>{
      setExperience(experience.filter(ex=>ex._id!==i));
    }
    const delFrontHandler = (i)=>{
      setFrontend(frontend.filter(ex=>ex._id!==i));
    }
    const delLangHandler = (i)=>{
      setLanguage(language.filter(ex=>{
        console.log("_id",ex._id," i: ",i,ex._id!==i);
        return ex._id!==i;
      }));
    }
    const delBackHandler = (i)=>{
      setBackend(backend.filter(ex=>ex._id!==i));
    }
    const delDbHandler = (i)=>{
      setDatabase(database.filter(ex=>ex._id!==i));
    }
    const delToolHandler =(i)=>{ setTools(tools.filter(ex=>ex._id!==i));}
    const delSoftSkillHandler =(i)=>{ setSoftSkills(softSkills.filter(ex=>ex._id!==i));}

    return (
      <div>
        <Nav show={true} menu={true} />
         <div className="mt-170 m-4 p-4 bg-light rounded" >
           <h1> Create Profile </h1>
           <form onSubmit={submitHandler} >
              <div className="row">
                <div className="col-12 col-lg-6 mb-3 p-3">
                  <div className="shadow h-100 p-3" >
                    <h3 className="mb-3">Personal Information</h3>
                    
                    <div className="form-group input-group">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-user" ></i></div>
                            <input type="file" name="profilePic" ref={profilePicRef} placeholder="Upload Profile Pic" className="form-control"/>
                    </div>
                    <div className="form-group input-group">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-user" ></i></div>
                            <input type="text" name="firstName" value={personalInfo.firstName} onChange={(e)=>setPersonalInfo({...personalInfo,firstName:e.target.value})} placeholder="Enter First Name" className="form-control" required />
                    </div>
                    <div className="form-group input-group">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fas fa-user" ></i></div>
                            <input type="text" name="lastName" value={personalInfo.lastName} onChange={(e)=>setPersonalInfo({...personalInfo,lastName:e.target.value})} placeholder="Enter Last Name" className="form-control" required/>
                    </div>
                    <div className="form-group input-group">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-user" ></i></div>
                            <input type="text" name="title" placeholder="Enter Title" value={personalInfo.title} onChange={(e)=>setPersonalInfo({...personalInfo,title:e.target.value})} className="form-control" required />
                    </div>
                    <div className="text-left" >Rating</div>
                    <div className="form-group input-group">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fas fa-star" ></i></div>
                            <input type="number" min="1" max="5" name="rating"  placeholder="Enter Rating" value={rating} onChange={(e)=>setRating(e.target.value)} className="form-control" />
                    </div>
                  </div>

                </div>
                <div className="col-12 col-lg-6 mb-3 p-3">
                  <div className="shadow h-100 p-3" >
                    <h3 className="mb-3">Contact</h3>
                    
                    <div className="form-group input-group">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-envelope" ></i></div>
                            <input type="email" name="email"  placeholder="Enter email" value={contact.email} onChange={(e)=>setContact({...contact,email:e.target.value})} className="form-control" />
                    </div>
                    <div className="form-group input-group">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fa fa-phone-alt" ></i></div>
                            <input type="tel" name="phone" placeholder="Enter Phone Number" value={contact.phone} onChange={(e)=>setContact({...contact,phone:e.target.value})} className="form-control" />
                    </div>
                    <div className="form-group input-group">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fab fa-github" ></i></div>
                            <input type="url" name="github" placeholder="Enter Github URL" value={contact.github} onChange={(e)=>setContact({...contact,github:e.target.value})} className="form-control" />
                    </div>
                    <div className="form-group input-group">
                            <div className="input-group-prepend rounded bg-grad text-white pl-3 pr-3 pt-2 f-20 " ><i className="fab fa-youtube" ></i></div>
                            <input type="url" name="youtube" placeholder="Enter Youtube URL" value={contact.youtube} onChange={(e)=>setContact({...contact,youtube:e.target.value})} className="form-control" />
                    </div>
                  </div>

                </div>
              
              <div className="col-12 col-lg-6 mb-3 p-3">
                  <div className="shadow h-100 p-3" >
                  <h3 className="mb-3">Education</h3>
                    
                    <Education addEd={(data)=>{setEducation([...education,{...data,_id:id}]);setID(id+1)}} ed={education} del={(i)=>delEdHandler(i)}  />
                  </div>
              </div>
              <div className="col-12 col-lg-6 mb-3 p-3">
                  <div className="shadow h-100 p-3" >
                  <h3 className="mb-3">Experience</h3>
                    <Experience addEx={(data)=>{setExperience([...experience,{...data,_id:id}]);setID(id+1)}} ex={experience} del={(i)=>delExHandler(i)}  />
                    
                  </div>
              </div>
              <div className="col-12 col-lg-6 mb-3 p-3">
                  <div className="shadow h-100 p-3" >
                  <h3 className="mb-3">Language</h3>
                  <CreateSkill addSk={(data)=>{setLanguage([...language,{...data,_id:id}]);setID(id+1)}} sk={language} del={(i)=>delLangHandler(i)} op={languageOptions} />
                    
                  </div>
              </div>
              <div className="col-12 col-lg-6 mb-3 p-3">
                  <div className="shadow h-100 p-3" >
                  <h3 className="mb-3">Frontend</h3>
                  <CreateSkill addSk={(data)=>{setFrontend([...frontend,{...data,_id:id}]);setID(id+1)}} sk={frontend} del={(i)=>delFrontHandler(i)} op={frontendOptions} />
                    
                  </div>
              </div>
              <div className="col-12 col-lg-6 mb-3 p-3">
                  <div className="shadow h-100 p-3" >
                  <h3 className="mb-3">Backend</h3>
                  <CreateSkill addSk={(data)=>{setBackend([...backend,{...data,_id:id}]);setID(id+1)}} sk={backend} del={(i)=>delBackHandler(i)} op={backendOptions} />
                    
                  </div>
              </div>
              <div className="col-12 col-lg-6 mb-3 p-3">
                  <div className="shadow h-100 p-3" >
                  <h3 className="mb-3">Database</h3>
                  <CreateSkill addSk={(data)=>{setDatabase([...database,{...data,_id:id}]);setID(id+1)}} sk={database} del={(i)=>delDbHandler(i)} op={databaseOptions} />
                    
                  </div>
              </div>
              <div className="col-12 col-lg-6 mb-3 p-3">
                  <div className="shadow h-100 p-3" >
                  <h3 className="mb-3">Tools / Mobile</h3>
                  <CreateSkill addSk={(data)=>{setTools([...tools,{...data,_id:id}]);setID(id+1)}} sk={tools} del={(i)=>delToolHandler(i)} op={toolsOptions} />
                    
                  </div>
              </div>
              <div className="col-12 col-lg-6 mb-3 p-3">
                  <div className="shadow h-100 p-3" >
                  <h3 className="mb-3">Soft Skills</h3>
                  <CreateSoftSkill addSk={(data)=>{setSoftSkills([...softSkills,{...data,_id:id}]);setID(id+1)}} sk={softSkills} del={(i)=>delSoftSkillHandler(i)}  />
                    
                  </div>
              </div>
              <div className="col-12 col-lg-6 mb-3 p-3">
                  <div className="shadow h-100 p-3" >
                    <h3 className="mb-3">Hobbies</h3>
                    <ol className="ml-3 text-left">
                      {hobbies.map(hob=>(<li key={hob}>{hob}</li>))}
                    </ol>
                    <div className="form-group input-group">       
                              <input type="text" name="hobbie" placeholder="Enter Hobby Name" value={hobby} onChange={e=>setHobby(e.target.value)} className="form-control" />
                    </div>
                    <button className="btn btn-primary" onClick={(e)=>{e.preventDefault(); setHobbies([...hobbies,hobby]);setHobby(""); }} >Add</button>          
                  </div>
              </div>
              </div>
              <button className="btn bg-grad text-white btn-lg"> Submit </button>
           </form>
         </div>
      </div>
    );
}

export default CreateProfile;
