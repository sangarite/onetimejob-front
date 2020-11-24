import React, { Component} from 'react'
import './help.css'

export default class Help extends Component
{
    constructor() {
      super();
      this.state = {
        data: [],
        name: '',
        email: '',
        subject: '',
        message: ''
      }
      this.onInputChange = this.onInputChange.bind(this);
      this.resetForm = this.resetForm.bind(this);
      this.onSend = this.onSend.bind(this);
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

    resetForm(){
        this.setState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
    }

    onSend(event) {
      fetch('http://localhost:3000/help/send', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          subject: this.state.subject,
          message: this.state.message + '\nemail: ' + this.state.email
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.msg === 'success') {
          alert('email sent, awesome!');
          this.resetForm();
        } else if (data.msg == 'fail') {
          alert('Oops, something went wrong. Try again')
        }
      })
      this.resetForm();
    }

    onInputChange(event) {
      this.setState({[`${event.target.id}`]: event.target.value})
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
              <input name="name" placeholder="שם" onChange={this.onInputChange} id="name"/>
              <input name="email" placeholder="דואר אלקטרוני" type="email" required onChange={this.onInputChange} id="email"/>
              <input name="subject" placeholder="נושא" onChange={this.onInputChange} id="subject"/>
              <textarea name="content" placeholder="תוכן הפניה" rows="5" cols="50" required onChange={this.onInputChange} id="message"/>
              <input type="submit"  value="שלח" id="submit" onClick={this.onSend}/>
            </div>
          </div>
        )
    }
}
