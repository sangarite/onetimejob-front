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
import Notifications from '../Notifications/Notifications'
import Out from '../Out/Out'
import NotFound from '../notFound/not_found'

import './Navigation.css'
import logo from '../../images/logo.png'

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      jobs: [],
      displayLoader: false,
      seen: 0
    }
    this.toggleLoader = this.toggleLoader.bind(this);
    this.unSeenCount = this.unSeenCount.bind(this);
    this.updateJobs = this.updateJobs.bind(this);
    this.seeMessages = this.seeMessages.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/help')
    .then(response => response.json())
    .then(data => this.setState({questions: data}))
    .catch(error => console.log('error getting questions. err: ', error))

    fetch(`http://localhost:3000/jobs?order='publish_date'&by=DESC&categories=&area=&city=&date='10'&min=0&max=10000`)
    .then(response => response.json())
    .then(data => this.setState({jobs: data}))
    .catch(error => console.log('error getting jobs. err: ', error))
  }

  toggleLoader() {
    this.setState({displayLoader: !this.state.displayLoader})
  }

  unSeenCount() {
    let count = 0;
    this.props.messages.map((message) => {
      if(!message.seen) count++;
      return message;
    })
    this.setState({seen: count});
  }

  seeMessages() {
    console.log('seeMessages');
    fetch(`http://localhost:3000/messages/${this.props.user.user_id}`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => this.setState({seen: 0}))
    .catch(err => console.log(err))
  }

  updateJobs() {
    fetch(`http://localhost:3000/jobs?order='publish_date'&by=DESC&categories=&area=&city=&date='10'&min=0&max=10000`)
    .then(response => response.json())
    .then(data => this.setState({jobs: data}))
    .catch(error => console.log(error))
    console.log(this.state.jobs);
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
              <Link to="/notifications" className="link" onClick={this.updateMessages}>
                <span>הודעות</span>
                <span className="badge">{this.state.seen}</span>
              </Link>
              <Link to="/jobs" className="link">עבודות</Link>
              <Link to="/publish" className="link">פרסום עבודה</Link>
              <Link to="/out" className="link">יציאה</Link>
            </div>
          :
            <div id="navigation">
              <Link to="/"><img src={logo} alt="logo" className="logo"/></Link>
              <Link to="/signin" className="link">כניסה</Link>
              <Link to="/register" className="link">הרשמה</Link>
              <Link to="/jobs" className="link">עבודות</Link>
              <Link to="/about" className="link">עלינו</Link>
              <Link to="/help" className="link">עזרה</Link>
            </div>
        }
        <Switch>
          <Route path="/signin">
            <Signin
              handleUserIn={this.props.handleUserIn}
              toggleLoader={this.toggleLoader}
              displayLoader={this.state.displayLoader}
            />
          </Route>
          <Route path="/register">
            <Register
              handleUserIn={this.props.handleUserIn}
              toggleLoader={this.toggleLoader}
              displayLoader={this.state.displayLoader}
            />
          </Route>
          <Route path="/about"><About /></Route>
          <Route path="/help">
            <Help
              questions={this.state.questions}
              toggleLoader={this.toggleLoader}
              displayLoader={this.state.displayLoader}
            />
          </Route>
          <Route path="/job/:id" render = {props =>
            <Job
              {...props}
              jobs={this.state.jobs}
              user={this.props.user}
            />
          } />
          <Route path="/jobs">
            <Jobs
              jobs={this.state.jobs}
              toggleLoader={this.toggleLoader}
              displayLoader={this.state.displayLoader}
            />
          </Route>
          <Route path="/publish">
            <PublishJob
              isSignIn={this.props.isSignIn}
              user={this.props.user}
              updateJobs={this.updateJobs}
              toggleLoader={this.toggleLoader}
              displayLoader={this.state.displayLoader}
            />
          </Route>
          <Route path="/settings">
            <UserSettings
              user={this.props.user}
              handleUserOut={this.props.handleUserOut}
              toggleLoader={this.toggleLoader}
              displayLoader={this.state.displayLoader}
            />
          </Route>
          <Route path="/notifications">
            <Notifications
              id={this.props.user.user_id}
              toggleLoader={this.toggleLoader}
              displayLoader={this.state.displayLoader}
              messages={this.props.messages}
              updateMessages={this.props.updateMessages}
              seeMessages={this.seeMessages}
            />
          </Route>
          <Route path="/out">
            <Out
              handleUserOut={this.props.handleUserOut}
            />
          </Route>
          <Route path="/404"><NotFound /></Route>
          <Route path="/"><Entrance /></Route>
        </Switch>
      </div>
    );
  }
}

export default NavigationBar;
