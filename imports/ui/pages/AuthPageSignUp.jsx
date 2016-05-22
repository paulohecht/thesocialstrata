import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import Modal from '../Modal.jsx'

class AuthPageSignUp extends Component {

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

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

    const name = ReactDOM.findDOMNode(this.refs.inputName).value.trim();
    if (_.isEmpty(name)) {
      Modal.alert("People may know you through a name, seriosly, use it!", () => {
        ReactDOM.findDOMNode(this.refs.inputName).focus();
      });
      return false;
    }

    const email = ReactDOM.findDOMNode(this.refs.inputEmail).value.trim();
    if (_.isEmpty(email)) {
      Modal.alert("Do you expect people to knock on your door? Just make things easier by filling in an email!", () => {
        ReactDOM.findDOMNode(this.refs.inputEmail).focus();
      });
      return false;
    }
    if (!this.validateEmail(email)) {
      Modal.alert("Do you think I'm a fool? Seriously, fill in a real email!", () => {
        ReactDOM.findDOMNode(this.refs.inputEmail).focus();
      });
      return false;
    }

    const password = ReactDOM.findDOMNode(this.refs.inputPassword).value;
    if (_.isEmpty(password)) {
      Modal.alert("Empty password? That may be secure after all... but let's not take that risk... pick another one!", () => {
        ReactDOM.findDOMNode(this.refs.inputPassword).focus();
      });
      return false;
    }

    Accounts.createUser({
      email: email,
      password: password,
      profile: {name: name},
    }, (err) => {
      if (err) {
        if (err.reason = "Email already exists.") {
          Modal.alert("Someone is using this email already, try reseting your password...");
          return;
        }
        else {
          Modal.alert("Houve um erro com o seu registro");
          console.log(err);
          return;
        }
      }
      else {

      }
    });
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
            <div className="input-field col s12">
              <input ref="inputName" id="nameSignUp" type="text" className="validate" />
              <label for="nameSignUp">Your Name (The one ppl use to call you...)</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input ref="inputEmail" id="emailSignUp" type="text" className="validate" />
              <label for="emailSignUp">Email (A real one..)</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input ref="inputPassword" id="passwordSignUp" type="password" className="validate" />
              <label for="passwordSignUp">Password (One that you remember...)</label>
            </div>
          </div>
          <div className="row">
            <button className="btn btn-block waves-effect waves-light col s12" type="submit" name="action">
              Sign me up!
            </button>
          </div>
        </form>
        <Link to="/signin" className="waves-effect btn-flat col s12 center-align">Already a member? Sign In.</Link>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, AuthPageSignUp);
