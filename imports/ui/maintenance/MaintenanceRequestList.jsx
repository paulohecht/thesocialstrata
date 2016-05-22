import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import { Buildings } from '../../api/buildings.js';
import { Maintenances } from '../../api/maintenances.js';

import Modal from '../Modal.jsx'

class MaintenanceCard extends Component {

  handleSolveClick(event) {
    Modal.confirm("Are you sure this maintenance report is solved?", () => {
      Meteor.call("maintenances.solve", this.props.maintenance._id);
    })
  }

  renderSolve() {
    if (this.props.landlord) {
      return (
        <div className="card-action">
          <a href="#" onClick={this.handleSolveClick.bind(this)}>Mark as solved</a>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card">
            <div className="card-content">
              <p>{this.props.maintenance.message}</p>
              <p>{this.props.maintenance.createdAt.toString()}</p>
            </div>
            {this.renderSolve()}
          </div>
        </div>
      </div>
    )
  }
}
class MaintenanceRequestList extends Component {

  renderFAB() {
    if (!this.props.landlord) {
      return (
        <div className="fixed-action-btn" style={{bottom: 45+'px', right: 24+'px'}}>
          <Link to="/requestmaintenance" className="btn-floating btn-large">
            <i className="fa fa-plus"></i>
          </Link>
        </div>
      )
    }
  }

  render() {
    if (!this.props.maintenancesReady) {
      return (<p className="center-align"> Loading... </p>);
    }
    // if (this.props.maintenances.length == 0) {
    //   return (<p className="center-align"> Empty... </p>);
    // }
    return (
      <div>
        <div className="row">
          <div className="col s12 center-align">
            {this.props.maintenances.map((maintenance, i) =>
              <MaintenanceCard maintenance={maintenance} landlord={this.props.landlord} />
            )}
          </div>
        </div>
        {this.renderFAB()}
      </div>
    );
  }
}

export default MaintenanceRequestListContainer = createContainer(( { params, location } ) => {
  let maintenancesHandler = Meteor.subscribe("maintenances");
  let user = Meteor.user();
  let building = Buildings.findOne((user || {}).buildingId);
  let landlord = user && building && building.landlordId == user._id;
  return {
    user: user,
    building: building,
    landlord: landlord,
    maintenances: Maintenances.find({buildingId: building._id}).fetch(),
    maintenancesReady: maintenancesHandler.ready(),
  };
}, MaintenanceRequestList);
