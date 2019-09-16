import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      active: false,
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  toggleClass = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
  };

  alreadyAUser = () => {
    this.props.history.push("/");
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
    if (this.errors) {
      this.toggleClass();
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="signup_container">
        <div className="container__child signup__thumbnail">
          <div className="logo" />
        </div>
        <div className="container__child signup_form">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <div className="text-left">
                <label className="field-empty">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    className={errors.name ? "invalidInput" : ""}
                  />
                </label>
                {errors.name && (
                  <div className="invalidFeedback">{errors.name}</div>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="text-left">
                <label className="field-empty">
                  <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    className={errors.email ? "invalidInput" : ""}
                  />
                </label>
                {errors.email && (
                  <div className="invalidFeedback">{errors.email}</div>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="text-left">
                <label className="field-empty">
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    className={errors.password ? "invalidInput" : ""}
                  />
                </label>
                {errors.password && (
                  <div className="invalidFeedback">{errors.password}</div>
                )}
              </div>
            </div>
            <div className="form-group">
              <div className="text-left">
                <label className="field-empty">
                  <input
                    type="password"
                    placeholder="Repeat Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                    className={errors.password2 ? "invalidInput" : ""}
                  />
                </label>
                {errors.password2 && (
                  <div className="invalidFeedback">{errors.password2}</div>
                )}
              </div>
            </div>
            <div className="m-t-lg">
              <ul className="list-inline">
                <li>
                  <button
                    type="submit"
                    className="btn btn-water-custom btn-block"
                    name="registerSubmit"
                  >
                    Register
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    onClick={this.alreadyAUser}
                  >
                    Already a member? Sign in Here!
                  </button>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
