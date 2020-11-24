import React, { Component} from 'react'
import './help.css'

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

    toggle(event) {
      event.target.classList.toggle("active");
      var panel = event.target.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    }

    render() {
      return(
        <div id="help">
          <p>שאלות נפוצות</p>
          <div id="questions">
            {
              this.state.data.map((question) => {
                return(
                  <div key={question.id}>
                    <button className='accordion' onClick={event => this.toggle(event)}>{question.question}</button>
                    <div className='panel'>
                      <p>{question.answer}</p>
                    </div>
                  </div>
                );

                }
              )
            }
            </div>
            <p>צור קשר</p>
            <div id="contact">
              <input name="name" placeholder="שם" />
              <input name="email" placeholder="דואר אלקטרוני" type="email" />
              <input name="subject" placeholder="נושא" />
              <textarea name="content" placeholder="תוכן הפניה" rows="5" cols="50"></textarea>
              <input type="submit"  value="שלח" id="submit"/>
            </div>
          </div>
        )
    }
}
