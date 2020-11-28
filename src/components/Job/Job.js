import React from 'react'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Job.css'

export default function Jobs(props) {

  const history = useHistory();

  const info = props.jobs.filter((job) => job.job_id === props.match.params.id);

  const [comment, setComment] = React.useState('');

  const onButtonClick = () => {
    if (Object.keys(props.user).length === 0) {
      Swal.fire({
        text: 'יש להיכנס תחילה',
        icon: 'warning',
        confirmButtonText: 'העבר אותי לכניסה'
      })
      history.push('/signin');
    } else {
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
      .then( data => data === 'success' ? Swal.fire({
            text: 'בקשתך התקבלה. המעסיק יצור עמך קשר במידה ויהי מעוניין',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          }) : Swal.fire({
            text: 'ישנה בעיה. נסה שוב או דווח על הבעיה  בעזרה',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          }))
    }
  }

  const onTextChange = (event) => {
    setComment(event.target.value);
  }

  return(
    <div className="job">
      <h2>{info[0].title}</h2>
      <p>{info[0].details}</p>
      <textarea onChange={onTextChange}></textarea>
      <button onClick={onButtonClick}>מעוניין</button>
    </div>
  );
}
