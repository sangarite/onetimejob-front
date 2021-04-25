import React from 'react';
import Swal from 'sweetalert2'
import Loader from '../../../Loader/Loader'
import { API_URL } from '../../../../config'
import './Basic.css';

class Basic extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: this.props.user.user_name,
			email: this.props.user.email,
			phone: this.props.user.phone,
			city: this.props.user.city,
			area: this.props.user.area,
			neighborhood: this.props.user.neighborhood
		}
	}

	onInputChange = (event) => {
		this.setState({[`${event.target.id}`]: event.target.value})
	}

	onButtonSubmit = () => {
		if(this.state.phone && this.state.phone.length !== 10) {
			Swal.fire({
				text: 'פלאפון לא חוקי',
				icon: 'warning',
				showConfirmButton: false,
  				timer: 2000
			});
			return;
		}
		this.props.toggleLoader();
		fetch(`${API_URL}/settings/basic`, {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: this.props.user.user_id,
				name: this.state.name,
				password: this.state.password,
				email: this.state.email,
				phone: this.state.phone,
				city: this.state.city,
				area: this.state.area,
				neighborhood: this.state.neighborhood
			})
		})
		.then(response => response.text())
		.then((data) => {
			Swal.fire({
				icon: 'success', 
				text: data,
				showConfirmButton: false,
  				timer: 2000
			}); 
			this.props.toggleLoader();
		})
		.catch((err) => {console.log(err); this.props.toggleLoader();})
	}

	render() {
		return (
			<div id="basic">
				<div className="s-loader">
					{this.props.displayLoader ? <Loader /> : null}
				</div>
				<input
					type="text"
					id="name"
					name="name"
					value={(this.state.name === null) ? "שם משתמש" : this.state.name}
					onChange={this.onInputChange}
					className="input"
					placeholder="שם משתמש"
				/><br/>
				<input
					type="email"
					id="email"
					name="email"
					value={(this.state.email == null) ? "מייל" : this.state.email}
					onChange={this.onInputChange}
					className="input"
					placeholder="אמייל"
				/><br/>
				<input
					type="tel"
					id="phone"
					name="phone"
					value={(this.state.phone === null) ? "פלאפון" : this.state.phone}
					onChange={this.onInputChange}
					className="input"
					placeholder="פלאפון"
				/><br/>
				<input
					id="city"
					name="city"
					value={(this.state.city === null) ? "עיר" : this.state.city}
					onChange={this.onInputChange}
					className="input"
					placeholder="עיר"
				/><br/>
				<input
					id="area"
					name="area"
					value={(this.state.area === null) ? "אזור" : this.state.area}
					onChange={this.onInputChange}
					className="input"
					placeholder="אזור"
				/><br/>
				<input
					id="neighborhood"
					name="neighborhood"
					value={(this.state.neighborhood === null) ? "שכונה" : this.state.neighborhood}
					onChange={this.onInputChange}
					className="input"
					placeholder="שכונה"
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
