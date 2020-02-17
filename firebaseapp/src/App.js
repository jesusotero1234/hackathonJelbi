import _ from "lodash";
import React from "react";
import { compose, withProps } from "recompose";

import { LineChart, XAxis, Tooltip, Line, CartesianGrid } from 'recharts'
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	Polygon
} from "react-google-maps";
import './App.css'

import jsonData from './geojson.json'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
import styles from './GoogleMapStyles.json'

import API from './API'

// ASSETS
import Warnimage from './assets/warning.png'
import KickScooter from './assets/kickscooter2.png'
import EScooter from './assets/scooter2.png'
import Car from './assets/car2.png'
import Bike from './assets/bike2.png'
import Weather from './assets/weather3.png'
import Foot from './assets/foot2.png'

// Imnport Data

import JelbiData from './ubahn.json'

const MyPolygon = (props) => {

	const path = []

	props.station.geometry.coordinates[0].forEach((coordinate) => {
		path.push({ lat: coordinate[1], lng: coordinate[0] })
	})

	return <Polygon
		defaultOptions={{
			strokeColor: "#f8f32b",
			fillColor: "#f8f32b",
			strokeWeight: 15,
			strokeOpacity: "0.9"
		}}
		path={path}
	/>
}
const MyMapComponent = compose(
	withProps({
		googleMapURL:
			"https://maps.googleapis.com/maps/api/js?key=AIzaSyAO1DtQG5J5nyIHL7UCT3SGWelDNzGgESE&v=3.exp&libraries=geometry,drawing",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `100%` }} />,
		mapElement: <div style={{ height: `100%` }} />
	}),
	withScriptjs,
	withGoogleMap
)(props => (



	<div >
		<GoogleMap
			zoom={props.defaultZoom}
			center={props.defaultCenter}
			defaultOptions={{
				// disableDefaultUI: true, // disable default map UI
				// draggable: true, // make map draggable
				// keyboardShortcuts: false, // disable keyboard shortcuts
				// scaleControl: true, // allow scale controle
				// scrollwheel: true, // allow scroll wheel
				styles: styles // change default map styles
			}}
		>
			{
				jsonData.map((station) => {
					return <MyPolygon station={station} />
				})
			}

			{
				props.markers.map((item, index) => {
					return <Marker key={index} position={{ "lat": item.lat, "lng": item.lng }}></Marker>
				})
			}



		</GoogleMap >
	</div >
));


const enhance = _.identity;

class ReactGoogleMaps extends React.Component {

	state = {
		defaultCenter: {
			lat: 52.518458, lng: 13.404187
		},
		defaultZoom: 11,
		notes: []
	}

	async componentDidMount() {
		try {
			const res = await API.test()
			console.log(res)
		} catch (error) {
			console.log(error)
		}
	}

	render() {

		var markers = []

		JelbiData.forEach((station) => {
			if (station["coordinates"]) {
				Object.keys(station["coordinates"]).forEach((key) => {
					Object.keys(station["coordinates"][key]).forEach((secondKey) => {
						const sharingOptions = station["coordinates"][key]
						Object.keys(sharingOptions).forEach((thirdKey) => {
							// console.log(sharingOptions[thirdKey])
							if (sharingOptions[thirdKey][0] && sharingOptions[thirdKey][0].lat && sharingOptions[thirdKey][0].long) {
								markers.push({ lat: sharingOptions[thirdKey][0].lat, lng: sharingOptions[thirdKey][0].long })
							}
						})
					})
				})
			}
		})

		console.log(markers)


		return [
			<div className="App" style={{ display: "flex", position: "relative" }}>
				<div className="Header">
					<div className="jelbiLogo">
						Jelbi
					</div>
					<div className="jelbiHeaderTitle">
						Dashboard
					</div>
				</div>

				<div style={{
					display: "flex",
					position: "absolute",
					top: "70px",
					bottom: 0,
					left: 0,
					right: 0,
				}}>
					<div className="AppColumn" style={{ flex: 4, padding: "10px" }} >
						<Accordion defaultActiveKey="0" style={{ overflowY: "scroll" }}>
							{
								JelbiData.map((e, index) => {
									return <Card key={index}>
										<Card.Header style={{ display: "flex" }}>
											<Accordion.Toggle as={Button} variant="link" eventKey={index} style={{ display: "flex", flex: "1" }} onClick={() => {

												this.setState({
													defaultCenter: {
														lat: e.lat, lng: e.long
													},
													defaultZoom: 18,
													notes: e.notes || []
												})
											}}>
												<div className="title" style={{ textDecoration: "none", color: "black" }}>
													{e.name}
												</div>
												<div className="warnImage" style={{ backgroundImage: e.colour === "red" ? `url(${Warnimage})` : "none" }}>
												</div>
												<div className="circle" style={{ backgroundColor: e.colour === "red" ? "crimson" : e.colour }} />
											</Accordion.Toggle>
										</Card.Header>
										<Accordion.Collapse eventKey={index}>
											<Card.Body style={{ display: "flex", flexDirection: "column", flex: "1", alignItems: "center" }}>
												<div style={{ display: "flex", flex: 1 }}>
													<div style={{ display: "flex", flex: 1 }} className="contentImg" style={{ backgroundImage: `url(${KickScooter})` }}>
														<div className="zusatzInfo"> Bestand: {e.kick_scooters} / Bedarf: {index % 2 === 0 ? e.kick_scooters + 2 : e.kick_scooters - 2} / Kapazität: {e.places_kick_scooters} </div>
													</div>
													<div style={{ display: "flex", flex: 1 }} className="contentImg" style={{ backgroundImage: `url(${EScooter})` }}>
														<div className="zusatzInfo">Bestand: {e.scooters} /  Bedarf: {index % 2 === 0 ? e.scooters + 2 : e.scooters - 2} / Kapazität: {e.places_scooters}</div>
													</div>
													<div style={{ display: "flex", flex: 1 }} className="contentImg" style={{ backgroundImage: `url(${Foot})` }}>
														{/* <div className="zusatzInfo">{e.kick_scooters} / {e.places_kick_scooters}</div> */}
													</div>
												</div>
												<div style={{ display: "flex", flex: 1 }}>
													<div style={{ display: "flex", flex: 1 }} className="contentImg" style={{ backgroundImage: `url(${Bike})` }}>
														<div className="zusatzInfo"> Bestand:{e.bikes} /Bedarf:  {index % 2 === 0 ? e.bikes + 2 : e.bikes - 2}  / Kapazität: {e.places_bikes}</div>
													</div>
													<div style={{ display: "flex", flex: 1 }} className="contentImg" style={{ backgroundImage: `url(${Car})` }}>
														<div className="zusatzInfo"> Bestand:{e.cars} / Bedarf:  {index % 2 === 0 ? e.cars + 2 : e.cars - 2}  / Kapazität: {e.places_cars} </div>
													</div>
													<div style={{ display: "flex", flex: 1 }} className="contentImg" style={{ backgroundImage: `url(${Weather})` }}>
														{/* <div className="zusatzInfo">{e.kick_scooters} / {e.places_kick_scooters}</div> */}
													</div>
												</div>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
								})
							}

						</Accordion>
						}
				</div>
					<div className="AppColumn" style={{ minWidth: "400px" }}>
						<div className="MeldungenBox" style={{ flex: 1 }}>
							<div className="BoxTitle">Meldungen</div>
							{
								this.state.notes.map((note, index) => {
									return <Card key={index} className="meldungCard" body>
										<div className="time">{note.time}</div>
										<div className="title">{note.message}</div>
										<div className="desc">{note.info}</div>
									</Card>
								})

							}
						</div>
						<div style={{ flex: 1 }}>
							<MyMapComponent key="map" defaultCenter={this.state.defaultCenter} defaultZoom={this.state.defaultZoom} markers={markers} />
						</div>
					</div>
				</div>
				{/* <div className="AppColumn" >
				<LineChart
					width={400}
					height={400}
					data={data}
					margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
				>
					<XAxis dataKey="name" />
					<Tooltip />
					<CartesianGrid stroke="#f5f5f5" />
					<Line type="monotone" dataKey="uv" stroke="#ff7300" yAxisId={0} />
					<Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
				</LineChart>
			</div> */}


			</div>

		]
	}
}

export default enhance(ReactGoogleMaps)