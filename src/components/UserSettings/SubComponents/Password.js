import React from 'react';

class Password extends React.Component {

	onButtonSubmit = (event) => {
		//confirm the old Password
		//confirm the new password
	}

	render() {
		return (
			<div>
				<input
					type="text"
					id="oldPassword"
					placeholder="סיסמה נוכחית"
					onChange={this.onInputChange}
				/><br/>
				<input
					type="text"
					id="newPassword"
					placeholder="סיסמה חדשה"
					onChange={this.onInputChange}
				/><br/>
				<input
					type="text"
					id="confirmPassword"
					placeholder="אימות סיסמה"
					onChange={this.onInputChange}
				/><br/>
				<input
					type="submit"
					id="saveChanges"
					name="changePasswor"
					value="שנה סיסמה"
					onClick={this.onButtonSubmit}
				/>
			</div>
		);
	}
}

export default Password;
