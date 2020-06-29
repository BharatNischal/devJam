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
import Deliverable2 from './components/markingSystem/deliverable';
import Test from './components/tests/Test';
import CreateTest from './components/tests/createTest';
import PublishTest from './components/tests/publishTest';
import LiveTest from './components/tests/LiveTests/LiveTest';
import TestFinished from './components/tests/LiveTests/testFinished';
import Results from './components/tests/results/results';
import ResultSingle from './components/tests/results/resultSingle/resultSingle';
import ResultSingleStudent from './components/tests/results/resultSingle/resultSingleStudent';
import Tests from './components/tests/learnerPlatform/tests';

import Courses from './components/courses/courses';
import CreateCourse from './components/courses/createCourse';
import PublishCourse from './components/courses/publishCourse'

axios.defaults.withCredentials = true;

function App(props) {
    const {setUser,user} = useContext(CurUserContext);
    const [first,setFirst]=useState(true);

    useEffect(()=>{
        axios.get("/curUser")
          .then(res=>{
            if(res.data.user){
              setUser({loggedIn:true,superAdmin:res.data.user.superAdmin,name:res.data.user.name,profilePic:res.data.user.profilePic,student:res.data.user.student,notifications:res.data.user.notifications});
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
            <Route path="/marks/deliverable/:id" exact component={Deliverable2}/>
            <Route path="/test" exact component={Test} />
            <Route path="/test/finished" exact component={TestFinished} />
            <Route path="/test/:id" exact component={CreateTest} />
            <Route path="/publish/test/:id" exact component={PublishTest} />
            <Route path="/livetest/:id" exact component={LiveTest} />
            <Route path="/result/test/:id" exact component={Results} />
            <Route path="/resultSingle/:userId/:testId" exact component={ResultSingle} />
            <Route path="/resultSingleStudent/:testId" exact component={ResultSingleStudent} />
            <Route path="/allTests/" exact component={Tests} />

            <Route path="/courses/" exact component={Courses} />
            <Route path="/course/:id" exact component={CreateCourse} />
            <Route path="/publish/course/:id" exact component={PublishCourse} />

          </Switch>
          )}

        </div>

    </BrowserRouter>
  )
}

export default App;
