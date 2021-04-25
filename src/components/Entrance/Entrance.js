import React from 'react'
import { Link } from 'react-router-dom'
import './Entrance.css'
import Slideshow from '../Slider/slider'
import background from '../../images/Web 1920 – 6.png'
import top_background from '../../images/top_background.png'
import blob_money from '../../images/blob_money.png'
import blob_power from '../../images/blob_power.png'
import blob_workers from '../../images/blob_workers.png'
import money from '../../images/money.png'
import power from '../../images/power.png'
import workers from '../../images/workers.png'

export default function Entrance() {
  return(
    <div id="entrance">
      <img src={background} alt="background" id="home"/>
      <img src={top_background} alt="top_background" id="top"/>
      <p>"ההוצאה הגדולה ביותר היא איבוד זמן"
      <br /> נצלו אותה כדי להרוויח כסף בקלות</p>
      <Link to='/jobs' className="button">מצא עבודה</Link>
      <div id="benefits">
        <div className="container">
          <img src={blob_money} alt="blob_money" className="blob"/>
          <img src={money} alt="money" className="picture" id="money"/>
          <h1>רווח כספי</h1>
          <h2>במקום לבזבז את הזמן תוכלו לנצלו כדי להרוויח כסף</h2>
        </div>
        <div className="container">
          <img src={blob_power} alt="blob_power" className="blob"/>
          <img src={power} alt="power" className="picture" id="power"/>
          <h1>ניצול יכולות</h1>
          <h2>תוכלו להשתמש במויומנויות שאינכם משתמשים ביומיום</h2>
        </div>
        <div className="container">
          <img src={blob_workers} alt="blob_workers" className="blob"/>
          <img src={workers} alt="workers" className="picture" id="workers"/>
          <h1>כוח עבודה זול</h1>
          <h2>על עבודות חד פעמיות משלמים פחות</h2>
        </div>
      </div>
      <div id="social_proof">
        <Slideshow />
      </div>
    </div>
  );
}
