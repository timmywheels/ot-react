import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import KEYS from '../config/keys';

class Map extends Component{
	constructor(props) {
		super(props);
	}
	componentWillReceiveProps({isScriptLoadSucceed}){
		if (isScriptLoadSucceed) {
			const markers = [{lat: 41.900230, lng: -71.321290}]

			const map = new window.google.maps.Map(document.getElementById('map'), {
				zoom: 10,
				center: {lat: 41.900230, lng: -71.321290}
			})
		}
		else{
			alert("script not loaded")
		}
	}

	render(){
		return(
			<div>
				<div id="map" style={{height: "600px"}}/>
			</div>
		)
	}
}

export default scriptLoader(
	[`https://maps.googleapis.com/maps/api/js?key=${KEYS.GOOGLE_MAPS_API}`]
)(Map)