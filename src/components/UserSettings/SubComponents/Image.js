import React from 'react';

class Image extends React.Component {

	constructor(props) {
		super(props);
		this.state = { image: null };
		this.onImageChange = this.onImageChange.bind(this);
	}

	onImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0];
			this.setState({ image: URL.createObjectURL(img)});
		}
	}

	render() {
		return (
			<div>
				<img src={this.state.image} />
				<input type="file" name="image" onChange={this.onImageChange}/>
			</div>
		);
	}
}

export default Image;
