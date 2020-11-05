import React from 'react';
import { useHistory } from 'react-router-dom'

const App = () => {

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
    <div className="topSpace">
      <br/>
      <select onChange={handleSelectChange}>
        <option value="category">קטגוריה</option>
        <option value="salary">שכר</option>
        <option value="expiry_date">תאריך תפוגה</option>
        <option value="area">אזור</option>
        <option value="city">עיר</option>
        <option value="publish_date">תאריך פרסום</option>
      </select>
      {
        jobs.map((job, i) => <p key={i}>{job.title}</p> )
      }
    </div>
  );
}

export default App;
