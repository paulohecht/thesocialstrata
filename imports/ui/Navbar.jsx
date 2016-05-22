import React, { Component } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';

import { Buildings } from '../api/buildings.js';

class NavbarSidebarButton extends Component {

  componentDidMount() {
    $(".button-collapse").sideNav({
      closeOnClick: true
    });
  }

  render() {
    return (
      <a href="javascript:void()" data-activates="slide-out" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
    );
  }
}

class Navbar extends Component {

  handleLogoutClick() {
    Meteor.logout();
  }

  renderAuthenticatedButtons() {
    let buttons = this.renderAuthenticatedNoBuildingYetButtons();
    if (this.props.user.buildingId) {
      buttons = this.props.landlord ? this.renderAuthenticatedLandlordButtons() : this.renderAuthenticatedTenantButtons();
    }
    return (
      <div>
        <NavbarSidebarButton />
        {buttons}
      </div>
    );
  }

  renderAuthenticatedNoBuildingYetButtons() {
    return (
      <ul id="slide-out" className="side-nav">
        <li><a onClick={this.handleLogoutClick.bind(this)}>Logout</a></li>
      </ul>
    );
  }
  renderAuthenticatedLandlordButtons() {
    return (
      <ul id="slide-out" className="side-nav">
        <li><Link to="/"><i className="fa fa-newspaper-o"></i> News Feed</Link></li>
        <li><Link to="/neighbors"><i className="fa fa-binoculars"></i> Chat with Neighbors</Link></li>
        <li><Link to="/lostandfound"><i className="fa fa-comments"></i> Lost and Found</Link></li>
        <li><Link to="/maintenance"><i className="fa fa-wrench"></i> Maintenance Requests</Link></li>
        <li><Link to="/commonarea"><i className="fa fa-calendar"></i> Common Area</Link></li>
        <li><Link to="/notices"><i className="fa fa-bullhorn"></i> Notices</Link></li>
        <li><Link to="/proposals"><i className="fa fa-thumbs-o-up"></i> Proposals</Link></li>
        <li><a onClick={this.handleLogoutClick.bind(this)}><i className="fa fa-sign-out"></i> Logout</a></li>
      </ul>
    );
  }
  renderAuthenticatedTenantButtons() {
    return (
      <ul id="slide-out" className="side-nav">
      <li><Link to="/"><i className="fa fa-newspaper-o"></i> News Feed</Link></li>
      <li><Link to="/neighbors"><i className="fa fa-binoculars"></i> Chat with Neighbors</Link></li>
      <li><Link to="/lostandfound"><i className="fa fa-comments"></i> Lost and Found</Link></li>
      <li><Link to="/maintenance"><i className="fa fa-wrench"></i> Maintenance Requests</Link></li>
      <li><Link to="/commonarea"><i className="fa fa-calendar"></i> Common Area</Link></li>
      <li><Link to="/notices"><i className="fa fa-bullhorn"></i> Notices</Link></li>
      <li><Link to="/proposals"><i className="fa fa-thumbs-o-up"></i> Proposals</Link></li>
      <li><a onClick={this.handleLogoutClick.bind(this)}><i className="fa fa-sign-out"></i> Logout</a></li>
      </ul>
    );
  }

  renderUnauthenticatedButtons() {
    return (
      <div>
      </div>
    );
  }

  renderButtons() {
    if (this.props.user) {
      return this.renderAuthenticatedButtons();
    }
    else {
      return this.renderUnauthenticatedButtons();
    }
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper green">
            <a href="#" className="brand-logo">The Social Strata</a>
            {this.renderButtons()}
          </div>
        </nav>
      </div>
    );
  }
}

export default createContainer(() => {
  let user = Meteor.user();
  let building = Buildings.findOne((user || {}).buildingId);
  let landlord = user && building && building.landlordId == user._id;
  return {
    user: user,
    building: building,
    landlord: landlord,
  };
}, Navbar);
