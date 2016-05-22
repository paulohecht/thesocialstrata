import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import { Buildings } from '../../api/buildings.js';

import Modal from '../Modal.jsx'

class FindMyBuildingButton extends Component {

  handleClick(event) {
    Meteor.call("buildings.set", this.props.building._id, (err) => {
      if (err) {
        Modal.alert("An error ocurred, please try agan.");
        console.log(err);
        return;
      }
      else {
        browserHistory.push('/');
      }
    });
  }

  render() {
    return (
      <a href="#" className="collection-item" onClick={this.handleClick.bind(this)}>{this.props.building.name}</a>
    )
  }
}
class FindMyBuilding extends Component {

  render() {
    if (!this.props.buildingsReady) {
      return (<p className="center-align"> Loading... </p>);
    }
    if (this.props.buildings.length == 0) {
      return (<p className="center-align"> Empty... </p>);
    }
    return (
      <div className="row">
        <div className="col s12 center-align">
          These are the buildings in this zip code. Hope one of them is yours.
        </div>
        <div className="col s12 center-align">
          <div className="collection">
            {this.props.buildings.map((building, i) =>
              <FindMyBuildingButton building={building} />
            )}
          </div>
        </div>
        <div className="col s12 center-align text-gray">
          Can't find your building? Please contact your landlord (the old way) and ask him to add your building to The Social Strata.
        </div>
      </div>
    );
  }
}

export default FindMyBuildingContainer = createContainer(( { params, location } ) => {

  let buildingsHandler = Meteor.subscribe("buildings.byZip", params.zip);
  return {
    user: Meteor.user(),
    buildings: Buildings.find({zip: params.zip}).fetch(),
    buildingsReady: buildingsHandler.ready(),
  };
}, FindMyBuilding);
