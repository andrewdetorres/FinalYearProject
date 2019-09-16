import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Collapse, Icon, Col, Button, Row } from "antd";
import AdminInjury from "./AdminInjury";
import AdminBPM from "./AdminBPM";
import AdminBloodPressure from "./AdminBloodPressure";
import StatsGeneralData from "../GeneralData/StatsGeneralData";
import ActionsForProfile from "../Dashboard/ActionsForProfile";
import RaceTable from "../Races/RaceTable";

import {
  getProfileByUsername,
  getCurrentProfile
} from "../../actions/profileActions";

class IndividualProfile extends Component {
  componentDidMount() {
    if (!this.props.auth.user.isAdmin) {
      this.props.history.push("/");
    }

    if (this.props.match.params.username) {
      console.log(this.props.match.params.username);
      this.props.getProfileByUsername(this.props.match.params.username);
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    var displaySwimmerProfile;

    if (profile == null || loading) {
      displaySwimmerProfile = <Icon type="loading" />;
    } else {
      displaySwimmerProfile = (
        <div>
          <Row style={{ margin: "10px 0px 25px 0px" }}>
            <Col>
              <Link to={`/swimmer-search`}>
                <Button>
                  <Icon type="arrow-left" />
                  Swimmers Table
                </Button>
              </Link>
            </Col>
          </Row>
          <h1>Profile Information {profile.user.name}</h1>
          <ActionsForProfile username={profile.username} />
          <div style={{ marginTop: "50px" }} />
          <StatsGeneralData
            injuries={profile.injuries}
            bpm={profile.BPM}
            bloodPressure={profile.bloodPressure}
          />
          <div style={{ marginTop: "50px" }} />
          <h5 style={{ margin: "15px 0px" }} />
          <Collapse>
            <Collapse.Panel header="Injuries Table" key="1">
              <AdminInjury injuries={profile.injuries} />
            </Collapse.Panel>
            <Collapse.Panel header="BPM Reading" key="2">
              <AdminBPM bpm={profile.BPM} />
            </Collapse.Panel>
            <Collapse.Panel header="Blood Pressure Readings" key="3">
              <AdminBloodPressure bloodPressure={profile.bloodPressure} />
            </Collapse.Panel>
          </Collapse>
          <div style={{ marginTop: "50px" }} />
          <RaceTable
            fiftyRaces={profile.fiftyMetre}
            hundredRaces={profile.hundredMetre}
          />
        </div>
      );
    }
    return <div>{displaySwimmerProfile}</div>;
  }
}

IndividualProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getProfileByUsername: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileByUsername, getCurrentProfile }
)(withRouter(IndividualProfile));
