import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Loader from '../Loader/Loader'
import './Signin.css'
import { API_URL } from '../../config'

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
     this.props.toggleLoader();
     fetch(`${API_URL}/signin`, {
       method: 'post',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify({
         name: this.state.name,
         password: this.state.password
       })
     })
     .then(response => response.json())
     .then((data) => {
       if (data.message) {
         this.props.toggleLoader();
         Swal.fire({
            text: data.message,
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000
         })
       } else {
         this.props.toggleLoader();
         console.log(data);
         this.props.handleUserIn(data);
       }
     })
   }

  render() {
    return(
      <div className="signin">
        <input
          name="name"
          id="name"
          onChange={this.onInputChange}
          className="input"
          placeholder="שם משתמש"
        />
        <input
          type="password"
          name="password"
          id="password"
          onChange={this.onInputChange}
          className="input"
          placeholder="סיסמה"
        />
        <input
          type="submit"
          value="שלח"
          onClick={this.handleSignIn}
          id="but"
          className="button"
        />
        <p id="register">
          לא רשום עדיין?  <Link to="/register" id="link">הירשם</Link>
        </p>
        <div className="s-loader">
          {this.props.displayLoader ? <Loader /> : null}
        </div>
      </div>
    );
  }
}

export default Signin;
