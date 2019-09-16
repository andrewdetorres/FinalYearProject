import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";

class NotFound extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();

    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <div>
        <h1>NOT FOUND!!!!!</h1>
      </div>
    );
  }
}

NotFound.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(NotFound);
