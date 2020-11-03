import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import Signin from '../SignIn/Signin';
import About from '../About';
import Help from '../Help';
import Register from '../Register/Register';
import Entrance from '../Entrance/Entrance.js';
import JobList from '../JobList';
import PublishJob from '../PublishJob/PublishJob.js';
import UserSettings from '../UserSettings/UserSettings.js';
import Notifications from '../Notifications';
import  './Navigation.css';
import logo from '../../Logo.png'

export default function NavigationBar(props)
{
    var sign=props.isSignIn;
    var user = props.user;
    //how can i get the picture of the user, I want to assimilate it inside the navigationbar?
    if(sign===false)
    return(
      <div>
        <div id="navigation">
          <Link to="/" ><img src={logo} alt="logo" className="App-logo" ></img> בית</Link>
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
          <Route
            path="/publishjob"
            render={(props) => <PublishJob {...props} userId={user.id}/>}
          />
          <Route path="/usersettings"><UserSettings/></Route>
          <Route path="/notifications"><Notifications/></Route>
          <Route path="/"><Entrance/></Route>
        </Switch>
      </div>
    );
}
