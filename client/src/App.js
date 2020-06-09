import React,{useContext,useEffect, useState} from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import './App.css';
import Profile from "./components/profile/profile";
import LoginForm from "./components/loginForm/loginForm";
import ProfileList from "./components/ProfileList";
import CreateProfile from "./components/createProfile/createProfile";
import VideoPage from "./components/content/Video";
import Dashboard from "./components/Dashboard";
import ResetPassword from "./components/resetPassword";
import Homepage from "./components/homepage";

import axios from "axios";
import {CurUserContext} from "./contexts/curUser";
import Deliverable from './components/content/deliverable';
import Topic from './components/content/topic';
import Content from './components/content/content';
import StDash from './components/stdash';
import VideoPlayer from './components/videoPlayer';
import Comment from './components/comments';

axios.defaults.withCredentials = true;

function App(props) {
    const {setUser,user} = useContext(CurUserContext);
    const [first,setFirst]=useState(true);

    useEffect(()=>{
        axios.get("/curUser")
          .then(res=>{
            if(res.data.user){
              setUser({loggedIn:true,superAdmin:res.data.user.superAdmin,name:res.data.user.name,profilePic:res.data.user.profilePic});
            }else{
              setUser({loggedIn:false,superAdmin:"",name:"",profilePic:null});
            }
            setFirst(false);
          })
          .catch(err=>{
            setFirst(false);
            setUser({loggedIn:false,superAdmin:""});

          });
    },[]);

  return (
    <BrowserRouter>

        <div className="App">
          {first?<img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif" />:(
            <Switch>
            <Route path="/" exact component={Homepage}/>
            <Route path="/profiles" exact component={ProfileList}/>
            <Route path="/adminDashboard" exact component={Dashboard}/>
            <Route path="/profile/:name/:id" exact component={Profile}/>
            <Route path="/login" exact component={LoginForm}/>
            <Route path="/deliverable/:id" exact component={Deliverable}/>
            <Route path="/topic/:id" exact component={Topic} />
            <Route path="/content" exact component={Content} />
            <Route path="/video/:id" exact component={VideoPage}/>
            <Route path="/createProfile" exact component={CreateProfile}/>
  <Route path="/editProfile/:name/:id" exact  render={(props) => <CreateProfile {...props} edit={true} />}/>
            <Route path="/reset/:token" exact component={ResetPassword}/>

            <Route path="/studDash" exact component={StDash} />
            <Route path="/video" exact component={VideoPlayer}/>
            <Route path="/comment" exact component={Comment}/>
          </Switch>
          )};

        </div>

    </BrowserRouter>
  );
}

export default App;
