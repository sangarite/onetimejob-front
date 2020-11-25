import React from 'react'
import { Link } from 'react-router-dom'
import './Signin.css'

class Signin extends React.Component {
   constructor() {
     super();
     this.state = {
       name: '',
       password: ''
     }
     this.handleSignIn = this.handleSignIn.bind(this);
     this.onInputChange = this.onInputChange.bind(this);
   }

   onInputChange(event) {
     this.setState({[`${event.target.id}`]: event.target.value})
   }

   handleSignIn() {
     fetch('http://localhost:3000/signin', {
       method: 'post',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         name: this.state.name,
         password: this.state.password
       })
     })
     .then(response => response.json())
     .then((data) => {
       if (data.message)
       window.alert(data.message)
       else this.props.handleUserIn(data)
     })
   }

  render() {
    return(
      <div className="topSpace" className="signin">
        <p>Sign In</p>
        <label htmlFor="name">שם משתמש</label>
        <input name="name" id="name" onChange={this.onInputChange}/>
        <label htmlFor="password">סיסמה</label>
        <input type="password" name="password" id="password" onChange={this.onInputChange}/>
        <input type="submit" value="שלח" onClick={this.handleSignIn} id="but" />
         <p id="register">
          <br/><br/>
          לא רשום עדיין?<Link to="/register" id="link"   >הירשם</Link></p>
        </div>
    );
  }
}

export default Signin;
