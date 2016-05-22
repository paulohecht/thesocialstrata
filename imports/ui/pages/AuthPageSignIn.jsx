import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import Modal from '../Modal.jsx'

class AuthPageSignIn extends Component {

  componentWillMount() {
    if (this.props.user) {
      browserHistory.push('/');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user) {
      browserHistory.push('/');
    }
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
        //Redirect...
      }
    });
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
            <div className="input-field col s12">
              <input ref="inputEmail" id="email" type="email" className="validate" />
              <label for="email">Email</label>
            </div>
            <div className="input-field col s12">
              <input ref="inputPassword" id="password" type="password" className="validate" />
              <label for="password">Password</label>
            </div>
            <button className="btn btn-block waves-effect waves-light col s12" type="submit" name="action">
              Sign me in!
            </button>
          </div>
        </form>
        <Link to="/signup" className="waves-effect btn-flat col s12  center-align">Still don't have an account? Sign Up.</Link>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, AuthPageSignIn);
