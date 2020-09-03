import React from 'react';
import './UserSettings.css';
import Basic from './SubComponents/Basic/Basic';
import Preference from './SubComponents/Preference';
import Out from './SubComponents/Out';
import Password from './SubComponents/Password';
import Image from './SubComponents/Image';

class UserSettings extends React.Component {

  constructor() {
    super();
    this.state = { heading: 'Basic' }
  }

  onButtonClick = (event) => {
    this.setState({ heading: event.target.id })
  }

  render() {
    return(
      <div>
        <h1>{this.props.user.name}</h1>
        <div className="parent">
          <div className="heading">{this.state.heading}</div>
          <div className="div2">
            <img src={this.props.user.src} onClick={this.onButtonClick} id='Image'></img>
          </div>
          <div className="div3"><p onClick={this.onButtonClick} id='Basic'>Basic Information</p></div>
          <div className="div4"><p onClick={this.onButtonClick} id='Password'>Password</p></div>
          <div className="div5"><p onClick={this.onButtonClick} id="Preference">Preference</p></div>
          <div className="div6"><p onClick={this.onButtonClick} id="Out">Sign Out</p></div>
          <div className="div7">
            { this.state.heading === 'Basic'
              ? <Basic user={this.props.user}/>
              : (this.state.heading === 'Password'
                ? <Password />
                : (this.state.heading === 'Preference'
                  ? <Preference />
                  : (this.state.heading === 'Out'
                    ? <Out />
                    : <Image />
                    )
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
