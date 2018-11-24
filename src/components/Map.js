import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
// import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
// import { Typography } from 'material-ui/styles';
import KEYS from '../config/keys';
// import MapSearchBox from './MapSearchBox';
import {Button, TextField} from "@material-ui/core"

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


class Map extends Component{

	state = {
		value: ''
	};

	onSubmit = (e) => {
		e.preventDefault();
		// this.setState({ value: this.props.onChange });
		console.log(this.state.value)
	}

	static callback(results, status) {
		if (status === window.google.maps.places.PlacesServiceStatus.OK) {
			for (let i = 0; i < results.length; i++) {
				let place = results[i];
				// createMarker(results[i]);
			}
		}
	}

	componentWillReceiveProps({isScriptLoadSucceed}){
		if (isScriptLoadSucceed) {

			let map;
			let service;
			let infowindow;
			let autocomplete;

			map = new window.google.maps.Map(document.getElementById('map'), {
				zoom: 10,
				center: {lat: 41.900230, lng: -71.321290}
			});

			console.log('map:', map);

			const markers = [{lat: 41.900230, lng: -71.321290}, {lat: 42.390991, lng: -71.579727}]
			const home = {lat: 41.900230, lng: -71.321290}
			const homeMarker = new window.google.maps.Marker({position: home, map: map});

			markers.map(marker => {
				return new window.google.maps.Marker({ position: marker, map: map });
			});

			let request = {
				query: 'Less Than Greater Than',
				fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
			};

			var defaultBounds = new window.google.maps.LatLngBounds(
				new window.google.maps.LatLng(41.900230, -71.321290)
			);

			var options = {
				bounds: defaultBounds,
				types: ['establishment']
			};

			service = new window.google.maps.places.PlacesService(map);
			service.findPlaceFromQuery(request, this.callback);



			autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('searchBox'), options);



			// console.log('service:', service)


		}
		else{
			alert("script not loaded")
		}
	}

	render(){
		return(
			<div>
				<div id="map" style={{height: "600px"}}/>
				{/*<MapSearchBox onChange={event => event.target.value}/>*/}
				<form onSubmit={this.onSubmit}>
					<TextField
						onChange={(event) => { this.setState({ value: event.target.value}) }}
						id="searchBox"
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
			</div>
		)
	}
}

export default scriptLoader(
	[`https://maps.googleapis.com/maps/api/js?key=${KEYS.GOOGLE_MAPS_API}&libraries=places`]
)(Map)