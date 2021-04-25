import React from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Job.css'
import city from '../../images/city.png'
import expiry_date from '../../images/expiry_date.png'
import salary from '../../images/salary.png'
import { API_URL } from '../../config'

export default function Jobs(props) {

  const history = useHistory();

  //מכניס לפה את כל המידע על המשרה
  const info = props.jobs.filter((job) => job.job_id === parseInt(props.match.params.id));
  var date;
  if (info.length) date = info[0].expiry_date.slice(0,10) + '\n' + info[0].expiry_date.slice(11,16)

  //handle job click
  const onButtonClick = () => {
    //הופך את האובייקט של המידע על המשתמש למערך ובודק אם יש בו משהו - אם אין מבקש להיכנס
    if (Object.keys(props.user).length === 0) {
      Swal.fire({
        text: 'יש להיכנס תחילה',
        icon: 'warning',
        confirmButtonText: 'העבר אותי לכניסה',
        confirmButtonColor: '#083D77'
      }).then((res) => { if(res.value) history.push('../signin')})
    } else {
      Swal.fire({
        title: 'שכנע את המעסיק שהעבודה מתאימה לך (עד 50 תווים)',
        input: 'text',
        confirmButtonText: 'שלח',
        confirmButtonColor: '#083D77',
        showLoaderOnConfirm: true,
        //מוסיף הודעה באזור האישי של מפרסם העבודה
        preConfirm: (comment) => {
          fetch(`${API_URL}/job/apply`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              job_id: info[0].job_i,
              user: props.user,
              publisher_id: info[0].user_id,
              text: 'מצאנו מישהו שמעוניין לעבוד אצלך\nמס פלאפון:' + props.user.phone + '\nכתובת מייל: ' + props.user.mail + '\nהערות: ' + comment
            })
          })
          .then(response => response.text())
          .then(data => {
            data === 'success' ?
            Swal.fire({
              text: 'בקשתך התקבלה. פרטייך נשלחו בהצלחה',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            }) :
            Swal.fire({
              text: 'ישנה בעיה. נסה שוב או דווח על הבעיה  בעזרה',
              icon: 'error',
              showConfirmButton: false,
              timer: 2000
            })
          })

          //שולח הודעה במייל למפרסם העבודה
          fetch(`${API_URL}/send`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email_to: info[0].user_id,
              subject: 'מצאנו מישהו שמעוניין לעבוד אצלך',
              message: `מצאנו מישהו שמעוניין לעבוד בעבודה שהעלית\n כותרת העבודה: ${info[0].title} \n שם: ${props.user.user_name} \n מייל: ${props.user.email} \n פלאפון: ${props.user.phone}`
            })
          })
          .then(response => response.json())
          .then(data => {
            if (data.msg === 'fail') console.log('sending email failed');
          })
        }
      })
    }
  }

  //בודק אם המשתמש בפנים, אם כן מציג את המודעה, אם לא מפעיל את הפונקציה של הכפתור
  if(props.isSignIn)
    return(
    <div id="job">
      <h1>{info[0].title}</h1>
      <p>{info[0].details}</p>
      <div className="icons">

        <div className="icon">
          <div className="img">
            <img src={city} alt="city"/>
            <p>עיר</p>
          </div>
          <p>{info[0].area}</p>
        </div>

        <div className="icon">
          <div className="img">
            <img src={expiry_date} alt="expiry_date"/>
            <p>תפוגה</p>
          </div>
          <p>{date || 'לא נקבע'}</p>
        </div>

        <div className="icon">
          <div className="img">
            <img src={salary} alt="salary"/>
            <p>שכר</p>
          </div>
          <p>{info[0].salary} &#8362;</p>
        </div>

      </div>
      <button onClick={onButtonClick} className="button">מעוניין</button>
    </div>
  );
  else {
    onButtonClick();
    return null;
  }
}
