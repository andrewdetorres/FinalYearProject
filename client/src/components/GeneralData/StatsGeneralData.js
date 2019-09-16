import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Row, Col, Statistic } from "antd";

class StatsGeneralData extends Component {
  render() {
    let injuryTotal = 0;
    let bpmDisplay = 99999;
    let bloodPressureDisplay = 0;

    if (this.props.injuries) {
      this.props.injuries.forEach(injury => {
        injuryTotal += 1;
      });
    }

    if (this.props.bpm) {
      this.props.bpm.forEach(bpm => {
        if (bpm.BPMReading <= bpmDisplay) {
          bpmDisplay = bpm.BPMReading;
        }
      });
    }

    if (this.props.bloodPressure) {
      this.props.bloodPressure.forEach(bloodPressure => {
        bloodPressureDisplay += 1;
      });
    }

    return (
      <Row type="flex" justify="space-around">
        <Col>
          <Statistic title="Total Injuries" value={`${injuryTotal} injuries`} />
        </Col>
        <Col>
          <Statistic
            title="BPM Latest"
            value={bpmDisplay !== 99999 ? `${bpmDisplay} bpm` : "No Reading"}
          />
        </Col>
        <Col>
          <Statistic
            title="Blood Pressure Readings"
            value={`${bloodPressureDisplay} readings`}
          />
        </Col>
      </Row>
    );
  }
}

StatsGeneralData.propTypes = {
  getCurrentProfile: PropTypes.func
};

export default connect()(withRouter(StatsGeneralData));
