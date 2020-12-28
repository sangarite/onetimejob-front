import React from 'react'
import './UserSettings.css'
import Basic from './SubComponents/Basic/Basic'
import Preference from './SubComponents/Preference'
import Delete from './SubComponents/out/Out'
import Password from './SubComponents/password/Password'
import avatar from './avataaars.svg'
import Loader from '../Loader/Loader'
import Swal from 'sweetalert2'

class UserSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      heading: 'basic',
      src: this.props.user.photo || avatar
    }
  }

  onButtonClick = (event) => {
    this.setState({ heading: event.target.id })
  }

  onImageClick = (event) => {
     document.getElementById('imageInput').click();
  }

  onImageChange = (event) => {
    var img = event.target.files[0];
    this.setState({src: URL.createObjectURL(img)});
    fetch('http://localhost:3000/settings/avatar', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.props.user.user_id,
        src: URL.createObjectURL(img)
      })
    })
    .then(response => response.text())
    .then(data => Swal.fire({text: data}))
    .catch(err => Swal.fire({text: err}))
  }

  selected = (event) => {
    const selected = document.getElementsByClassName('width');
    if (selected.length) selected[0].classList.remove('width');
    event.target.parentElement.classList.add("width");
  }

  render() {
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
              src={this.state.src}
              onClick={this.onImageClick}
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
  }
}

export default UserSettings;
