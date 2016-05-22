import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '../api/posts.js';

import Post from './Post.jsx';
import Navbar from './Navbar.jsx';
import Modal from './Modal.jsx';

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({loading: true});
    const url = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    const api = "https://api.urlmeta.org/?url=" + encodeURIComponent(url)
    $.get(api, (data)  => {
      if (data.result.status != "OK") {
        Modal.alert("ERROR");
        return;
      }
      Posts.insert({
        url: data.meta.url,
        title: data.meta.title,
        image: data.meta.image,
        description: data.meta.description,
        createdAt: new Date(), // current time
      });
      ReactDOM.findDOMNode(this.refs.textInput).value = '';
      this.setState({loading: false});
    });
  }

  renderPosts() {
    let filteredPosts = this.props.posts;
    return filteredPosts.map((post) => (
      <Post key={post._id} post={post} />
    ));
  }


  renderButtonLabel() {
    if (this.state.loading) {
      return (
        <i className="fa fa-spinner fa-spin fa-fw margin-bottom"></i>
      );
    }
    return "Add"
  }

  render() {
    return (
      <div>
        <Navbar />
        <br />
        {/* Views will be rendered here */}
        {this.props.children}
        <Modal />
      </div>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
};


export default createContainer(() => {
  return {
    user: Meteor.user(),
    posts: Posts.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Posts.find({ checked: { $ne: true } }).count(),
  };
}, App);
