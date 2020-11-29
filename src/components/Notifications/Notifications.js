import React from 'react'
import './notifications.css'

export default function Notifications(props)
{
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    fetch(`http://localhost:3000/messages/${props.id}`)
    .then(response => response.json())
    .then(data => setMessages(data))
    .catch(error => console.log(error))
  }, [props.id])

  return(
    <div id="notifications">
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
