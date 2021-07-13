import React from 'react'
import { useHistory } from 'react-router-dom'
import './notifications.css'
import Loader from '../Loader/Loader'

export default function Notifications(props) {

  const { updateMessages, seeMessages, displayLoader, messages } = props;

  const history = useHistory();

  React.useEffect(() => {
    updateMessages();
    seeMessages();
  }, [updateMessages, seeMessages])

  //בודק אם המשתמש רשום אם כן - עובר על המערך של ההודעות ומציג אותן
  if (props.isSignIn)
    return(
      <div id="notifications">
        <div id="j-loader">{displayLoader ? <Loader /> : null}</div>
        {
          (messages.length)
          ? messages.map((message, i) =>
              <div key={i} className="message">
                {message.text}
              </div>
            )
          : <span style={{marginLeft: "50%"}}>אין הודעות</span>
        }
      </div>
    )
  else {
    history.push('/');
    return null;
  }
}
