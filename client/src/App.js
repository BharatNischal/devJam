import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import './App.css';
import Profile from "./components/profile/profile";
import LoginForm from "./components/loginForm/loginForm";
import ProfileList from "./components/ProfileList";
import CreateProfile from "./components/createProfile/createProfile";
import Dashboard from "./components/Dashboard";
import ResetPassword from "./components/resetPassword";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/profiles" exact component={ProfileList}/>
          <Route path="/adminDashboard" exact component={Dashboard}/>
          <Route path="/profile/:name/:id" exact component={Profile}/>
          <Route path="/login" exact component={LoginForm}/>
          <Route path="/createProfile" exact component={CreateProfile}/>
          <Route path="/editProfile/:name/:id" exact component={Profile}/>
          <Route path="/reset/:token" exact component={ResetPassword}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
