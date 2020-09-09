import React, { Component } from 'react';
import UserSettings from './components/UserSettings/usersettings.js';
import question from './question_mark.png';
import Navigation from './components/NavigationBar'
import Basic from './components/UserSettings/SubComponents/Basic/Basic.js';
const initialState = {
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    rank: 0,
    jobs: 0,
    src: question
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  render() {
    return(
      <div>
        <Navigation/>
        
      </div>
    );
  }
}

export default App;
