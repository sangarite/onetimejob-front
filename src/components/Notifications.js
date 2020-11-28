import React from 'react'

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
    <div className="topSpace">
      <br />
      <p>Notifications</p>
      {
        messages.map((message, i) => <p key={i}>{message.text}</p>)
      }
    </div>
  )
}
