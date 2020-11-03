import React from 'react'

export default class Out extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (event.target.id === "yes") this.props.handleUserOut();
    else window.alert('I want to stay in')
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
