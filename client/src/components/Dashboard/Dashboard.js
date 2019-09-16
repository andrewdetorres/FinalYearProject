import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";
import { Icon, Empty, Button, Collapse } from "antd";
import { Link } from "react-router-dom";
import Injury from "./Injury";
import BPM from "./BPM";
import BloodPressure from "./BloodPressure";
import StatsGeneralData from "../GeneralData/StatsGeneralData";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let displayDashboard;

    if (profile == null || loading) {
      displayDashboard = <Icon type="loading" />;
    } else {
      //Check if logged in user has profile
      if (Object.keys(profile).length > 0) {
        displayDashboard = (
          <div>
            <h3>
              {" "}
              Hey{" "}
              <Link to={`/profile/${profile.username}`}>
                <span style={{ textTransform: "capitalize" }}>
                  {" "}
                  {user.name}{" "}
                </span>
              </Link>
              , Welcome to the prototype system!
            </h3>
            <div style={{ marginTop: "50px" }} />
            <StatsGeneralData
              injuries={profile.injuries}
              bpm={profile.BPM}
              bloodPressure={profile.bloodPressure}
            />
            <div style={{ marginTop: "50px" }} />
            <Collapse>
              <Collapse.Panel header="Injuries Table" key="1">
                <Injury injuries={profile.injuries} />
              </Collapse.Panel>
              <Collapse.Panel header="BPM Reading" key="2">
                <BPM bpm={profile.BPM} />
              </Collapse.Panel>
              <Collapse.Panel header="Blood Pressure Readings" key="3">
                <BloodPressure bloodPressure={profile.bloodPressure} />
              </Collapse.Panel>
            </Collapse>
          </div>
        );
      } else {
        displayDashboard = (
          <Empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            description={
              <span>
                Hey{" "}
                <span style={{ textTransform: "capitalize" }}>
                  {user.name},{" "}
                </span>
                your profile is empty?
              </span>
            }
          >
            <Link to="/create-profile">
              <Button type="primary">Create one now!</Button>
            </Link>
          </Empty>
        );
      }
    }

    return (
      <div>
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <div className="col-md-12 m-auto ">{displayDashboard}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
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
)(Dashboard);
