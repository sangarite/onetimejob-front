import React from 'react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import Loader from '../Loader/Loader'
import Swal from 'sweetalert2'
import './PublishJob.css'
import locations from '../../areas.js'

class PublishJob extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      details: '',
      category: 0,
      salary: 0,
      date: '',
      area: '',
      city: '',
      categories: []
    }
    this.onInputchange = this.onInputchange.bind(this);
    this.handleJobSubmit = this.handleJobSubmit.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3000/categories')
    .then(response => response.json())
    .then(data => this.setState({ categories: data }))
    .catch(error => console.log(error))
  }

  handleJobSubmit() {
    this.props.toggleLoader();
    fetch('http://localhost:3000/publish', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user: this.props.user.user_id,
        title: this.state.title,
        details: this.state.details,
        category: this.state.category,
        salary: this.state.salary,
        date: this.state.date,
        area: this.state.area,
        city: this.state.city
      })
    })
    .then(response => response.text())
    .then(data =>  {
      this.props.toggleLoader();
      Swal.fire({
        text: data,
        icon: 'info',
        confirmButtonText: 'OK'
      })
      this.props.updateJobs();
    })
    .catch(err => {console.log(err);this.props.toggleLoader();})
  }

  onInputchange(event) {
    this.setState({[`${event.target.id}`]: event.target.value})
  }

  onCategoryChange(event) {
    this.setState({category: event.target.value});
  }

  onDateChange(event) {
    const date = new Date(event.target.value);
    this.setState({date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`});
  }

  render() {
    if (this.props.isSignIn)
    return(
        <div id="publishJob">
          <div id="j-loader">{this.props.displayLoader ? <Loader /> : null}</div>
          <input name="title" id="title" onChange={this.onInputchange} className="input" placeholder="כותרת"/>
          <textarea name="details" id="details" onChange={this.onInputchange} className="input" placeholder="פרטים ודרישות"/>
          <select defaultValue={'DEFAULT'} onChange={this.onCategoryChange} className="input">
            <option value="DEFAULT" disabled hidden>קטגוריה</option>
            {
              (this.state.categories).map(category =>
                <option
                  value={category.category_id}
                  key={category.category_id}
                >{category.category_name}</option>
                )
            }
          </select>
          <input name="salary" id="salary" onChange={this.onInputchange} className="input" placeholder="שכר"/>
          <input type="datetime-local" name="date" id="date" onChange={this.onDateChange} className="input" placeholder="תאריך תפוגה"/>
          <input type="search" list="areas" onChange={this.onInputchange} placeholder="אזור" className="input" id="area"/>
          <datalist id="areas">
          {
            locations.AREAS.map((area) => {
              return <option value={area} key={area}/>
            })
          }
          </datalist>
          <input type="search" list="cities" onChange={this.onInputchange} placeholder="עיר" className="input" id="city"/>
          <datalist id="cities">
          {
            locations.CITIES.map((city) => {
              return <option value={city} key={city}/>
            })
          }
          </datalist>
          <input type="submit" value="פרסם" onClick={this.handleJobSubmit} className="button"/>
        </div>
      );
    else return <Redirect to="/signin" />
  }
}

export default withRouter(PublishJob);
