import React,{useEffect,useState} from "react";
import IndividualProfile from "./individualProfile";
import axios from "axios";
import Nav from "./profile/Nav/Nav";

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

    const list = profiles.map(profile=>(
                    <IndividualProfile key={profile._id} data={profile}/>
                ))

    return (
      <React.Fragment>
      <Nav menu={true} isLogin={true} show={true}/>
      <div className="container"  style={{marginTop:"100px"}}>
        <h2 className="mt-5 text-white">Developers Profiles</h2>
        <div className="row mt-5">
          {list}
        </div>
      </div>
      </React.Fragment>
    );
}

export default ProfileList;
