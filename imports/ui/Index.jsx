import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '../api/posts.js';
import { Buildings } from '../api/buildings.js';

import Post from './Post.jsx';
import Navbar from './Navbar.jsx';
import Modal from './Modal.jsx';

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentWillMount() {
    if (!this.props.user) {
      return browserHistory.push('/signin');
    }
    if (!this.props.user.buildingId) {
      return browserHistory.push('/getabuilding');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.user) {
      return browserHistory.push('/signin');
    }
    if (!this.props.user.buildingId) {
      return browserHistory.push('/getabuilding');
    }
  }

  render() {
    return (
      <div className="row">

        <div className="container">
          <div className="row">
            <div className="col s12 center-align">
              News feed yet to be implemented, please check the other cool stuff meanwhile...
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
    building: Buildings.findOne((Meteor.user() || {}).buildingId),
  };
}, Index);
