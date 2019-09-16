import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getRaceData } from "../../actions/profileActions";
import RaceAnalysisTable from "./RaceAnalysisTable";
import { Icon, Row, Col, Button } from "antd";

class RaceAnalysis extends Component {
  componentDidMount() {
    if (this.props.profile.profile == null) {
      if (this.props.auth.user.isAdmin) {
        this.props.history.push("/swimmer-search");
      } else {
        this.props.history.push("/my-races");
      }
    } else {
      if (
        this.props.auth.user.isAdmin ||
        this.props.auth.user.id === this.props.profile.profile.user._id
      ) {
        console.log("This was true");
        console.log(this.props.match.params.race_id);
        return;
      } else {
        console.log("This was false");
        console.log(this.props.match.params.race_id);
      }
    }
  }

  render() {
    const { profile, loading } = this.props.profile;

    let displayRaceData;
    if (profile == null || loading) {
      displayRaceData = <Icon type="loading" />;
    } else {
      displayRaceData = (
        <div>
          <Row
            type="flex"
            justify="left"
            style={{ margin: "10px 0px 25px 0px" }}
          >
            <Col>
              <Link to={`/swimmer/${profile.username}`}>
                <Button>
                  <Icon type="arrow-left" />
                  Swimmers Table
                </Button>
              </Link>
            </Col>
          </Row>
          <h1>Race Data</h1>
          <RaceAnalysisTable
            fifty={profile.fiftyMetre}
            hundred={profile.hundredMetre}
            race_id={this.props.match.params.race_id}
          />
        </div>
      );
    }
    return <div>{displayRaceData}</div>;
  }
}

RaceAnalysis.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getRaceData: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getRaceData }
)(withRouter(RaceAnalysis));
