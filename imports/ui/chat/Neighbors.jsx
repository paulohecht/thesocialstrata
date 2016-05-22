import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

// import { Neighbors } from '../../api/neighbors.js';

import Modal from '../Modal.jsx'

class NeighborsButton extends Component {

  handleClick(event) {
    browserHistory.push('/chat/' + this.props.neighbor._id);
  }

  render() {
    return (
      <a href="#" className="collection-item" onClick={this.handleClick.bind(this)}>{this.props.neighbor.profile.name}</a>
    )
  }
}
class NeighborsList extends Component {

  render() {
    if (!this.props.neighborsReady) {
      return (<p className="center-align"> Loading... </p>);
    }
    if (this.props.neighbors.length == 0) {
      return (<p className="center-align"> Empty... </p>);
    }
    return (
      <div className="row">
        <div className="col s12 center-align">
          <div className="collection">
            {this.props.neighbors.map((neighbor, i) =>
              <NeighborsButton neighbor={neighbor} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default NeighborsListContainer = createContainer(( { params, location } ) => {

  let neighborsHandler = Meteor.subscribe("chat.neighbors");
  return {
    user: Meteor.user(),
    neighbors: Meteor.users.find({$and: [
      {buildingId: Meteor.user().buildingId},
      {_id: {$ne: Meteor.userId()}}
    ]}).fetch(),
    neighborsReady: neighborsHandler.ready(),
  };
}, NeighborsList);
