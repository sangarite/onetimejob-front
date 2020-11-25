import React from 'react';
import { useHistory } from 'react-router-dom'
import './jobs.css'
import a from '../../images/a.jpg'

export default function Jobs() {

  const [jobs, setJobs] = React.useState([]);
  const [filter, setFilter] = React.useState('publish_date');

  const history = useHistory();

  React.useEffect(() => {
    fetch(`http://localhost:3000/jobs?filter=${filter}`)
    .then(response => response.json())
    .then(data => setJobs(data))
    .catch(err => console.log(err))
  }, [filter]);

  const handleSelectChange = (event) => {
    setFilter(event.target.value)
  }

  return(
    <div id="jobs">
      <select onChange={handleSelectChange}>
        <option value="category">קטגוריה</option>
        <option value="salary">שכר</option>
        <option value="expiry_date">תאריך תפוגה</option>
        <option value="area">אזור</option>
        <option value="city">עיר</option>
        <option value="publish_date">תאריך פרסום</option>
      </select>
      <br/>
      <div id="gallary">
        {
          jobs.map((job, i) => {
            return(
              <div className="container">
                <img src={a} alt="a" className="image"/>
                <div className="overlay">
                  <div id="title" className="text">{job.title}</div>
                  <div className="text">{job.details}</div>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
