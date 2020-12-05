import React from 'react';
import { useHistory } from 'react-router-dom'
import './jobs.css'

export default function Jobs(props) {

  const [jobs, setJobs] = React.useState(props.jobs);

  const history = useHistory();

  const handleSelectChange = (event) => {
    fetch(`http://localhost:3000/jobs?filter='${event.target.value}'`)
    .then(response => response.json())
    .then(data => setJobs(data))
    .catch(err => console.log(err))
  }

  const onJobClick = (id) => {
    history.push(`/job/${id}`)
  }

  return(
    <div id="jobs">
        <select onChange={handleSelectChange} className="select">
          <option value="" disabled selected>מיין לפי</option>
          <option value="category">קטגוריה</option>
          <option value="salary">שכר</option>
          <option value="expiry_date">תאריך תפוגה</option>
          <option value="area">אזור</option>
          <option value="city">עיר</option>
          <option value="publish_date">תאריך פרסום</option>
        </select>
      <div id="gallary">
        {
          jobs.map((job, i) => {
            return(
              <div className="job" key={job.id} onClick={() => onJobClick(job.job_id)}>
                <img src={`../images/${job.category}.png`} alt="category" className="image"/>
                <div className="overlay">
                  <div id="title" className="text">{job.title}</div>
                  <div className="text"  id={job.id}>{job.details}</div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
