import React, { Component } from 'react';
import UserSettings from './components/UserSettings/usersettings.js';
import question from './question_mark.png';

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
        <UserSettings user={this.state.user}/>
      </div>
    );
  }
}

export default App;
