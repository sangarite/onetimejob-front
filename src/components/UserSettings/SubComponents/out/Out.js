import React from 'react';
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import Loader from '../../../Loader/Loader'
import './out.css'

const Delete = (props) => {

	const history = useHistory();

	const onButtonClick = (event) => {
		if (event.target.id === 'yes') {
			props.toggleLoader();
			fetch('https://onetimejob-server.herokuapp.com/settings/delete', {
				method: 'delete',
				headers: { 'Content-Type': 'application/json'},
				body: JSON.stringify({ id: props.user.user_id })
			})
			.then(response => response.json())
			.then(data => {
				props.toggleLoader();
				Swal.fire({
					text: 'החשבון שלך נמחק',
					icon: 'success',
					confirmButtonText: 'תודה'
				})
			})
			.catch(err => {
				console.log('error deleteing account');
				props.toggleLoader();
				return;
			})
			props.handleUserOut();
		}
		history.push("/");
	}

	return(
		<div id="out">
			<div id="j-loader">{props.displayLoader ? <Loader /> : null}</div>
			<p>האם אתה בטוח שברצונך למחוק את החשבון שלך לחלוטין. כל הנתונים שלך יימחקו.</p>
			<button onClick={onButtonClick} id="yes" className="button">כן</button>
			<button onClick={onButtonClick} id="no" className="button">לא</button>
		</div>
	);
}

export default Delete;
