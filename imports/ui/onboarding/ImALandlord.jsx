import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import Modal from '../Modal.jsx'

GoogleMap = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
  },
  componentDidMount() {
    GoogleMaps.create({
      name: this.props.name,
      element: ReactDOM.findDOMNode(this),
      options: {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 14
      }
    });
    // GoogleMaps.ready(this.props.name, function(map) {
    //   var marker = new google.maps.Marker({
    //     position: map.options.center,
    //     map: map.instance
    //   });
    // });
  },
  componentWillUnmount() {
    if (GoogleMaps.maps[this.props.name]) {
      google.maps.event.clearInstanceListeners(GoogleMaps.maps[this.props.name].instance);
      delete GoogleMaps.maps[this.props.name];
    }
  },
  render() {
    return <div className="map-container"></div>;
  }
});

class ImALandlord extends Component {

  componentDidMount() {
    GoogleMaps.load();
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = ReactDOM.findDOMNode(this.refs.inputName).value.trim();
    if (_.isEmpty(name)) {
      Modal.alert("Don't have a building name yet? It's your chance to make it up!", () => {
        ReactDOM.findDOMNode(this.refs.inputName).focus();
      });
      return false;
    }

    const zip = ReactDOM.findDOMNode(this.refs.inputZip).value.trim();
    if (_.isEmpty(zip)) {
      Modal.alert("C'mon, you can't be that bad as a landlord, I know you know your zip code, just fill it in...", () => {
        ReactDOM.findDOMNode(this.refs.inputZip).focus();
      });
      return false;
    }

    this.setState({loading: true});
    Meteor.call("buildings.create", name, zip, (err) => {
      if (err) {
        Modal.alert("An error ocurred, please try agan.");
        console.log(err);
        return;
      }
      else {
        browserHistory.push('/');
      }
      this.setState({loading: false});
    });
  }

  handleZipChange(event) {
    const zip = ReactDOM.findDOMNode(this.refs.inputZip).value.trim();
  }

  renderMap() {
    if (this.props.loaded)
      return (<GoogleMap name="mymap" />);
    return (<div>Loading map...</div>);
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 center-align">
          <p className="center-align">
            All right <b>{this.props.user.profile.name}</b>, I got it. Let's start your building community right away! All you have to do is fill a few info about it:
          </p>
        </div>

        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
            <div className="row">
              <div className="input-field col s12">
                <input ref="inputName" id="name" type="text" className="" />
                <label for="name">Building Name</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input ref="inputZip" id="zip" type="text" className="" onChange={this.handleZipChange.bind(this)} />
                <label for="zip">Zip Code</label>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <label for="name">Location</label>
                {this.renderMap()}
              </div>
            </div>
            <div className="row">
              <button className="btn btn-block waves-effect waves-light col s12" type="submit" name="action">
                And that's my building
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    loaded: GoogleMaps.loaded(),
  };
}, ImALandlord);
