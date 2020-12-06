import './Loader.css'
import React from 'react'

export default function Loader() {

  return(
    <div className="loader">
      <article class="clock">
        <div class="hours-container">
          <div class="hours"></div>
        </div>
        <div class="minutes-container">
          <div class="minutes"></div>
        </div>
      </article>
    </div>
  );
}
