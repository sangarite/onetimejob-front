import React from 'react';
import { useHistory } from 'react-router-dom'
import './jobs.css'
import Loader from '../Loader/Loader'
import locations from '../../areas.js'

export default function Jobs(props) {

  const [jobs, setJobs] = React.useState([]);

  const [order, setOrder] = React.useState('publish_date');

  const [by, setBy] = React.useState('DESC');

  const [categories, setCategories] = React.useState([]);

  const [area, setArea] = React.useState('');

  const [city, setCity] = React.useState('');

  const [salary, setSalary] = React.useState([0,10000]);

  const [date, setDate] = React.useState('10');

  const history = useHistory();

  React.useEffect(() => {filterJobs()}, [])

  const filterJobs = () => {
    props.toggleLoader();
    fetch(`http://localhost:3000/jobs?order='${order}'&by=${by}&categories=${categories}&area=${area}&city=${city}&date=${date}&min=${salary[0]}&max=${salary[1]}`)
    .then(response => response.json())
    .then(data => {props.toggleLoader(); setJobs(data);})
    .catch(error => {props.toggleLoader(); console.log(error);})
  }

  const handleSelectChange = (event) => {
    setOrder(event.target.value);
    filterJobs();
  }

  const onJobClick = (id) => {
    history.push(`/job/${id}`)
  }

  const onCatClick = (event) => {
    if(event.target.classList.contains("clicked")) {
      event.target.classList.remove("clicked");
      setCategories(categories.filter((cat) => cat !== event.target.id));
    } else {
      event.target.classList.add("clicked");
      setCategories([...categories, event.target.id]);
    }
  }

  const changeOrder = (event) => {
    if(event.target.checked) {
      setBy('ASC')
    } else {
      setBy('DESC')
    }
    filterJobs();
  }

  const onCityChange = (event) => {
    setCity(event.target.value);
  }

  const onAreaChange = (event) => {
    setArea(event.target.value);
  }

  const onSalaryChange = (event) => {
    let value = event.target.value;
    if (!(value > 0)) value = 0;
    if (isNaN(value) || value < 0) console.log('nan');;
    if (event.target.id === "min") {
      setSalary([parseInt(value), salary[1]])
    } else {
      if (value < salary[0]) value = salary[0];
      setSalary([salary[0], parseInt(value)])
    }
  }

  const onDateChange = (event) => {
    setDate(event.target.value);
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
          <input type="checkbox" id="ASC" onChange={changeOrder}/>
          <label id="lol" htmlFor="ASC">
            <div id="knob"></div>
            <div id="down">יורד</div>
            <div id="up">עולה</div>
          </label>

          <p>אזור</p>
          <input type="search" list="areas" onChange={onAreaChange}/>
          <datalist id="areas">
          {
            locations.AREAS.map((area) => {
              return <option value={area} key={area}/>
            })
          }
          </datalist>

          <p>עיר</p>
          <input type="search" list="cities"  onChange={onCityChange}/>
          <datalist id="cities">
          {
            locations.CITIES.map((city) => {
              return <option value={city} key={city}/>
            })
          }
          </datalist>

          <p>קטגוריות</p>
          <div>
            <img src="../images/cat01.png" alt="הובלות" title="הובלות" className="cat" id="cat01" onClick={onCatClick}/>
            <img src="../images/cat02.png" alt="ייעוץ" title="ייעוץ" className="cat" id="cat02" onClick={onCatClick}/>
            <img src="../images/cat03.png" alt="כתיבה" title="כתיבה" className="cat" id="cat03" onClick={onCatClick}/>
            <img src="../images/cat04.png" alt="אחר" title="אחר" className="cat" id="cat04" onClick={onCatClick}/>
            <img src="../images/cat05.png" alt="גרפיקה" title="גרפיקה" className="cat" id="cat05" onClick={onCatClick}/>
            <img src="../images/cat06.png" alt="הדרכה" title="הדרכה" className="cat" id="cat06" onClick={onCatClick}/>
            <img src="../images/cat07.png" alt="וידאו" title="וידאו" className="cat" id="cat07" onClick={onCatClick}/>
            <img src="../images/cat08.png" alt="לימודים" title="לימודים" className="cat" id="cat08" onClick={onCatClick}/>
            <img src="../images/cat09.png" alt="מוסיקה" title="מוסיקה" className="cat" id="cat09" onClick={onCatClick}/>
            <img src="../images/cat10.png" alt="ציור" title="ציור" className="cat" id="cat10" onClick={onCatClick}/>
            <img src="../images/cat11.png" alt="קניות" title="קניות" className="cat" id="cat11" onClick={onCatClick}/>
            <img src="../images/cat12.png" alt="שליחויות" title="שליחויות" className="cat" id="cat12" onClick={onCatClick}/>
            <img src="../images/cat13.png" alt="תיקונים" title="תיקונים" className="cat" id="cat13" onClick={onCatClick}/>
            <img src="../images/cat14.png" alt="תכנות" title="תכנות" className="cat" id="cat14" onClick={onCatClick}/>
            <img src="../images/cat15.png" alt="תמיכה" title="תמיכה" className="cat" id="cat15" onClick={onCatClick}/>
          </div>

          <p>שכר</p>
          <input type="number" onChange={onSalaryChange} id="min" placeholder="מינימום"/>
          <input type="number" onChange={onSalaryChange} id="max" placeholder="מקסימום"/>

          <p>פורסם ב</p>
          <select onChange={onDateChange}>
            <option value="10">כל זמן</option>
            <option value="1">24 שעות אחרונות</option>
            <option value="3">שלוש ימים אחרונים</option>
            <option value="7">שבוע אחרון</option>
          </select>

          <button onClick={filterJobs}>סנן</button>
      </div>

      <div id="gallary">
        {
            jobs.map((job, i) => {
              return(
                <div className="job" key={job.id} onClick={() => onJobClick(job.job_id)}>
                  <img src={`../images/${job.category}.png`} alt="category" className="image"/>
                  <div className="overlay">
                    <div id="title" className="text">{job.title}</div>
                    <div className="text" id={job.id}>{job.details}</div>
                  </div>
                </div>
              );
            })
        }
      </div>
    </div>
  );
}
