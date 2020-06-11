import React, {createContext,useState} from 'react';

export const CurUserContext = createContext();

const CurUserContextProvider = (props)=>{
  const [user,setUser] = useState({login:false,superAdmin:false,name:"",profilePic:null,student:false});
  return(
    <CurUserContext.Provider value={{user,setUser}}>
    {props.children}
    </CurUserContext.Provider>
  );
}

export default CurUserContextProvider;
