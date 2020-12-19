import './Loader.css'
import React from 'react'

export default function Loader() {

  return(
    <div className="loader">
      <article className="clock">
        <div className="hours-container">
          <div className="hours"></div>
        </div>
        <div className="minutes-container">
          <div className="minutes"></div>
        </div>
      </article>
    </div>
  );
}
