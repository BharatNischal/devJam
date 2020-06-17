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
import StudentTopic from "./components/learnerPlatform/topic/topic";
import Content from './components/content/content';
import StDash from './components/stdash';
import VideoPlayer from './components/learnerPlatform/videoPlayer';
import SignupForm from './components/learnerPlatform/signup';
import Comment from './components/learnerPlatform/commentlist';

import MarksList from './components/markingSystem/marks';
import SubmissionPage from './components/markingSystem/submission';
import DeliverableMarks from './components/markingSystem/deliverable';
// import Submission2 from './components/markingSystem/submission2';

axios.defaults.withCredentials = true;

function App(props) {
    const {setUser,user} = useContext(CurUserContext);
    const [first,setFirst]=useState(true);

    useEffect(()=>{
        axios.get("/curUser")
          .then(res=>{
            if(res.data.user){
              setUser({loggedIn:true,superAdmin:res.data.user.superAdmin,name:res.data.user.name,profilePic:res.data.user.profilePic,student:res.data.user.student});
            }else{
              setUser({loggedIn:false,superAdmin:"",name:"",profilePic:null,student:false});
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
            <Route path="/signup" exact component={SignupForm}/>
            <Route path="/deliverable/:id" exact component={Deliverable}/>
            <Route path="/topic/:id" exact component={Topic} />
            <Route path="/content" exact component={Content} />
            <Route path="/video/:id" exact component={VideoPage}/>
            <Route path="/createProfile" exact component={CreateProfile}/>
            <Route path="/editProfile/:name/:id" exact  render={(props) => <CreateProfile {...props} edit={true} />}/>
            <Route path="/reset/:token" exact component={ResetPassword}/>

            <Route path="/topic/:topicId/:itemId" exact component={StudentTopic} />
            <Route path="/studDash" exact component={StDash} />
            <Route path="/video" exact component={VideoPlayer}/>
            <Route path="/comment" exact component={Comment}/>
            <Route path="/marks" exact component={MarksList}/>
            <Route path="/submission/:id/:index" exact component={SubmissionPage}/>
            <Route path="/marks/deliverable/:id" exact component={DeliverableMarks}/>
          </Switch>
          )}

        </div>

    </BrowserRouter>
  )
}

export default App;
