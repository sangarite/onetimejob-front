import React from 'react';
import Swal from 'sweetalert2'
import Loader from '../../../Loader/Loader'
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
		Swal.fire({
			text: 'פלאפון לא חוקי',
			icon: 'warning',
			confirmButtonText: 'בסדר'
		});
		this.props.toggleLoader();
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
		.then((data) => {Swal.fire({text: data}); this.props.toggleLoader();})
		.catch((err) => {console.log(err); this.props.toggleLoader();})
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
					className="input"
				/><br/>
				<input
					type="email"
					id="email"
					name="email"
					placeholder="מייל"
					value={this.state.email}
					onChange={this.onInputChange}
					className="input"
				/><br/>
				<input
					type="tel"
					id="phone"
					name="phone"
					placeholder="פלאפון"
					value={this.state.phone || "פלאפון"}
					onChange={this.onInputChange}
					className="input"
				/><br/>
				<input
					id="city"
					name="city"
					placeholder="עיר"
					value={this.state.city}
					onChange={this.onInputChange}
					className="input"
				/><br/>
				<input
					id="area"
					name="area"
					placeholder="אזור"
					value={this.state.area}
					onChange={this.onInputChange}
					className="input"
				/><br/>
				<input
					id="neighborhood"
					name="neighborhood"
					placeholder="שכונה"
					value={this.state.neighborhood}
					onChange={this.onInputChange}
					className="input"
				/><br/>
				<input
					type="submit"
					id="saveChanges"
					name="savechanges"
					value="שמור שינויים"
					onClick={this.onButtonSubmit}
					className="button"
				/>
			</div>
		);
	}
}

export default Basic;
