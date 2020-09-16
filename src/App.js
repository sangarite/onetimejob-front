import React, { Component } from 'react';
import Navigation from './components/Navigation/NavigationBar'
import question from './question_mark.png';
import UserSettings from './components/UserSettings/UserSettings.js';

const initialState = {
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    rank: 0,
    jobs: 0,
    src: question
  },
  isSignIn: false
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  render() {
    return(
      <div>
        <UserSettings user={this.state.user}/>
      </div>
    );
  }
}

export default App;
