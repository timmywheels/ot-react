import React, {Component} from 'react';
import { TextField, Button } from '@material-ui/core';

const styles = theme => ({
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	button: {
		margin: theme.spacing.unit,
		display: 'inline-flex'
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
	iconSmall: {
		fontSize: 20,
	},
});

class MapSearchBox extends Component {
	constructor(props) {
		super(props)
	}

	onSubmit = (e) => {
		e.preventDefault();
		console.log('props:', this.props)
	}

	render() {
		const { classes } = this.props;
		console.log('this.props:', this.props);
		return (
			<form onSubmit={this.onSubmit}>
				<TextField
					id="filled-full-width"
					label="Search Places"
					style={{margin: 8}}
					placeholder="Less Than Greater Than Hudson MA"
					fullWidth
					margin="normal"
					variant="filled"
					InputLabelProps={{
						shrink: true,
					}}
				/>
				<Button type="submit" variant="contained" color="primary" className={styles.button}>
					Search
				</Button>
			</form>
		)
	}
}

export default MapSearchBox;