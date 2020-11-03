import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import img from './team_work.png';
import './Entrance.css';



class Entrance extends Component {
  render() {
    return(
      <div id="frame" className="topSpace">
        <div id="image"><img src={img} alt="team_work" /></div>
        <div id="left">
          <h1>רךחמכיהנ גחי סמהד</h1>
          <p>כחג כיקו כידל שסזע המסיכ החגכלחד כדיחלקיד כוקםכד חגלכךד דחלכד
          גיכדלחכיד כדךלגםן דםחג עררי חדךמנבי דךלחםן ופןא תפווד 'וקה כחדד
          כדךח' דבשינו גלדד קודל קפודס רואינם חםוא כחנכחן סמהצתד דיכלדח כיד
          דיךד קיםן' דיגםכן' דיםכקן דיםקן דלחכ'ם ן נתצבץח נמץב תמילה תד'
          </p>
          <button><Link to="/joblist">חיפוש עבודה</Link></button>
          <button><Link to="/publish">פרסום עבודה</Link></button>
        </div>
      </div>
    );
  }
}

export default Entrance;
