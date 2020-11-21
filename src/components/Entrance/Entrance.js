import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Entrance.css';
import home_background from '../../images/home_background.png';

class Entrance extends Component {
  render() {
    return(
      <div id="entrance">
        <img src={home_background} alt={home_background}/>
        <p>"ההוצאה הגדולה ביותר היא איבוד זמן"</p>
        <Link to="/jobs">חיפוש עבודה</Link>
        <div id="benefits"></div>
        <div id="about"></div>
      </div>
    );
  }
}

export default Entrance;
