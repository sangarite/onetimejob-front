import React from 'react'
import { Redirect } from 'react-router-dom'
import './UserSettings.css'
import Basic from './SubComponents/Basic/Basic'
import Preference from './SubComponents/Preference'
import Delete from './SubComponents/out/Out'
import Password from './SubComponents/password/Password'
import Loader from '../Loader/Loader'
import Swal from 'sweetalert2'
import get from './get.gif'
import avatar from './avatar.svg'

class UserSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      heading: 'basic'
    }
  }

  onButtonClick = (event) => {
    this.setState({ heading: event.target.id })
  }

  onImageClick = (event) => {
     document.getElementById('imageInput').click();
  }

  onImageChange = (event) => {
    const img = event.target.files[0];
    if (img.type.startsWith('image')) {
      const name = `${this.props.user.user_id}`;
      var formData = new FormData();
      formData.append('photo', img, name);

      fetch('https://onetimejob-server.herokuapp.com/avatar', {
        method: 'POST',
        body: formData
      })
      .then(data => console.log(data))
      .catch(err => console.log(err))
      document.getElementById('Image').src = get;
      setTimeout(() => {document.getElementById('Image').src = `https://onetimejob-server.herokuapp.com/${this.props.user.user_id}?${Math.random()}`;}, 1000)
    } else {
      Swal.fire({text: 'יש לבחור קובץ בפורמט של תמונה'})
    }
  }

  selected = (event) => {
    const selected = document.getElementsByClassName('width');
    if (selected.length) selected[0].classList.remove('width');
    event.target.parentElement.classList.add("width");
  }

  render() {
    if (this.props.isSignIn)
      return(
      <div id="settings">
        <div id="j-loader">{this.props.displayLoader ? <Loader /> : null}</div>
        <div id="content">
          <div className="div7">
            { this.state.heading === 'basic'
              ? <Basic user={this.props.user} displayLoader={this.props.displayLoader} toggleLoader={this.props.toggleLoader}/>
              : (this.state.heading === 'password'
                ? <Password user={this.props.user} displayLoader={this.props.displayLoader} toggleLoader={this.props.toggleLoader}/>
                : (this.state.heading === 'preference'
                  ? <Preference />
                  : <Delete user={this.props.user} handleUserOut={this.props.handleUserOut} displayLoader={this.props.displayLoader} toggleLoader={this.props.toggleLoader}/>
                  )
                )
            }
          </div>
        </div>
        <div id="menu">
          <div>
            <img
              src={`https://onetimejob-server.herokuapp.com/${this.props.user.user_id}`}
              onClick={this.onImageClick}
              onError={(e) => e.target.src = avatar }
              title="שינוי תמונת פרופיל"
              id='Image'
              alt="avatar"
            />
            <input
              type="file"
              name="imageInput"
              id="imageInput"
              onChange={this.onImageChange}
            />
          </div>
          <div className="menu" onClick={this.selected}>
            <p onClick={this.onButtonClick} id='basic' className="pointer">מידע בסיסי</p>
          </div>
          <div className="menu" onClick={this.selected}>
            <p onClick={this.onButtonClick} id='password' className="pointer">סיסמה</p>
          </div>
          <div className="menu" onClick={this.selected}>
            <p onClick={this.onButtonClick} id="preference" className="pointer">העדפות</p>
          </div>
          <div className="menu" onClick={this.selected}>
            <p onClick={this.onButtonClick} id="out" className="pointer">מחיקת חשבון</p>
          </div>
        </div>
      </div>
    );
    else return <Redirect to="/signin" />
  }
}

export default UserSettings;
