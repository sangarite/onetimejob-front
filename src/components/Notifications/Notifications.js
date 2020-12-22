import React from 'react'
import './notifications.css'
import Loader from '../Loader/Loader'

export default function Notifications(props)
{
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    props.toggleLoader();
    fetch(`http://localhost:3000/messages/${props.id}`)
    .then(response => response.json())
    .then(data => {setMessages(data); props.toggleLoader();})
    .catch(error => {console.log(error); props.toggleLoader();})
  }, [props.id])

  return(
    <div id="notifications">
      <div id="j-loader">{props.displayLoader ? <Loader /> : null}</div>
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
