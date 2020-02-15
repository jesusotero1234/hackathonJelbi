import React from 'react'
import './App.css'
import PropTypes from 'prop-types'

import {
  Data
} from '@react-google-maps/api'
// THIRD PARTY LIBRARIES
import axios from 'axios'

import GoogleMapReact from 'google-map-react'

import { withGoogleMap, GoogleMap, Polygon } from 'react-google-maps'

import jsonData from './geojson.json'

const center = {
  lat: 38.805470223177466,
  lng: -118.76220703125
}

const onClick = (...args) => {
  console.log('onClick args: ', args[0].latLng.lat(), ' : ', args[0].latLng.lng())
}

const onMapLoad = (map) => {
  console.log('map.data: ', map.data)
  // map.data.loadGeoJson('/geo.json')
}

const onDataLoad = data => {
  console.log('data: ', data)
}

const dataOptions = {
  controlPosition: 'TOP_LEFT',
  controls: ['Point'],
  drawingMode: 'Point', //  "LineString" or "Polygon".
  featureFactory: geometry => {
    console.log('geometry: ', geometry)
  },
  // Type:  boolean
  // If true, the marker receives mouse and touch events. Default value is true.
  clickable: true,

  // Type:  string
  // Mouse cursor to show on hover. Only applies to point geometries.
  // cursor: 'cursor',

  // Type:  boolean
  // If true, the object can be dragged across the map and the underlying feature will have its geometry updated. Default value is false.
  draggable: true,

  // Type:  boolean
  // If true, the object can be edited by dragging control points and the underlying feature will have its geometry updated. Only applies to LineString and Polygon geometries. Default value is false.
  editable: false,

  // Type:  string
  // The fill color. All CSS3 colors are supported except for extended named colors. Only applies to polygon geometries.
  fillColor: '#F05',

  // Type:  number
  // The fill opacity between 0.0 and 1.0. Only applies to polygon geometries.
  fillOpacity: 1,

  // Type:  string|Icon|Symbol
  // Icon for the foreground. If a string is provided, it is treated as though it were an Icon with the string as url. Only applies to point geometries.
  // icon: 'icon',

  // Type:  MarkerShape
  // Defines the image map used for hit detection. Only applies to point geometries.
  // shape: 'shape',

  // Type:  string
  // The stroke color. All CSS3 colors are supported except for extended named colors. Only applies to line and polygon geometries.
  strokeColor: '#00FF55',

  // Type:  number
  // The stroke opacity between 0.0 and 1.0. Only applies to line and polygon geometries.
  strokeOpacity: 1,

  // Type:  number
  // The stroke width in pixels. Only applies to line and polygon geometries.
  strokeWeight: 2,

  // Type:  string
  // Rollover text. Only applies to point geometries.
  title: 'Title',

  // Type:  boolean
  // Whether the feature is visible. Defaults to true.
  visible: true,

  // Type:  number
  // All features are displayed on the map in order of their zIndex, with higher values displaying in front of features with lower values. Markers are always displayed in front of line-strings and polygons.
  zIndex: 2
}

const Annotation = ({ text }) =>
  <div
    style={{
      // backgroundImage: "url(" + XMASLovePic + ")",
      width: "25px",
      backgroundColor: "transparent",
      height: "25px",
      backgroundSize: "cover"
    }}
  ></div>

class SimpleMap extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      trainstations: [],
      stations: []
    }

  }

  static defaultProps = {
    center: {
      lat: 52.545025, //50.845025, 10.121814
      lng: 13.421814
    },
    zoom: 10
  }

  checkNextMissionenStations() {

  }


  loadAnnotations() {

    let annotations = []
    return annotations
  }

  async componentDidMount() {

    try {
      let annotations = this.loadAnnotations()
      console.log(this.props.google)
      this.setState({ trainstations: annotations })
    } catch (error) {

    }
  }

  autoCenterMap = ({ google }, map) => {
    this.loadGeoJson(map);
  }

  loadGeoJson = async (map) => {
    const geojsonRoutes = await this.getRoutes(jsonData);
    const geojsonEnvelope = await this.getEnvelope(jsonData)
    map.data.addGeoJson(geojsonEnvelope);
    map.data.addGeoJson(geojsonRoutes); // # load geojson layer
  }


  render() {

    // console.log(JSON.stringify(this.state.trainstations))

    const Map = withGoogleMap(props =>
      <GoogleMap
        id='data-example'
        zoom={5}
        center={center}
        onClick={onClick}
        onLoad={onMapLoad}
        bootstrapURLKeys={{ key: "AIzaSyAO1DtQG5J5nyIHL7UCT3SGWelDNzGgESE" }}
        defaultCenter={center}
        defaultZoom={11}
      >
        <Data
          onLoad={onDataLoad}
          options={dataOptions}
        />
      </GoogleMap>
    )

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>

        <Map />


        {/* <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAO1DtQG5J5nyIHL7UCT3SGWelDNzGgESE" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {
            this.state.trainstations.map((st, index) => {
              return <Annotation
                key={index}
                lat={st.lat}
                lng={st.lon}
                text={st.id}
              />
            })
          }
        </GoogleMapReact> */}
      </div>
    );
  }
}


class App extends React.Component {

  render() {

    return (
      <div className="App" style={{ display: "flex" }}>
        <div className="AppColumn" >

        </div>
        <div className="AppColumn" >
          <SimpleMap />

        </div>
        <div className="AppColumn" >

        </div>
      </div>
    )
  }

}

export default App
