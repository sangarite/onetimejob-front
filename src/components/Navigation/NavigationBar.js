import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import Signin from '../SignIn/Signin'
import About from '../About'
import Help from '../Help'
import Register from '../Register/Register'
import Entrance from '../Entrance/Entrance'
import JobList from '../JobList'
import PublishJob from '../PublishJob/PublishJob'
import UserSettings from '../UserSettings/UserSettings'
import Notifications from '../Notifications'
import Out from '../Out'

import './Navigation.css'
import logo from '../../Logo.png'

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        {
          this.props.isSignIn ?
            <div id="navigation">
              <Link to="/">בית</Link>
              <Link to="/about">עלינו</Link>
              <Link to="/help">עזרה</Link>
              <Link to="/settings">הגדרות</Link>
              <Link to="/notifications">הודעות</Link>
              <Link to="/out">יציאה</Link>
            </div>
          :
            <div id="navigation">
              <Link to="/">בית</Link>
              <Link to="/signin">כניסה</Link>
              <Link to="/register">הרשמה</Link>
              <Link to="/about">עלינו</Link>
              <Link to="/help">עזרה</Link>
            </div>
        }
        <Switch>
          <Route path="/signin"><Signin handleUserIn={this.props.handleUserIn}/></Route>
          <Route path="/register"><Register handleUserIn={this.props.handleUserIn}/></Route>
          <Route path="/about"><About /></Route>
          <Route path="/help"><Help /></Route>
          <Route path="/jobs"><JobList /></Route>
          <Route path="/publish"><PublishJob isSignIn={this.props.isSignIn} user={this.props.user}/></Route>
          <Route path="/settings"><UserSettings user={this.props.user} handleUserOut={this.props.handleUserOut}/></Route>
          <Route path="/notifications"><Notifications id={this.props.user.user_id}/></Route>
          <Route path="/out"><Out handleUserOut={this.props.handleUserOut}/></Route>
          <Route path="/"><Entrance /></Route>
        </Switch>
      </div>
    );
  }
}

export default NavigationBar;
