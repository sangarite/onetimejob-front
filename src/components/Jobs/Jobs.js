import React from 'react';
import { useHistory } from 'react-router-dom'
import './jobs.css'
import Loader from '../Loader/Loader'

export default function Jobs(props) {

  const [jobs, setJobs] = React.useState([]);

  const [category, setCategory] = React.useState('publish_date');

  const history = useHistory();

  React.useEffect(() => {
    props.toggleLoader();
    fetch(`http://localhost:3000/jobs?filter='${category}'`)
    .then(response => response.json())
    .then(data => {props.toggleLoader(); setJobs(data);})
    .catch(error => console.log(error))
  }, [category])

  const handleSelectChange = (event) => {
    setCategory(event.target.value);
    setJobs([]);
  }

  const onJobClick = (id) => {
    history.push(`/job/${id}`)
  }

  return(
    <div id="jobs">
        <div id="j-loader">{props.displayLoader ? <Loader /> : null}</div>

        <div id="filter">
          <select onChange={handleSelectChange} className="select">
            <option value="" disabled selected>מיין לפי</option>
            <option value="category">קטגוריה</option>
            <option value="salary">שכר</option>
            <option value="expiry_date">תאריך תפוגה</option>
            <option value="area">אזור</option>
            <option value="city">עיר</option>
            <option value="publish_date">תאריך פרסום</option>
          </select>
            <input type="checkbox" id="lol-checkbox"/>
            <label id="lol" for="lol-checkbox">
              <div id="knob"></div>
              <div id="down">יורד</div>
              <div id="up">עולה</div>
            </label>
        </div>

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
