import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Navigation from './components/Navigation/NavigationBar'

const initialState = {
  user: {},
  isSignIn: false,
  messages: []
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.handleUserIn = this.handleUserIn.bind(this);
    this.handleUserOut = this.handleUserOut.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/delete', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    console.log('deleted jobs');
  }

  handleUserIn(user) {
    fetch(`http://localhost:3000/messages/${user.user_id}`)
    .then(response => response.json())
    .then(data => this.setState({messages: data}))
    this.setState({ user: user, isSignIn: true });
    this.props.history.push('/');
  }

  handleUserOut() {
    this.setState({ user: {}, isSignIn: false, messages: [] });
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
          messages={this.state.messages}
        />
      </div>
    );
  }
}

export default withRouter(App);
