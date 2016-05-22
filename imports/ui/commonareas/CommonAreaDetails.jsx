import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';

import { CommonAreas, CommonAreasSchedules } from '../../api/commonareas.js';

import Modal from '../Modal.jsx'

class Schedule extends Component {
  authorName() {
    return Meteor.users.findOne(this.props.schedule.userId).profile.name;
  }
  render() {
    return (
      <li className="collection-item" >
        <p className="chatAuthor">
          {this.authorName()}
        </p>
        <p className="chatSchedule">
        </p>
        <p className="chatDate">
          {this.props.schedule.date}
        </p>
      </li>
    )
  }
}
class CommonAreaDetails extends Component {

  componentDidMount() {
    $('#datepicker').pickadate();
  }
  componentDidUpdate() {
    $('#datepicker').pickadate();
  }

  handleSubmit(event) {
    event.preventDefault();
    //Retrieve values...
    const date = ReactDOM.findDOMNode(this.refs.inputDate).value.trim();
    if (_.isEmpty(date)) {
      Modal.alert("Hey man, the question here is: when do you want to book it? Go on, pick a date!", () => {
        ReactDOM.findDOMNode(this.refs.inputDate).focus();
      });
      return false;
    }

    this.setState({loading: true});
    Meteor.call("commonareas.book", this.props.commonarea._id, date, (err) => {
      if (err) {
        Modal.alert("An error ocurred, please try agan.");
        console.log(err);
        return;
      }
      else {
        //ReactDOM.findDOMNode(this.refs.inputDate).value("")
        $('#datepicker').pickadate("clear");
      }
      this.setState({loading: false});
    });
  }

  render() {
    if (!this.props.commonareaReady) {
      return (<p className="center-align"> Loading... </p>);
    }
    //TODO: Empty State...
    return (
      <div className="">
        <div className="row">
          <div className="col s12">
            <h4>{this.props.commonarea.name}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <ul className="collection">
              {this.props.schedules.map((schedule, i) =>
                <Schedule schedule={schedule} />
              )}
            </ul>
          </div>
        </div>
        <div className="row footer">
          <form className="" onSubmit={this.handleSubmit.bind(this)}>
              <div className="input-field col s10">
                <input id="datepicker" className="datepicker" type="date" ref="inputDate" />
              </div>
              <div className="input-field col s2">
                <button className="btn-floating waves-effect waves-light" type="submit" name="action">
                  <i className="fa fa-calendar-plus-o"></i>
                </button>
              </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CommonAreaDetailsContainer = createContainer(( { params, location } ) => {
  let commonareaHandler = Meteor.subscribe("commonareas.details", params.commonareaId);
  return {
    user: Meteor.user(),
    commonarea: CommonAreas.findOne(params.commonareaId),
    schedules: CommonAreasSchedules.find({commonareaId: params.commonareaId}).fetch(),
    commonareaReady: commonareaHandler.ready(),
  };
}, CommonAreaDetails);
