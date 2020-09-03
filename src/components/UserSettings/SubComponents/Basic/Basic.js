import React from 'react';
import './Basic.css';

class Basic extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: this.props.user.name,
			email: this.props.user.email,
			phone: this.props.user.phone
		}
	}

	onNameChange = (event) => {
		this.setState({name: event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	onPhoneChange = (event) => {
		this.setState({phone: event.target.value});
	}

	onButtonSubmit = () => {
		//sends the values to the server
	}

	render() {
		return (
			<div>
				<input
					type="text"
					id="name"
					name="name"
					placeholder="שם משתמש"
					value={this.state.name}
					onChange={this.onNameChange}
				/><br/>
				<input
					type="email"
					id="emial"
					name="email"
					placeholder="מייל"
					value={this.state.email}
					onChange={this.onEmailChange}
				/><br/>
				<input
					type="tel"
					id="phone"
					name="phone"
					placeholder="פלאפון"
					value={this.state.phone}
					onChange={this.onPhoneChange}
				/><br/>
				<input
					type="submit"
					id="saveChanges"
					name="savechanges"
					value="שמור שינויים"
					onClick={this.onButtonSubmit}
				/>
			</div>
		);
	}
}

export default Basic;
