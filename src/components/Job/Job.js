import React from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Job.css'
import area from '../../images/area.png'
import city from '../../images/city.png'
import expiry_date from '../../images/expiry_date.png'
import salary from '../../images/salary.png'

export default function Jobs(props) {

  const history = useHistory();

  const info = props.jobs.filter((job) => job.job_id === parseInt(props.match.params.id));
  console.log(info);

  const onButtonClick = () => {
    if (Object.keys(props.user).length === 0) {
      Swal.fire({
        text: 'יש להיכנס תחילה',
        icon: 'warning',
        confirmButtonText: 'העבר אותי לכניסה'
      }).then((res) => { if(res.value) history.push('../signin')})
    } else {
      Swal.fire({
        title: 'שכנע את המעסיק שהעבודה מתאימה לך (עד 50 תווים)',
        input: 'text',
        confirmButtonText: 'שלח',
        showLoaderOnConfirm: true,
        preConfirm: (comment) => {
          fetch('http://localhost:3000/job/apply', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              job_id: info[0].job_i,
              user: props.user,
              publisher_id: info[0].user_id,
              comment: comment
            })
          })
          .then(response => response.text())
          .then(data => {
            data === 'success' ?
            Swal.fire({
              text: 'בקשתך התקבלה. פרטייך נשלחו בהצלחה',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            }) :
            Swal.fire({
              text: 'ישנה בעיה. נסה שוב או דווח על הבעיה  בעזרה',
              icon: 'error',
              showConfirmButton: false,
              timer: 3000
            })
          })
        }
      })
    }
  }

  return(
    <div id="job">
      <div className="icons">
        <div className="icon">
          <img src={area} alt="area" />
          <p>{info[0].area}</p>
        </div>
        <div className="icon">
          <img src={city} alt="city" />
          <p>{info[0].city}</p>
        </div>
        <div className="icon">
          <img src={expiry_date} alt="expiry_date" />
          <p>{info[0].expiry_date}</p>
        </div>
        <div className="icon">
          <img src={salary} alt="salary" />
          <p>{info[0].salary}</p>
        </div>
      </div>
      <h2>{info[0].title}</h2>
      <p>{info[0].details}</p>
      <button onClick={onButtonClick}>מעוניין</button>
    </div>
  );
}
