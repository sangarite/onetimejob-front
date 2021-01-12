import React from 'react'
import './notifications.css'
import Loader from '../Loader/Loader'

export default function Notifications(props) {

  const { updateMessages, seeMessages, displayLoader, messages } = props;

  React.useEffect(() => {
    updateMessages();
    seeMessages();
  }, [updateMessages, seeMessages])

  return(
    <div id="notifications">
      <div id="j-loader">{displayLoader ? <Loader /> : null}</div>
      {
        messages.map((message, i) =>
          <div key={i} className="message">
            {message.text}
          </div>
        )
      }
    </div>
  )
}
