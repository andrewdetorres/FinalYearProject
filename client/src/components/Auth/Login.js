import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import InputGroup from "../Common/InputGroup";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("Recieved Props - next props = " + nextProps);

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

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

  notAMember = () => {
    this.props.history.push("/register");
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const returningUser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(returningUser);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="signup_container">
        <div className="container__child signup__thumbnail">
          <div className="logo" />
        </div>
        <div className="container__child signup_form">
          <form onSubmit={this.onSubmit} noValidate>
            <InputGroup
              name="email"
              palceholder="Email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <InputGroup
              name="password"
              palceholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <button type="submit" className="btn btn-water-custom btn-block">
              Log In
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-block"
              onClick={this.notAMember}
            >
              Not a member? Sign up Here!
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
