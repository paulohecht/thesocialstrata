import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import Modal from '../Modal.jsx'

class RequestMaintenance extends Component {

  componentDidMount() {
    $('select#inputType').material_select();
  }

  componentDidUpdate() {
    $('select').material_select();
  }

  handleSubmit(event) {
    event.preventDefault();
    const text = ReactDOM.findDOMNode(this.refs.inputText).value.trim();
    if (_.isEmpty(text)) {
      Modal.alert("Don't be shy, describe what has to be done...", () => {
        ReactDOM.findDOMNode(this.refs.inputText).focus();
      });
      return false;
    }
    this.setState({loading: true});
    Meteor.call("maintenances.request", text, (err) => {
      if (err) {
        Modal.alert("An error ocurred, please try agan.");
        console.log(err);
        return;
      }
      else {
        browserHistory.push('/maintenance');
      }
      this.setState({loading: false});
    });
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
            <div className="input-field col s12">
              <textarea ref="inputText" id="inputText" className="materialize-textarea"></textarea>
              <label for="inputText">What is it?</label>
            </div>
          </div>
          <div className="row">
            <button className="btn btn-block waves-effect waves-light col s12" type="submit" name="action">
              Tell the landlord about it
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default RequestMaintenanceContainer = createContainer(( { params, location } ) => {
  return {
    user: Meteor.user(),
  };
}, RequestMaintenance);
