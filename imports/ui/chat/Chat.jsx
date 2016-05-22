import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import { Chats } from '../../api/chats.js';

import Modal from '../Modal.jsx'

class Message extends Component {
  authorName() {
    return Meteor.users.findOne(this.props.message.fromId).profile.name;
  }
  render() {
    return (
      <li className="collection-item" >
        <p className="chatAuthor">
          {this.authorName()}
        </p>
        <p className="chatMessage">
          {this.props.message.message}
        </p>
        <p className="chatDate">
          {this.props.message.createdAt.toString()}
        </p>
      </li>
    )
  }
}
class Chat extends Component {

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loading: true});
    //Retrieve values...
    const message = ReactDOM.findDOMNode(this.refs.inputMessage).value.trim();
    if (_.isEmpty(message)) {
      Modal.alert("Hey Silent Bob! Just type in a message before pressing send...", () => {
        ReactDOM.findDOMNode(this.refs.inputMessage).focus();
      });
      return false;
    }
    Meteor.call("chat.send", this.props.toId, message, (err) => {
      if (err) {
        Modal.alert("An error ocurred, please try agan.");
        console.log(err);
        return;
      }
      else {
        ReactDOM.findDOMNode(this.refs.inputMessage).value("")
        this.setState({loading: false});
      }
    });
  }

  render() {
    if (!this.props.messagesReady) {
      return (<p className="center-align"> Loading... </p>);
    }
    //TODO: Empty State...
    return (
      <div className="">
        <div className="row">
          <div className="col s12">
            <ul className="collection">
              {this.props.messages.map((message, i) =>
                <Message message={message} />
              )}
            </ul>
          </div>
        </div>
        <div className="row footer">
          <form className="" onSubmit={this.handleSubmit.bind(this)}>
              <div className="input-field col s10">
                <input ref="inputMessage" type="text" />
              </div>
              <div className="input-field col s2">
                <button className="btn-floating waves-effect waves-light" type="submit" name="action">
                  <i className="fa fa-send-o"></i>
                </button>
              </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ChatContainer = createContainer(( { params, location } ) => {

  let messagesHandler = Meteor.subscribe("chat.messages", params.userId);
  return {
    user: Meteor.user(),
    toId: params.userId,
    messages: Chats.find({$or: [
      {fromId: params.userId, toId: Meteor.userId()},
      {fromId: Meteor.userId(), toId: params.userId},
    ]}).fetch(),
    messagesReady: messagesHandler.ready(),
  };
}, Chat);
