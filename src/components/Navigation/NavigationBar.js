import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import Signin from '../SignIn/Signin'
import About from '../About/About'
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
import menu from './menu.png'

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

  //get questions and jobs
  componentDidMount() {
    fetch('https://onetimejob-server.herokuapp.com/help')
    .then(response => response.json())
    .then(data => this.setState({questions: data}))
    .catch(error => console.log('error getting questions. err: ', error))

    fetch(`https://onetimejob-server.herokuapp.com/jobs?order='publish_date'&by=DESC&categories=&area=&city=&date='10'&min=0&max=10000`)
    .then(response => response.json())
    .then(data => this.setState({jobs: data}))
    .catch(error => console.log('error getting jobs. err: ', error))
  }

  //toggle loader
  toggleLoader() {
    this.setState({displayLoader: !this.state.displayLoader})
  }

  //count unseen messages
  unSeenCount() {
    let count = 0;
    this.props.messages.map((message) => {
      if(!message.seen) count++;
      return message;
    })
    this.setState({seen: count});
  }

  //update unseen messages
  seeMessages() {
    fetch(`https://onetimejob-server.herokuapp.com/messages/${this.props.user.user_id}`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => this.setState({seen: 0}))
    .catch(err => console.log(err))
  }

  //update jobs
  updateJobs() {
    fetch(`https://onetimejob-server.herokuapp.com/jobs?order='publish_date'&by=DESC&categories=&area=&city=&date='10'&min=0&max=10000`)
    .then(response => response.json())
    .then(data => this.setState({jobs: data}))
    .catch(error => console.log('error update jobs. error: ', error))
  }

  //navigation bar for small screens
  responsive() {
    const nav = document.getElementById('navigation');
    const logo = document.getElementsByClassName('logo')[0];
    const icon = document.getElementById('nMenu');
    if (nav.className === "responsive") {
      nav.className = "";
      logo.className = "logo";
      icon.className = "";
    }
    else {
      nav.className = "responsive";
      logo.className = "logo res";
      icon.className = "margin";
    }
  }

  render() {
    return(
      <div>
        <div id="navigation">
          <Link to="/"><img src={logo} alt="logo" className="logo"/></Link>
          <Link to="jobs" className="link">עבודות</Link>
          <Link to="/about" className="link">עלינו</Link>
          <Link to="/help" className="link">עזרה</Link>
          {
            this.props.isSignIn?
            <div>
              <Link to="/settings" className="link">הגדרות</Link>
              <Link to="/notifications" className="link" onClick={this.updateMessages}>
                <span>הודעות</span>
                <span className="badge">{this.state.seen}</span>
              </Link>
              <Link to="/publish" className="link">פרסום עבודה</Link>
              <Link to="/out" className="link">יציאה</Link>
            </div>
            :
            <div>
              <Link to="/signin" className="link">כניסה</Link>
              <Link to="/register" className="link">הרשמה</Link>
            </div>
          }
          <button onClick={this.responsive}>
            <img src={menu} alt="menu" id="nMenu"/>
          </button>
        </div>
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
          <Route path="/about">
            <About />
          </Route>
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
              isSignIn={this.props.isSignIn}
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
              isSignIn={this.props.isSignIn}
              user={this.props.user}
              handleUserOut={this.props.handleUserOut}
              toggleLoader={this.toggleLoader}
              displayLoader={this.state.displayLoader}
            />
          </Route>
          <Route path="/notifications">
            <Notifications
              isSignIn={this.props.isSignIn}
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
              isSignIn={this.props.isSignIn}
            />
          </Route>
          <Route path="/" exact><Entrance /></Route>
          <Route path="/*"><NotFound /></Route>
        </Switch>
      </div>
    );
  }
}

export default NavigationBar;
