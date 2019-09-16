import React, { Component } from "react";
import { Button, Row, Col, Icon } from "antd";
import { Link } from "react-router-dom";
import RaceTable from "./RaceTable";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";

class RaceDash extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  sendToDash = () => {
    this.props.history.push("/dashboard");
  };

  render() {
    const { profile, loading } = this.props.profile;

    let displayRaceDash;
    if (profile == null || loading) {
      displayRaceDash = <Icon type="loading" />;
    } else {
      if (Object.keys(profile).length > 0) {
        displayRaceDash = (
          <RaceTable
            fiftyRaces={profile.fiftyMetre}
            hundredRaces={profile.hundredMetre}
            profileUser={profile}
          />
        );
      } else {
        this.sendToDash();
      }
    }
    return (
      <div>
        <Row type="flex" justify="left" style={{ margin: "10px 0px 25px 0px" }}>
          <Col>
            <Link to="/dashboard">
              <Button>
                <Icon type="arrow-left" />
                Dashboard
              </Button>
            </Link>
          </Col>
        </Row>
        <h3>Race Dashboard</h3>
        <div style={{ marginTop: "50px" }} />
        {displayRaceDash}
      </div>
    );
  }
}

RaceDash.propTypes = {
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
)(RaceDash);
