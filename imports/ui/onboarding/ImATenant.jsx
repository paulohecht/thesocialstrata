import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import Modal from '../Modal.jsx'

class ImATenant extends Component {

  handleFindByGpsClick(event) {
    Modal.alert("Sorry about that, but this feature is not finished yet =(");
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loading: true});

    const zip = ReactDOM.findDOMNode(this.refs.inputZip).value.trim();
    if (_.isEmpty(zip)) {
      Modal.alert("C'mon, you should know where you live. I know you know your zip code, just fill it in...", () => {
        ReactDOM.findDOMNode(this.refs.inputZip).focus();
      });
      return false;
    }
    browserHistory.push("/findmybuilding/" + zip);
  }

  handleZipChange(event) {
    const zip = ReactDOM.findDOMNode(this.refs.inputZip).value.trim();
  }

  render() {
    return (
      <div className="row">
        <div className="col s12 center-align">
          <p className="center-align">
            All right <b>{this.props.user.profile.name}</b>, I got it. Now let's find your building community! All we need is your zip code in order to find it.
          </p>
        </div>
        <div className="row">
          <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
            <div className="row">
              <div className="input-field col s12">
                <input ref="inputZip" id="zip" type="text" className="" onChange={this.handleZipChange.bind(this)} />
                <label for="zip">Zip Code</label>
              </div>
            </div>
            <div className="row">
              <button className="btn btn-block waves-effect waves-light col s12" type="submit" name="action">
                Find my building from zip code
              </button>
            </div>
          </form>
        </div>
        <p className="center-align">
          - or -
        </p>
        <div className="row">
          <div className="col s12 center-align">
            <div className="row">
              <button className="btn btn-block waves-effect waves-light col s12" type="submit" name="action" onClick={this.handleFindByGpsClick.bind(this)}>
                Find my building from gps
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user()
  };
}, ImATenant);
