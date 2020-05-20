import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import './App.css';
import Profile from "./components/profile/profile";
import LoginForm from "./components/loginForm/loginForm";
import ProfileList from "./components/ProfileList";
import CreateProfile from "./components/createProfile";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/profiles" exact component={ProfileList}/>
          <Route path="/profile/:name/:id" exact component={Profile}/>
          <Route path="/login" exact component={LoginForm}/>
          <Route path="/createProfile" exact component={CreateProfile}/>
          <Route path="/editProfile/:name/:id" exact component={Profile}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
