import React,{useEffect,useState} from "react";
import IndividualProfile from "./individualProfile";
import axios from "axios";

const ProfileList = (props)=>{

      const [profiles,setProfiles] = useState([]);

      useEffect(()=>{
        const fetchProfiles = async () => {
           const response = await axios.get(`http://localhost:8080/profiles`);
           console.log(response);
           if(response.data && !response.data.success){
              props.history.push("/login")
           }
           if(response.data){

             setProfiles(response.data.profiles?response.data.profiles:[]);
           }
        }
        fetchProfiles();
      },[]);

    const list = profiles.map(profile=>(
                    <IndividualProfile key={profile._id} data={profile}/>
                ))

    return (
      <div className="container">
        <h2 className="mt-5 text-white">Developers Profiles</h2>
        <div className="row mt-5">
          {list}
        </div>
      </div>
    );
}

export default ProfileList;
