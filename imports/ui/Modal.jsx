import React, { Component } from 'react';

class Modal extends Component {

  static alert(message, callback) {
    $('#modal h4').text("");
    $('#modal p').text(message);
    $('#modal #modal-ok-button').show();
    $('#modal #modal-confirm-button').hide();
    $('#modal #modal-cancel-button').hide();
    $('#modal').openModal();
    Modal.okCallback = callback;
    return false;
  }

  static confirm(message, callback) {
    $('#modal h4').text("");
    $('#modal p').text(message);
    $('#modal #modal-ok-button').hide();
    $('#modal #modal-confirm-button').show();
    $('#modal #modal-cancel-button').show();
    $('#modal').openModal();
    Modal.okCallback = callback;
    return false;
  }

  handleOk(event) {
    event.preventDefault();
    if (Modal.okCallback) {
      Modal.okCallback();
      Modal.okCallback = null;
    }
  }

  render() {
    return (
      <div id="modal" className="modal">
        <div className="modal-content">
          <h4></h4>
          <p></p>
        </div>
        <div className="modal-footer">
          <a href="#!" id="modal-ok-button" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.handleOk.bind(this)}>OK</a>
          <a href="#!" id="modal-confirm-button" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.handleOk.bind(this)}>Confirm</a>
          <a href="#!" id="modal-cancel-button" className="modal-action modal-close waves-effect btn-flat">Cancel</a>
        </div>
      </div>
    );
  }
}

Modal.okCallback = null;

export default Modal;
