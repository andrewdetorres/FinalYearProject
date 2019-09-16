import React, { Component } from "react";
import { Row, Col, Button, Icon } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputGroup from "../Common/InputGroup";
import ListInputGroup from "../Common/ListInputGroup";
import { Link, withRouter } from "react-router-dom";
import { newFiftyMetre } from "../../actions/profileActions";
import Math from "mathjs";

class FiftyMetre extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventType: "",
      eventDate: "",
      lapTime: "",
      lapPercent: "",
      firstSplit: "",
      firstVelocity: "",
      firstSR: "",
      firstDPS: "",
      firstCount: "",
      secondSplit: "",
      secondVelocity: "",
      secondSR: "",
      secondDPS: "",
      secondCount: "",
      avgVelocity: "",
      avgSR: "",
      avgDPS: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const averageVelCal = Math.chain(this.state.firstVelocity)
      .add(this.state.secondVelocity)
      .divide(2)
      .done();

    const averageSRCal = Math.chain(this.state.firstSR)
      .add(this.state.secondSR)
      .divide(2)
      .done();

    const averageDPSCal = Math.chain(this.state.firstDPS)
      .add(this.state.secondDPS)
      .divide(2)
      .done();

    console.log(averageVelCal);

    const fiftyData = {
      eventType: this.state.eventType,
      eventDate: this.state.eventDate,
      lapTime: this.state.lapTime,
      lapPercent: this.state.lapPercent,
      firstSplit: this.state.firstSplit,
      firstVelocity: this.state.firstVelocity,
      firstSR: this.state.firstSR,
      firstDPS: this.state.firstDPS,
      firstCount: this.state.firstCount,
      secondSplit: this.state.secondSplit,
      secondVelocity: this.state.secondVelocity,
      secondSR: this.state.secondSR,
      secondDPS: this.state.secondDPS,
      secondCount: this.state.secondCount,
      avgVelocity: averageVelCal,
      avgSR: averageSRCal,
      avgDPS: averageDPSCal
    };

    this.props.newFiftyMetre(
      fiftyData,
      this.props.match.params.username,
      this.props.history
    );
  };

  onChange = event => {
    console.log(event.target.value);

    if (event.target.name === "firstVelocity") {
      this.setState({
        avgVelocity: Math.chain(event.target.value)
          .add(this.state.secondVelocity)
          .divide(2)
          .done()
      });
    }
    if (event.target.name === "secondVelocity") {
      this.setState({
        avgVelocity: Math.chain(event.target.value)
          .add(this.state.firstVelocity)
          .divide(2)
          .done()
      });
    }
    if (event.target.name === "firstSR") {
      this.setState({
        avgSR: Math.chain(event.target.value)
          .add(this.state.secondSR)
          .divide(2)
          .done()
      });
    }
    if (event.target.name === "secondSR") {
      this.setState({
        avgSR: Math.chain(event.target.value)
          .add(this.state.firstSR)
          .divide(2)
          .done()
      });
    }
    if (event.target.name === "firstDPS") {
      this.setState({
        avgDPS: Math.chain(event.target.value)
          .add(this.state.secondDPS)
          .divide(2)
          .done()
      });
    }
    if (event.target.name === "secondDPS") {
      this.setState({
        avgDPS: Math.chain(event.target.value)
          .add(this.state.firstDPS)
          .divide(2)
          .done()
      });
    }

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { errors } = this.state;

    const selectOptions = [
      { label: "Select Event", Value: 0 },
      { label: "Free Style", Value: "Free Style" },
      { label: "Butterfly", Value: "Butterfly" },
      { label: "Breast Stroke", Value: "Breast Stroke" },
      { label: "Back Stroke", Value: "Back Stroke" },
      { label: "IM", Value: "IM" }
    ];

    return (
      <div>
        <div style={{ marginTop: "10px" }} />
        <Row type="flex" justify="left" style={{ margin: "10px 0px 25px 0px" }}>
          <Col>
            <Link to="/my-races">
              <Button>
                <Icon type="arrow-left" />
                Back
              </Button>
            </Link>
          </Col>
        </Row>
        <h3>Race Dashboard</h3>
        <form onSubmit={this.onSubmit} noValidate>
          <Row type="flex" justify="space-around">
            <Col span={24} md={10}>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Event</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <ListInputGroup
                        name="eventType"
                        palceholder="event"
                        value={this.state.eventType}
                        onChange={this.onChange}
                        options={selectOptions}
                        error={errors.eventType}
                      />
                    </th>
                    <td>
                      <InputGroup
                        name="eventDate"
                        palceholder="Date of Event"
                        value={this.state.eventDate}
                        onChange={this.onChange}
                        error={errors.eventDate}
                        type="date"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
            <Col span={24} md={10}>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Distance</th>
                    <th scope="col">Time</th>
                    <th scope="col">percent</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">0-50m</th>
                    <td>
                      <InputGroup
                        name="lapTime"
                        palceholder="Time"
                        value={this.state.lapTime}
                        onChange={this.onChange}
                        error={errors.lapTime}
                        type="number"
                      />
                    </td>
                    <td>
                      <InputGroup
                        name="lapPercent"
                        palceholder="Percent"
                        value={this.state.lapPercent}
                        onChange={this.onChange}
                        error={errors.lapPercent}
                        type="number"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Col>
          </Row>
          <div style={{ marginTop: "50px" }} />
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Distance</th>
                <th scope="col">Split</th>
                <th scope="col">Velocity</th>
                <th scope="col">SR</th>
                <th scope="col">DPS</th>
                <th scope="col">Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">15-25m</th>
                <td>
                  <InputGroup
                    name="firstSplit"
                    palceholder="Split"
                    value={this.state.firstSplit}
                    onChange={this.onChange}
                    error={errors.firstSplit}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="firstVelocity"
                    palceholder="Velocity"
                    value={this.state.firstVelocity}
                    onChange={this.onChange}
                    error={errors.firstVelocity}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="firstSR"
                    palceholder="SR"
                    value={this.state.firstSR}
                    onChange={this.onChange}
                    error={errors.firstSR}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="firstDPS"
                    palceholder="DPS"
                    value={this.state.firstDPS}
                    onChange={this.onChange}
                    error={errors.firstDPS}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="firstCount"
                    palceholder="Count"
                    value={this.state.firstCount}
                    onChange={this.onChange}
                    error={errors.firstCount}
                    type="number"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">0-50m</th>
                <td>
                  <InputGroup
                    name="secondSplit"
                    palceholder="Split"
                    value={this.state.secondSplit}
                    onChange={this.onChange}
                    error={errors.secondSplit}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="secondVelocity"
                    palceholder="Velocity"
                    value={this.state.secondVelocity}
                    onChange={this.onChange}
                    error={errors.secondVelocity}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="secondSR"
                    palceholder="SR"
                    value={this.state.secondSR}
                    onChange={this.onChange}
                    error={errors.secondSR}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="secondDPS"
                    palceholder="DPS"
                    value={this.state.secondDPS}
                    onChange={this.onChange}
                    error={errors.secondDPS}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="secondCount"
                    palceholder="Count"
                    value={this.state.secondCount}
                    onChange={this.onChange}
                    error={errors.secondCount}
                    type="number"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Avg. Velocity</th>
                <th scope="col">Avg. SR</th>
                <th scope="col">Avg. DPS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.state.avgVelocity}</td>
                <td>{this.state.avgSR}</td>
                <td>{this.state.avgDPS}</td>
              </tr>
            </tbody>
          </table>
          <Button block htmlType="submit">
            Add new race!
          </Button>
        </form>
      </div>
    );
  }
}
FiftyMetre.propTypes = {
  newFiftyMetre: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { newFiftyMetre }
)(withRouter(FiftyMetre));
