import React, { Component } from 'react';
import Navigation from './components/NavigationBar'
import Entrance from './components/Entrance/Entrance.js';
import question from './question_mark.png';

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
        <Entrance />
      </div>
    );
  }
}

export default App;
