import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import { LostAndFounds } from '../../api/lostandfounds.js';

import Modal from '../Modal.jsx'

class LostAndFoundCard extends Component {

  handleSolveClick(event) {
    Modal.confirm("Are you sure this report is solved?", () => {
      Meteor.call("lostandfounds.solve", this.props.lostandfound._id);
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 m6">
          <div className="card">
            <div className="card-content">
              <span className="card-title">{this.props.lostandfound.type}</span>
              <p>{this.props.lostandfound.message}</p>
              <p>{this.props.lostandfound.createdAt.toString()}</p>
            </div>
            <div className="card-action">
              <a href="#" onClick={this.handleSolveClick.bind(this)}>Mark as solved</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
class LostAndFoundList extends Component {

  render() {
    if (!this.props.lostandfoundsReady) {
      return (<p className="center-align"> Loading... </p>);
    }
    // if (this.props.lostandfounds.length == 0) {
    //   return (<p className="center-align"> Empty... </p>);
    // }
    return (
      <div>
        <div className="row">
          <div className="col s12 center-align">
            {this.props.lostandfounds.map((lostandfound, i) =>
              <LostAndFoundCard lostandfound={lostandfound} />
            )}
          </div>
        </div>
        <div className="fixed-action-btn" style={{bottom: 45+'px', right: 24+'px'}}>
          <Link to="/reportlostandfound" className="btn-floating btn-large">
            <i className="fa fa-plus"></i>
          </Link>
        </div>
      </div>
    );
  }
}

export default LostAndFoundListContainer = createContainer(( { params, location } ) => {
  let lostandfoundsHandler = Meteor.subscribe("lostandfounds");
  return {
    user: Meteor.user(),
    lostandfounds: LostAndFounds.find({buildingId: Meteor.user().buildingId}).fetch(),
    lostandfoundsReady: lostandfoundsHandler.ready(),
  };
}, LostAndFoundList);
