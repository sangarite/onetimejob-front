import React, { Component } from 'react';
import Navigation from './components/Navigation/NavigationBar'
import question from './question_mark.png';

const initialState = {
  user: {
    id: '1',
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
        <Navigation isSignIn={this.state.isSignIn} user={this.state.user}/>
      </div>
    );
  }
}

export default App;
