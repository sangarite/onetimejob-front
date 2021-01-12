import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Navigation from './components/Navigation/NavigationBar'

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isSignIn: false,
      messages: []
    };
    this.updateMessages = this.updateMessages.bind(this);
    this.handleUserIn = this.handleUserIn.bind(this);
    this.handleUserOut = this.handleUserOut.bind(this);
  }

  componentDidMount() {
    //deleting expired jobs
    fetch('http://localhost:3000/delete', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => console.log('deleted expired jobs'))
    .catch(err => console.log('error deleting expired jobs'))
  }

  updateMessages() {
    fetch(`http://localhost:3000/messages/${this.state.user.user_id}`)
    .then(response => response.json())
    .then(data => this.setState({messages: data}))
    .catch(err => console.log('could not get user messages. err: ', err))
  }

  handleUserIn(user) {
    this.setState({ user: user, isSignIn: true });
    this.updateMessages();
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
          updateMessages={this.updateMessages}
        />
      </div>
    );
  }
}

export default withRouter(App);
