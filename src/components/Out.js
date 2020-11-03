import React from 'react'
import { withRouter } from 'react-router'

class Out extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.target.id === "yes") this.props.handleUserOut();
    else this.props.history.push('/');
  }

  render() {
    return(
      <div className="topSpace">
        <p>האם אתה בטוח שברצונך לצאת?</p>
        <button id="yes" onClick={this.handleClick}>כן</button>
        <button id="no" onClick={this.handleClick}>לא</button>
      </div>
    );
  }
}

export default withRouter(Out);
