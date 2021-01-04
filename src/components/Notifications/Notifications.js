import React from 'react'
import './notifications.css'
import Loader from '../Loader/Loader'

export default function Notifications(props) {

  React.useEffect(() => {
    props.updateMessages();
    props.seeMessages();
  }, [])

  return(
    <div id="notifications">
      <div id="j-loader">{props.displayLoader ? <Loader /> : null}</div>
      {
        props.messages.map((message, i) =>
          <div key={i} className="message">
            {message.text}
          </div>
        )
      }
    </div>
  )
}
