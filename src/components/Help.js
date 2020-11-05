import React, { Component} from 'react'

export default class Help extends Component
{
    constructor() {
      super();
      this.state = {
        data: []
      }
    }

    componentDidMount() {
        fetch('http://localhost:3000/help')
        .then(response => response.json())
        .then(data => this.setState({data: data}))
        .catch(error => console.log(error))
    }

    render() {
      return(
        <div className="topSpace">
        <br/>
        <br/>
          {
            this.state.data.map((question) =>
              <p key={question.id}>Q: {question.question} <br/>A: {question.answer}</p>
            )
          }
          </div>
        )
    }
}
