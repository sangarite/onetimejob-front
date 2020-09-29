import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import Signin from '../Signin';
import About from '../About';
import Help from '../Help';
import Register from '../Register';
import Entrance from '../Entrance/Entrance.js';
import JobList from '../JobList';
import PublishJob from '../PublishJob';
import UserSettings from '../UserSettings/UserSettings.js';
import Notifications from '../Notifications';
import  './Navigation.css';
import logo from '../../Logo.png'

export default function NavigationBar(props)
{
    var sign=props.isSignIn;
    if(sign==false)
    return(
      <div>
        <div id="navigation">
          <Link to="/" > <img src={logo} alt="logo" className="App-logo" ></img> בית</Link>
          <Link to="/signin">כניסה</Link>
          <Link to="/register">הרשמה</Link>
          <Link to="/about">עלינו</Link>
          <Link to="/help">עזרה</Link>
        
        </div>
        <Switch>
          <Route path="/signin"><Signin/></Route>
          <Route path="/register"><Register/></Route>
          <Route path="/about"><About/></Route>
          <Route path="/help"><Help/></Route>
          <Route path="/joblist"><JobList/></Route>
          <Route path="/publishjob"><PublishJob/></Route>
          <Route path="/usersettings"><UserSettings/></Route>
          <Route path="/notifications"><Notifications/></Route>
          <Route path="/"><Entrance/></Route>
        </Switch>
      </div>
    );
   else
    {
      return(
          <div> 
         <Switch>
        <Route path="/signin"><Signin/></Route>
        <Route path="/register"><Register/></Route>
        <Route path="/about"><About/></Route>
        <Route path="/help"><Help/></Route>
        <Route path="/joblist"><JobList/></Route>
        <Route path="/publishjob"><PublishJob/></Route>
        <Route path="/usersettings"><UserSettings/></Route>
        <Route path="/notifications"><Notifications/></Route>
        <Route path="/"><Entrance/></Route>
      </Switch>
             </div>

      );
    }
}
