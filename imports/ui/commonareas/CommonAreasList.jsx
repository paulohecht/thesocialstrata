import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import { Buildings } from '../../api/buildings.js';
import { CommonAreas } from '../../api/commonareas.js';

import Modal from '../Modal.jsx'

class CommonAreaButton extends Component {
  render() {
    return (
      <Link to={"/commonareadetails/" + this.props.commonarea._id} className="collection-item">{this.props.commonarea.name}</Link>
    )
  }
}
class CommonAreaRequestList extends Component {

  renderFAB() {
    if (this.props.landlord) {
      return (
        <div className="fixed-action-btn" style={{bottom: 45+'px', right: 24+'px'}}>
          <Link to="/createcommonarea" className="btn-floating btn-large">
            <i className="fa fa-plus"></i>
          </Link>
        </div>
      )
    }
  }

  render() {
    if (!this.props.commonareasReady) {
      return (<p className="center-align"> Loading... </p>);
    }
    // if (this.props.commonareas.length == 0) {
    //   return (<p className="center-align"> Empty... </p>);
    // }
    return (
      <div>
        <div className="row">
          <div className="col s12 center-align">
            <div className="collection">
              {this.props.commonareas.map((commonarea, i) =>
                <CommonAreaButton commonarea={commonarea} />
              )}
            </div>
          </div>
        </div>
        {this.renderFAB()}
      </div>
    );
  }
}

export default CommonAreaRequestListContainer = createContainer(( { params, location } ) => {
  let commonareasHandler = Meteor.subscribe("commonareas");
  let user = Meteor.user();
  let building = Buildings.findOne((user || {}).buildingId);
  let landlord = user && building && building.landlordId == user._id;
  return {
    user: user,
    building: building,
    landlord: landlord,
    commonareas: CommonAreas.find({buildingId: building._id}).fetch(),
    commonareasReady: commonareasHandler.ready(),
  };
}, CommonAreaRequestList);
