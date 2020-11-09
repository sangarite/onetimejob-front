import React from 'react';
import { useHistory } from 'react-router-dom'

const Delete = (props) => {

	const history = useHistory();

	const onButtonClick = (event) => {
		if (event.target.id === 'yes') {
			fetch('http://localhost:3000/settings/delete', {
				method: 'delete',
				headers: { 'Content-Type': 'application/json'},
				body: JSON.stringify({ id: props.user.user_id })
			})
			.then(response => response.json())
			.then(data => console.log(data))
			.catch(err => console.log(err))
			window.alert('נמחקת בהצלחה')
			props.handleUserOut();
		}
		history.push("/");
	}

	return(
		<div>
			<p>האם אתה בטוח שברצונך למחוק את החשבון שלך לחלוטין. כל הנתונים שלך יימחקו.</p>
			<button onClick={onButtonClick} id="yes">כן</button>
			<button onClick={onButtonClick} id="no">לא</button>
		</div>
	);
}

export default Delete;
