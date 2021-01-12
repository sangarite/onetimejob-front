import React from 'react';
import { useHistory } from 'react-router-dom'
import './jobs.css'
import Loader from '../Loader/Loader'
import Filter from '../Filter/filter'

export default function Jobs(props) {

  const { toggleLoader, displayLoader } = props;

  const [jobs, setJobs] = React.useState(props.jobs);

  const history = useHistory();

  React.useEffect(() => {
    setJobs(props.jobs);
  }, [props.jobs]);

  const filterJobs = (order = 'publish_date', by = 'DESC', categories = [], area = '', city = '', date = '10', salary = [0,10000]) => {
    toggleLoader();
    fetch(`http://localhost:3000/jobs?order='${order}'&by=${by}&categories=${categories}&area=${area}&city=${city}&date=${date}&min=${salary[0]}&max=${salary[1]}`)
    .then(response => response.json())
    .then(data => {toggleLoader(); setJobs(data);})
    .catch(error => {toggleLoader(); console.log(error);})
  }

  const onJobClick = (id) => {
    history.push(`/job/${id}`)
  }

  return(
    <div id="jobs">
      <div id="j-loader">{displayLoader ? <Loader /> : null}</div>
      <Filter filterJobs={filterJobs}/>
      <div id="gallary">
        {
            jobs.map((job, i) => {
              return(
                <div key={i} className="job" onClick={() => onJobClick(job.job_id)}>
                  <img src={`../images/${job.category}.png`} alt="category" className="image"/>
                  <div className="overlay">
                    <div id="job_title" className="txt">{job.title}</div>
                    <div className="txt" id={job.id}>{job.details}<br/>...עוד</div>
                  </div>
                </div>
              );
            })
        }
      </div>
    </div>
  );
}
