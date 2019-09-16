import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSwimmerProfiles } from "../../actions/profileActions";
import { Button, Row, Col, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import SwimmerProfilesTable from "./SwimmerProfilesTable";

class SwimmerProfiles extends Component {
  componentDidMount() {
    this.props.getSwimmerProfiles();
  }

  dashRedirect = () => {
    this.props.history.push("/");
  };

  render() {
    const { profiles, loading } = this.props.profile;
    const { user } = this.props.auth;

    var displaySwimmerProfiles;
    if (!user.isAdmin) {
      displaySwimmerProfiles = <h1>You do not have access to this page.</h1>;
      this.dashRedirect();
    } else {
      if (profiles == null || loading) {
        displaySwimmerProfiles = <Icon type="loading" />;
      } else {
        if (Object.keys(this.props.profile).length > 0) {
          if (profiles.length > 0) {
            // TODO: add profile
            displaySwimmerProfiles = (
              <div>
                <SwimmerProfilesTable swimmerProfiles={profiles} />
              </div>
            );
          } else {
            // TODO: No profile
            displaySwimmerProfiles = <h1>No Profile</h1>;
          }
        } else {
          this.sendToDash();
        }
      }
    }

    return (
      <div>
        <Row style={{ margin: "10px 0px 25px 0px" }}>
          <Col>
            <Link to="/dashboard">
              <Button>
                <Icon type="arrow-left" />
                Dashboard
              </Button>
            </Link>
          </Col>
        </Row>
        <h3>Swimmer Search</h3>
        <div style={{ marginTop: "50px" }} />
        {displaySwimmerProfiles}
      </div>
    );
  }
}

SwimmerProfiles.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getSwimmerProfiles: PropTypes.func
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getSwimmerProfiles }
)(withRouter(SwimmerProfiles));
