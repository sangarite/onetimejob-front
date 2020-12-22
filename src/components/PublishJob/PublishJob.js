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
        icon: 'information',
        confirmButtonText: 'OK'
      })
    })
    .catch(err => {console.log(err);this.props.toggleLoader();})
  }

  onInputchange(event) {
    this.setState({[`${event.target.id}`]: event.target.value})
  }

  onCategoryChange(event) {
    console.log(event.target.value);
    this.setState({category: event.target.value});
  }

  render() {
    if (this.props.isSignIn)
      return(
        <div id="publishJob">
          <div id="j-loader">{this.props.displayLoader ? <Loader /> : null}</div>
          <input name="title" id="title" onChange={this.onInputchange} className="input" placeholder="כותרת"/>
          <input name="details" id="details" onChange={this.onInputchange} className="input" placeholder="פרטים ודרישות"/>
          <select value={this.state.category} onChange={this.onCategoryChange} className="input" placeholder="קטגוריה">
            <option value="קטגוריה"></option>
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
          <input type="date" name="date" id="date" onChange={this.onInputchange} className="input" placeholder="תאריך תפוגה" onchange="this.className=(this.value!=''?'has-value':'')"/>
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
