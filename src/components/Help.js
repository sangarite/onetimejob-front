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
        fetch('http://localhost:3000/')
        .then(response => response.json())
        .then(data => this.setState({data: data.recordset[0].name}))
        .catch(error => console.log(error))
    }
    render() {
      return(
        <div className="topSpace">
          {this.state.data}
          </div>
        )
    }
}
