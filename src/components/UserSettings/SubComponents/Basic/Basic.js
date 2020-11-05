import React from 'react';
import './Basic.css';

class Basic extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: this.props.user.user_name,
			email: this.props.user.email,
			phone: this.props.user.phone,
			city: this.props.user.city,
			country: this.props.user.country,
			neighborhood: this.props.user.neighborhood
		}
	}

	onInputChange = (event) => {
		this.setState({[`${event.target.id}`]: event.target.value})
	}

	onButtonSubmit = () => {
		if(this.state.phone.length !== 10)
		return alert("Invalid Phone Number");
		fetch('http://localhost:3000/settings/basic', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: this.props.user.user_id,
				name: this.state.name,
				password: this.state.password,
				email: this.state.email,
				phone: this.state.phone,
				city: this.state.city,
				country: this.state.country
			})
		})
		.then(response => response.text())
		.then((data) => window.alert(data))
		.catch((err) => console.log(err))
	}

	render() {
		return (
			<div id="basic">
				<input
					type="text"
					id="name"
					name="name"
					placeholder="שם משתמש"
					value={this.state.name}
					onChange={this.onInputChange}
				/><br/>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="מייל"
					value={this.state.email}
					onChange={this.onInputChange}
				/><br/>
				<input
					type="tel"
					id="phone"
					name="phone"
					placeholder="פלאפון"
					value={this.state.phone}
					onChange={this.onInputChange}
				/><br/>
				<input
					id="city"
					name="city"
					placeholder="עיר"
					value={this.state.city}
					onChange={this.onInputChange}
				/><br/>
				<input
					id="area"
					name="area"
					placeholder="אזור"
					value={this.state.area}
					onChange={this.onInputChange}
				/><br/>
				<input
					id="neighborhood"
					name="neighborhood"
					placeholder="שכונה"
					value={this.state.neighborhood}
					onChange={this.onInputChange}
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
