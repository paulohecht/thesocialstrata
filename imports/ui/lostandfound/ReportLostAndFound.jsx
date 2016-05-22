import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import { LostAndFounds } from '../../api/lostandfounds.js';

import Modal from '../Modal.jsx'

class ReportLostAndFound extends Component {

  componentDidMount() {
    $('select#inputType').material_select();
  }

  componentDidUpdate() {
    $('select').material_select();
  }

  handleSubmit(event) {
    event.preventDefault();

    const type = ReactDOM.findDOMNode(this.refs.inputType).value.trim();
    if (_.isEmpty(type)) {
      Modal.alert("Have you lost or found something? Please, say it...!", () => {
        ReactDOM.findDOMNode(this.refs.inputType).focus();
      });
      return false;
    }

    const text = ReactDOM.findDOMNode(this.refs.inputText).value.trim();
    if (_.isEmpty(text)) {
      Modal.alert("Don't be shy, describe what is it...", () => {
        ReactDOM.findDOMNode(this.refs.inputText).focus();
      });
      return false;
    }
    this.setState({loading: true});
    Meteor.call("lostandfounds.report", type, text, (err) => {
      if (err) {
        Modal.alert("An error ocurred, please try agan.");
        console.log(err);
        return;
      }
      else {
        browserHistory.push('/lostandfound');
      }
      this.setState({loading: false});
    });
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
            <div class="col s12">
              <label for="inputType">Lost or found?</label>
              <select id="inputType" ref="inputType" >
                <option value="" disabled selected>Choose your option</option>
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>
            </div>
            <div className="input-field col s12">
              <textarea ref="inputText" id="inputText" className="materialize-textarea"></textarea>
              <label for="inputText">What is it?</label>
            </div>
          </div>
          <div className="row">
            <button className="btn btn-block waves-effect waves-light col s12" type="submit" name="action">
              Let them know it
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ReportLostAndFoundContainer = createContainer(( { params, location } ) => {
  return {
    user: Meteor.user(),
  };
}, ReportLostAndFound);
