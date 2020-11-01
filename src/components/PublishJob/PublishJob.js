import React from 'react';
import './PublishJob.css';

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
        user: this.props.userId,
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
    .then(data => console.log(data))
  }

  onInputchange(event) {
    this.setState({[`${event.target.id}`]: event.target.value})
  }

  onCategoryChange(event) {
    console.log(event.target.value);
    this.setState({category: event.target.value});
  }

  render() {
    return(
      <div className="topSpace" id="publishJob">
        <br />
        <p>PublishJob</p>
        <label htmlFor="title">כותרת*</label>
        <input name="title" id="title" onChange={this.onInputchange}/>
        <label htmlFor="details">פרטים</label>
        <input name="details" id="details" onChange={this.onInputchange}/>
        <label htmlFor="category">קטגוריה*</label>
        <select value={this.state.category} onChange={this.onCategoryChange}>
        {
          (this.state.categories).map(category =>
            <option
              value={category.category_id}
              key={category.category_id}
            >{category.category_name}</option>
            )
        }
        </select><br/>
        <label htmlFor="salary">שכר</label>
        <input name="salary" id="salary" onChange={this.onInputchange}/>
        <label htmlFor="date">תאריך תפוגה</label>
        <input type="date" name="date" id="date" onChange={this.onInputchange}/>
        <label htmlFor="area">אזור*</label>
        <input name="area" id="area" onChange={this.onInputchange}/>
        <label htmlFor="city">עיר</label>
        <input name="city" id="city" onChange={this.onInputchange}/>
        <input type="submit" value="פרסם" onClick={this.handleJobSubmit}/>
      </div>
    );
  }
}

export default PublishJob;