import React from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import out from '../../images/out.png'
import './out.css'

class Out extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  //מרוקן את המשתמש והולך לעמוד הבית
  handleClick(event) {
    if (event.target.id === "yes") this.props.handleUserOut();
    else this.props.history.push('/');
  }

  render() {
    if (this.props.isSignIn)
      return(
        <div className="out">
          <div className="part1">
            <h1>האם הינך בטוח שברצונך לצאת?</h1>
            <button id="yes" onClick={this.handleClick} className="button">כן</button>
            <button id="no" onClick={this.handleClick} className="button">לא</button>
          </div>
          <div className="part2">
            <img src={out} alt="out" id="out"/>
          </div>
        </div>
    );
    else return <Redirect to="/" />
  }
}

export default withRouter(Out);
