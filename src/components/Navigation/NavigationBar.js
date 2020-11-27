import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import Signin from '../SignIn/Signin'
import About from '../About'
import Help from '../Help/Help'
import Register from '../Register/Register'
import Entrance from '../Entrance/Entrance'
import Jobs from '../Jobs/Jobs'
import Job from '../Job/Job'
import PublishJob from '../PublishJob/PublishJob'
import UserSettings from '../UserSettings/UserSettings'
import Notifications from '../Notifications'
import Out from '../Out'

import './Navigation.css'
import logo from '../../images/logo.png'

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      jobs: []
    }
  }

  componentDidMount() {
      fetch('http://localhost:3000/help')
      .then(response => response.json())
      .then(data => this.setState({questions: data}))
      .catch(error => console.log(error))

      fetch(`http://localhost:3000/jobs?filter='publish_date'`)
      .then(response => response.json())
      .then(data => this.setState({jobs: data}))
      .catch(error => console.log(error))
  }

  render() {
    return(
      <div>
        {
          this.props.isSignIn ?
            <div id="navigation">
              <Link to="/"><img src={logo} alt="logo" className="logo"/></Link>
              <Link to="/about" className="link">עלינו</Link>
              <Link to="/help" className="link">עזרה</Link>
              <Link to="/settings" className="link">הגדרות</Link>
              <Link to="/notifications" className="link">הודעות</Link>
              <Link to="/out" className="link">יציאה</Link>
            </div>
          :
            <div id="navigation">
              <Link to="/"><img src={logo} alt="logo" className="logo"/></Link>
              <Link to="/signin" className="link">כניסה</Link>
              <Link to="/register" className="link">הרשמה</Link>
              <Link to="/about" className="link">עלינו</Link>
              <Link to="/help" className="link">עזרה</Link>
            </div>
        }
        <Switch>
          <Route path="/signin"><Signin handleUserIn={this.props.handleUserIn}/></Route>
          <Route path="/register"><Register handleUserIn={this.props.handleUserIn}/></Route>
          <Route path="/about"><About /></Route>
          <Route path="/help"><Help questions={this.state.questions}/></Route>
          <Route path="/job/:id" render = {props => <Job {...props} jobs={this.state.jobs} user={this.props.user}/> } />
          <Route path="/jobs"><Jobs jobs={this.state.jobs}/></Route>
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
