import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Posts } from '../api/posts.js'

// Post component - represents a single todo item
class Post extends Component {
  deleteThisPost(event) {
    Posts.remove(this.props.post._id)
  }
  render() {
    return (
      <li className="news-post media">
          <div className="media-left">
            <div className="center-cropped" style={{backgroundImage: "url(" + this.props.post.image + ")"}}>
              <img className="media-object" src={this.props.post.image} alt="..."/>
            </div>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{this.props.post.title}</h4>
            <span className="description">{this.props.post.description}</span>
            <p className="text-muted text-small">
              <a href={this.props.post.url} target="_blank">
                <span className="url">{this.props.post.url}</span>
              </a>
            </p>
            <p>
              {moment(this.props.post.createdAt).fromNow()}
            </p>
          </div>
        <div className="visible-on-hover">
          <button className="delete pull-right" onClick={this.deleteThisPost.bind(this)}>
            &times;
          </button>
        </div>
      </li>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
