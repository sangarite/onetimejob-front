import React from 'react'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import './PublishJob.css'

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
      window.alert(data);
      this.props.history.push('/');
    })
    .catch(err => console.log(err))
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
        <div className="topSpace" id="publishJob">
          <input name="title" id="title" onChange={this.onInputchange} className="input" placeholder="כותרת"/>
          <input name="details" id="details" onChange={this.onInputchange} className="input" placeholder="פרטים"/>
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
          </select><br/>
          <input name="salary" id="salary" onChange={this.onInputchange} className="input" placeholder="שכר"/>
          <input type="date" name="date" id="date" onChange={this.onInputchange} className="input" placeholder="תאריך תפוגה"/>
          <input name="area" id="area" onChange={this.onInputchange} className="input" placeholder="אזור"/>
          <input name="city" id="city" onChange={this.onInputchange} className="input" placeholder="עיר"/>
          <input type="submit" value="פרסם" onClick={this.handleJobSubmit} className="button"/>
        </div>
      );
      else return <Redirect to="/signin" />
  }
}

export default withRouter(PublishJob);
