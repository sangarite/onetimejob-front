import React from 'react'
import './password.css'
import Swal from 'sweetalert2'
import Loader from '../../../Loader/Loader'

class Password extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			newPassword: '',
			oldPassword: '',
			confirmPassword: ''
		}
		this.onInputChange = this.onInputChange.bind(this);
		this.onButtonSubmit = this.onButtonSubmit.bind(this);
	}

	onInputChange(event) {
		this.setState({[`${event.target.id}`]: event.target.value})
	}

	onButtonSubmit(event) {
		this.props.toggleLoader();
		fetch('http://localhost:3000/settings/password', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: this.props.user.user_id,
				newPassword: this.state.newPassword,
				oldPassword: this.state.oldPassword,
				confirmPassword: this.state.confirmPassword
			})
		})
		.then(response => response.json())
		.then(data => {Swal.fire({text: 'הסיסמה שונתה'}); this.props.toggleLoader();})
		.catch(err => {Swal.fire({text: 'ישנה בעיה. נסה שוב מאוחר יותר.'}); this.props.toggleLoader();})
	}

	render() {
		return (
			<div id="password">
				<div id="j-loader">{this.props.displayLoader ? <Loader /> : null}</div>
				<input
					type="text"
					id="oldPassword"
					placeholder="סיסמה נוכחית"
					onChange={this.onInputChange}
					className="input"
				/><br/>
				<input
					type="text"
					id="newPassword"
					placeholder="סיסמה חדשה"
					onChange={this.onInputChange}
					className="input"
				/><br/>
				<input
					type="text"
					id="confirmPassword"
					placeholder="אימות סיסמה"
					onChange={this.onInputChange}
					className="input"
				/><br/>
				<input
					type="submit"
					id="saveChanges"
					name="changePasswor"
					value="שנה סיסמה"
					onClick={this.onButtonSubmit}
					className="button"
				/>
			</div>
		);
	}
}

export default Password;
