import React from 'react'
import './register.css'

class Register extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      email: ''
    }
    this.handleRegister = this.handleRegister.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  handleRegister() {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        password: this.state.password,
        email: this.state.email
      })
    })
    .then(response => response.text())
    .then(data => this.props.handleUserIn(data))
  }

  onInputChange(event) {
    this.setState({[`${event.target.id}`]: event.target.value})
  }

  render() {
    return(
     <div className="topSpace register">
      <label htmlFor="name">שם משתמש</label>
      <input
        id="name"
        onChange={this.onInputChange}
        type="text"
        spellCheck="false"
        maxLength="30"
        required
        autoFocus
      />
      <label htmlFor="email">אמייל</label>
      <input
        id="email"
        onChange={this.onInputChange}
        type="email"
        required
        spellCheck="false"
      />
      <label htmlFor="password">סיסמה</label>
      <input
        id="password"
        onChange={this.onInputChange}
        type="password"
        required
        spellCheck="false"
      />
      <input type="submit" onClick={this.handleRegister} value="שלח" id="send"/>
      </div>
    )
  }
}

export default Register;
