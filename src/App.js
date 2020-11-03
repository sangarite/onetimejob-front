import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Navigation from './components/Navigation/NavigationBar'

const initialState = {
  user: {},
  isSignIn: false
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.handleUserIn = this.handleUserIn.bind(this);
    this.handleUserOut = this.handleUserOut.bind(this);
  }

  handleUserIn(user) {
    this.setState({ user: user, isSignIn: true });
    this.props.history.push('/');
  }

  handleUserOut() {
    this.setState({ user: {}, isSignIn: false });
    this.props.history.push('/');
  }

  render() {
    return(
      <div>
        <Navigation
          isSignIn={this.state.isSignIn}
          user={this.state.user}
          handleUserIn={this.handleUserIn}
          handleUserOut={this.handleUserOut}
        />
      </div>
    );
  }
}

export default withRouter(App);
