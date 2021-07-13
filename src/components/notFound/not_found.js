import React from 'react'
import './not_found.css'

export default function NotFound() {
    return(
      <div>
        <section id="not-found">
          <div className="circles">
            <p>404<br/>
             <small>העמוד לא נמצא</small>
            </p>
            <span className="circle big"></span>
            <span className="circle med"></span>
            <span className="circle small"></span>
          </div>
        </section>
      </div>
    )
}