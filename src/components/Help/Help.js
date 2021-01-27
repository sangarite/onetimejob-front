import React, { Component} from 'react'
import Swal from 'sweetalert2'
import Loader from '../Loader/Loader'
import './help.css'

export default class Help extends Component
{
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
      this.onInputChange = this.onInputChange.bind(this);
      this.resetForm = this.resetForm.bind(this);
      this.onSend = this.onSend.bind(this);
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
      if (!this.state.email || !this.state.message) {
        Swal.fire({
          text: 'יש להכניס מייל ותוכן בגוף ההודעה',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      } else {
        this.props.toggleLoader();
        fetch('https://onetimejob-server.herokuapp.com/send', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: this.state.name,
            email: 'one11timejob@gmail.com',
            subject: this.state.subject,
            message: this.state.message + '\nemail: ' + this.state.email + '\nname: ' + this.state.name
          })
        })
        .then(response => response.json())
        .then(data => {
          this.props.toggleLoader();
          if (data.msg === 'success') {
            Swal.fire({
              text: 'הודעתך התקבלה. נחזור אליך בהקדם האפשרי.',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            })
            this.resetForm();
          } else if (data.msg === 'fail') {
            Swal.fire({
              title: 'שגיאה',
              text: 'הודעתך לא נשלחה כראוי. נסה שוב.',
              icon: 'error',
              confirmButtonText: 'Cool'
            })
          }
        })
      }
      this.resetForm();
    }

    onInputChange(event) {
      this.setState({[`${event.target.id}`]: event.target.value})
    }

    render() {
      return(
        <div id="help">
          <div id="j-loader">{this.props.displayLoader ? <Loader /> : null}</div>
          <p>שאלות נפוצות</p>
          <div id="questions">
            {
              this.props.questions.map((question) => {
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
              <input name="name" placeholder="שם" onChange={this.onInputChange} id="name" className="input"/>
              <input name="email" placeholder="דואר אלקטרוני" type="email"  className="input" required onChange={this.onInputChange} id="email"/>
              <input name="subject" placeholder="נושא"  className="input" onChange={this.onInputChange} id="subject"/>
              <textarea name="content" placeholder="תוכן הפניה" rows="5" cols="50" required onChange={this.onInputChange} id="message"/>
              <input type="submit"   className="input" value="שלח" id="submit" onClick={this.onSend}/>
            </div>
          </div>
        )
    }
}
