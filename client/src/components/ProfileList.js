import React,{useEffect,useState} from "react";
import IndividualProfile from "./individualProfile";
import axios from "axios";
import Nav from "./profile/Nav/Nav";

const ProfileList = (props)=>{

      const [profiles,setProfiles] = useState([]);
      const [name,setName] = useState("");
      const [search,setSearch] = useState(false);
      const [copyAlert,setCopyAlert] = useState(false);

      const fetchProfiles = async () => {
         const response = await axios.get(`/Profiles`);
         console.log(response);
         if(response.data && !response.data.success){
            props.history.push("/login")
         }
         else if(response.data){
           setProfiles(response.data.profiles?response.data.profiles:[]);
         }
      }

      useEffect(()=>{
        fetchProfiles();
      },[]);

      const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post("/search",{name})
          .then(res=>{
              if(res.data.success){
                setProfiles(res.data.profiles);
                setSearch(true);
              }
          })
          .catch(err=>{
            console.log(err.msg);
          })
          setName("");
      }

      const copyAlertHandler=()=>{
        setCopyAlert(true);
        setTimeout(()=>{setCopyAlert(false)},2000);
      }


    const list = profiles.map(profile=>(
                    <IndividualProfile key={profile._id} data={profile} showCopyAlert={copyAlertHandler}/>
                ))
    const remove = search?<span className="text-center pointer text-white" onClick={()=>{fetchProfiles();setSearch(false)}} ><i class="fa fa-remove"></i> Remove Search result</span>:null;

    return (
      <React.Fragment>
      <Nav show={true} menu={true}/>
      <div className="container"  style={{marginTop:"100px"}}>
        <h2 className="mt-5 text-white">Developer Profiles</h2>
          {remove}
          <form className="form-inline text-center float-right" onSubmit={handleSubmit}>
            <input name='titleSearch' type="search" placeholder="Search by name" value={name} onChange={(e)=>{setName(e.target.value)}} aria-label="Search" style={{background:'inherit',border:'none',borderBottom:'2px solid white',color:'white',outline:"none"}}/>
            <button type="submit" style={{backgroundColor:'transparent',border:'none',margin:'none',outline:"none"}}><i className="fa fa-search" aria-hidden="true" style={{cursor:'pointer',color:'white'}}></i></button>
          </form>
          <h5 className="float-left text-white mb-2">Total profiles: {profiles.length}</h5>
        <div className="row mt-5">

          {list}
        </div>

      </div>
      {copyAlert?<div className="custom-alert"> Link Coppied to Clibard </div>:null}
      </React.Fragment>
    );
}

export default ProfileList;
