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

const center = {
	lat: 52.518458, lng: 13.404187
}

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
	path = { path }
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
			defaultZoom={11}
			defaultCenter={center}
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

		</GoogleMap >
	</div>
));


const enhance = _.identity;

const data = [
	{ name: 'Page A', uv: 1000, pv: 2400, amt: 2400, uvError: [75, 20] },
	{ name: 'Page B', uv: 300, pv: 4567, amt: 2400, uvError: [90, 40] },
	{ name: 'Page C', uv: 280, pv: 1398, amt: 2400, uvError: 40 },
	{ name: 'Page D', uv: 200, pv: 9800, amt: 2400, uvError: 20 },
	{ name: 'Page E', uv: 278, pv: null, amt: 2400, uvError: 28 },
	{ name: 'Page F', uv: 189, pv: 4800, amt: 2400, uvError: [90, 20] },
	{ name: 'Page G', uv: 189, pv: 4800, amt: 2400, uvError: [28, 40] },
	{ name: 'Page H', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
	{ name: 'Page I', uv: 189, pv: 4800, amt: 2400, uvError: 28 },
	{ name: 'Page J', uv: 189, pv: 4800, amt: 2400, uvError: [15, 60] },
];

const ReactGoogleMaps = () => [
	<div className="App" style={{ display: "flex" }}>
		<div className="AppColumn" >
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
		</div>
		<div className="AppColumn" style={{ flex: 3 }} >
			<MyMapComponent key="map" />
		</div>
		<div className="AppColumn" style={{ flex: 2, padding: "10px" }} >

			<Accordion defaultActiveKey="0">
				{
					[1, 1, 1].map((e, index) => {
						return <Card key={index}>
							<Card.Header>
								<Accordion.Toggle as={Button} variant="link" eventKey={index}>
									Click me!
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey={index}>
								<Card.Body>Hello! I'm the body</Card.Body>
							</Accordion.Collapse>
						</Card>
					})
				}

			</Accordion>
			}
		</div>
	</div>

]

export default enhance(ReactGoogleMaps);