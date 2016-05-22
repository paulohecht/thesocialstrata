import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import { Buildings } from '../../api/buildings.js';

import Modal from '../Modal.jsx'

class GetABuilding extends Component {

  componentDidMount() {
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loading: true});
    //Retrieve values...
    const email = ReactDOM.findDOMNode(this.refs.inputEmail).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.inputPassword).value;
    //TODO: Validate
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        Modal.alert("Wrong username or password.");
        console.log(err);
        return;
      }
      else {
      }
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 center-align">
          <p>
            Hello <b>{this.props.user.profile.name}</b>, I'm glad you joined The Social Strata.
            Please, tell us what you want to do:
          </p>
        </div>
        <div className="col s12 m6">
          <div className="card">
            <div className="card-content">
              <p className="center-align">
                I'm a tenant and want to join my building community.
              </p>
            </div>
            <div className="card-action">
              <Link to="/imatenant" className="btn btn-block waves-effect waves-light col s12" type="submit" name="action">
                I'm a Tenant!
              </Link>
            </div>
          </div>
        </div>

        <div className="col s12 m6">
          <div className="card">
            <div className="card-content">
              <p className="center-align">
                I'm a landlord and want to start my building community.
              </p>
            </div>
            <div className="card-action">
              <Link to="/imalandlord" className="btn btn-block waves-effect waves-light col s12" type="submit" name="action">
                I'm a Landlord!
              </Link>
            </div>
          </div>
        </div>

        <div className="col s12 center-align">

        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, GetABuilding);
