import React, { Component } from "react";

class LoginPage extends Component {
  state = {};
  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div>
          <label className="form__field-label" htmlFor="username">
            Enter password:
          </label>
          <input className="form__field-input" id="password" type="password" />
        </div>
        <div className="form__submit-btn-wrapper">
          <button className="form__submit-btn" type="submit">
            Log in
          </button>
        </div>
      </form>
    );
  }

  onSubmit(evt) {
    evt.preventDefault();
    //this.props.onSubmit(this.props.data.username, this.props.data.password);
  }
}

export default LoginPage;
