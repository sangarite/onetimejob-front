import React from 'react'

class Register extends React.Component
{
  constructor() {
    super();
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
  .then(data => console.log(data))
}

onInputChange(event) {
  this.setState({[`${event.target.id}`]: event.target.value})
}

  render() {
    return(
     <div className="topSpace">
        <br />
      {//maybe we should use form to send all the details together
      }
        <p className="form">הכנס את שמך</p>
        <input id="name" spellCheck="false" maxLength="25" onChange={this.onInputChange}></input>
        <p className="form">בחר סיסמה</p>
        <input id="password" type="password" maxLength="9" onChange={this.onInputChange}></input>
        <p>אמייל</p>
        <input id="email" onChange={this.onInputChange}/>
        <button id="savedetails" onClick={this.handleRegister}>שמירה</button>
      </div>
    )
  }
}

export default Register;
