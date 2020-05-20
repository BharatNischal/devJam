import React,{useEffect,useState} from "react";
import IndividualProfile from "./individualProfile";
import axios from "axios";

const ProfileList = (props)=>{

      const [profiles,setProfiles] = useState([]);

      useEffect(()=>{
        const fetchProfiles = async () => {
           const response = await axios.get(`http://localhost:8080/profiles`);
           if(response.data){
             setProfiles(response.data);
           }
        }
        fetchProfiles();
      },[]);

    return (
      profiles.map(profile=>(
          <IndividualProfile key={profile._id} data={profile}/>
      ))
    );
}

export default ProfileList;
