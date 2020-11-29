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
     <div className="register">
     <br/><br/>
      <input
        id="name"
        onChange={this.onInputChange}
        type="text"
        spellCheck="false"
        maxLength="30"
        required
        placeholder="שם משתמש"
        className="input"
        autoFocus
      />
      <input
        id="email"
        onChange={this.onInputChange}
        type="email"
        required
        placeholder="דואר אלקטרוני"
        className="input"
        spellCheck="false"
      />
      <input
        id="password"
        onChange={this.onInputChange}
        type="password"
        required
        placeholder="סיסמה"
        className="input"
        spellCheck="false"
      />
      <input type="submit" onClick={this.handleRegister} value="שלח" className="button"/>
      </div>
    )
  }
}

export default Register;
