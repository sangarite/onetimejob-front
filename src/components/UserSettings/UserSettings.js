import React from 'react';
import './UserSettings.css';
import Basic from './SubComponents/Basic/Basic';
import Preference from './SubComponents/Preference';
import Delete from './SubComponents/Out';
import Password from './SubComponents/Password';
import avatar from './avataaars.svg';

class UserSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      heading: 'Basic',
      src: avatar
    }
  }

  onButtonClick = (event) => {
    this.setState({ heading: event.target.id })
  }

  onImageClick = (event) => {
     document.getElementById('imageInput').click();
  }

  onImageChange = (event) => {
    if (event.target.files[0]) {
			let img = event.target.files[0];
			this.setState({ src: URL.createObjectURL(img)});
		}
    //save image in the data base
  }

  render() {
    return(
      <div className="topSpace">
        <h1>{this.state.name}</h1>
        <div className="parent">
          <div className="heading">{this.state.heading}</div>
          <div className="div2">
            <img
              src={this.state.src}
              onClick={this.onImageClick}
              title="change avatar"
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
          <div className="div3">
            <p onClick={this.onButtonClick} id='Basic'>מידע בסיסי</p>
          </div>
          <div className="div4">
            <p onClick={this.onButtonClick} id='Password'>סיסמה</p>
          </div>
          <div className="div5">
            <p onClick={this.onButtonClick} id="Preference">העדפות</p>
          </div>
          <div className="div6">
            <p onClick={this.onButtonClick} id="Delete">מחיקת חשבון</p>
          </div>
          <div className="div7">
            { this.state.heading === 'Basic'
              ? <Basic user={this.props.user}/>
              : (this.state.heading === 'Password'
                ? <Password user={this.props.user}/>
                : (this.state.heading === 'Preference'
                  ? <Preference />
                  : <Delete user={this.props.user} handleUserOut={this.props.handleUserOut}/>
                  )
                )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default UserSettings;
