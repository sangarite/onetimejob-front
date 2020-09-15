import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import img from './team_work.png';
import './Entrance.css';



class Entrance extends Component {
  render() {
    return(
      <div id="frame">
        <img src={img} alt="team_work" />
        <div id="left">
          <h1>choose your type</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Integer nec odio. Praesent libero. Sed cursus ante dapibus
          diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
          Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed
          augue semper porta. Mauris massa. Vestibulum lacinia arcu
          eget nulla. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos. Curabitur sodales
          </p>
          <button><Link to="/joblist">חיפוש עבודה</Link></button>
          <button><Link to="/publishjob">פרסום עבודה</Link></button>
        </div>
      </div>
    );
  }
}

export default Entrance;
