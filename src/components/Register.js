import React from 'react'

export default function Register()
{
    return(
     <div className="topSpace">
        <br />
      {//maybe we should use form to send all the details together
}
        <p className="form">הכנס את שמך</p>
        <input id="name" spellCheck="false" maxLength="25" ></input>
        <p className="form">בחר סיסמה</p>
        <input id="password" type="password" maxLength="9"></input>
        <button id="savedetails">שמירה</button>
      </div>
    )
}
