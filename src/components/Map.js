import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import fire from '../firebase';
// import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
// import { Typography } from 'material-ui/styles';
import KEYS from '../config/keys';
// import MapSearchBox from './MapSearchBox';
import {Button, TextField} from "@material-ui/core";

let map;
let service;
let infowindow;
let autocomplete;
let latitude;
let longitude;
let markers = [];
let request;
let place;

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

	static async createMarker(locationObj){
		const marker = await new window.google.maps.Marker({ position: locationObj, map: map });
		// markers.push(marker);

		// push lat & lng obj to firebase
		fire.database().ref('placesVisited').push(locationObj);
		// Map.renderMapMarkers();
		// console.log('markersss:', markers)
	}

	// static async renderMapMarkers() {
	//
	// 	// markers = markers.filter((marker, index, self) => {
	// 	// 	return index === self.indexOf(marker);
	// 	// })
	//
	//
	//
	// 	// markers = await markers.map(marker => {
	// 	// 	// filter duplicates
	// 	// 	return new window.google.maps.Marker({ position: marker, map: map });
	// 	// });
	// }

	onSubmit = async (e) => {
		e.preventDefault();

		place = await autocomplete.getPlace();

		await alert(`
			${place.name}
			${place.formatted_address}
			${place.formatted_phone_number}
			${place.website}
			Average Stars: ${place.rating}
			`);


		latitude = await parseFloat(place.geometry.location.lat());
		longitude = await parseFloat(place.geometry.location.lng());
		let markerLocation = { lat: latitude, lng: longitude}
		await Map.createMarker(markerLocation)

		console.log('markers.length:',markers.length)

		// Map.renderMapMarkers();
	}

	async componentDidMount() {

		let placesVisitedRef = fire.database().ref('placesVisited');
		placesVisitedRef.on('value', (snapshot) => {
			snapshot.forEach(childSnapshot => {
				let childData = childSnapshot.val();
				console.log('db:', childData)
				markers.push(childData)
				new window.google.maps.Marker({ position: childData, map: map });
			});

			// Map.renderMapMarkers();
		});

		// Map.renderMapMarkers();
		// let placesVisitedRef = fire.database().ref('placesVisited');
		// placesVisitedRef.on('value', (snapshot) => {
		// 	snapshot.forEach(childSnapshot => {
		// 		let childData = childSnapshot.val();
		// 		console.log('db:', childData)
		// 		markers.push(childData)
		// 	});
		//
		// 	Map.renderMapMarkers();
		// });
	}

	async componentWillReceiveProps({isScriptLoadSucceed}){
		if (isScriptLoadSucceed) {

			map = new window.google.maps.Map(document.getElementById('map'), {
				zoom: 10,
				center: {lat: 41.900230, lng: -71.321290}
			});

			let defaultBounds = new window.google.maps.LatLngBounds(
				new window.google.maps.LatLng(41.900230, -71.321290)
			);

			let options = {
				bounds: defaultBounds,
				types: ['establishment'],
				componentRestrictions: {country: 'us'}
			};

			request = {
					query: this.state.value,
					fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
			};

			service = new window.google.maps.places.PlacesService(map);
			service.findPlaceFromQuery(request, this.callback);
			const searchBox = document.getElementById('searchBox');
			autocomplete = new window.google.maps.places.Autocomplete(searchBox, options);

		}
		else{
			alert("script not loaded")
		}
	}

	render(){
		return(
			<div>
				<div id="map" style={{height: "600px"}}/>
				<form onSubmit={this.onSubmit}>
					<TextField
						onChange={(event) => { this.setState({ value: event.target.value}) }}
						id="searchBox"
						label="Search Places"
						style={{margin: 8}}
						placeholder="Less Than Greater Than, Hudson MA"
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