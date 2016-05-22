import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import Modal from '../Modal.jsx'

class CreateCommonArea extends Component {

  componentDidMount() {
    $('select#inputType').material_select();
  }

  componentDidUpdate() {
    $('select').material_select();
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = ReactDOM.findDOMNode(this.refs.inputName).value.trim();
    if (_.isEmpty(name)) {
      Modal.alert("The common area need a name, use your creativity.", () => {
        ReactDOM.findDOMNode(this.refs.inputName).focus();
      });
      return false;
    }
    this.setState({loading: true});
    Meteor.call("commonareas.create", name, (err) => {
      if (err) {
        Modal.alert("An error ocurred, please try agan.");
        console.log(err);
        return;
      }
      else {
        browserHistory.push('/commonarea');
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
              <input type="text" ref="inputName" id="inputName"></input>
              <label for="inputName">Common Area Name</label>
            </div>
          </div>
          <div className="row">
            <button className="btn btn-block waves-effect waves-light col s12" type="submit" name="action">
              Make this Common Area Available To Tenants
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateCommonAreaContainer = createContainer(( { params, location } ) => {
  return {
    user: Meteor.user(),
  };
}, CreateCommonArea);
