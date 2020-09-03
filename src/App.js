import React, { Component } from 'react';
import UserSettings from './components/UserSettings/usersettings.js';

const initialState = {
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    rank: 0,
    jobs: 0,
    img: ''
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