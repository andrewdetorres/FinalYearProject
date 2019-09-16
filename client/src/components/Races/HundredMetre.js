import React, { Component } from "react";
import { Row, Col, Button, Icon } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputGroup from "../Common/InputGroup";
import ListInputGroup from "../Common/ListInputGroup";
import { Link, withRouter } from "react-router-dom";
import { newHundredMetre } from "../../actions/profileActions";
import Math from "mathjs";

class HundredMetre extends Component {
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
      thirdSplit: "",
      thirdVelocity: "",
      thirdSR: "",
      thirdDPS: "",
      thirdCount: "",
      fourthSplit: "",
      fourthVelocity: "",
      fourthSR: "",
      fourthDPS: "",
      fourthCount: "",
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
      .add(
        this.state.secondVelocity,
        this.state.thirdVelocity,
        this.state.fourthVelocity
      )
      .divide(4)
      .done();

    const averageSRCal = Math.chain(this.state.firstSR)
      .add(this.state.secondSR, this.state.thirdSR, this.state.fourthSR)
      .divide(4)
      .done();

    const averageDPSCal = Math.chain(this.state.firstDPS)
      .add(this.state.secondDPS, this.state.thirdDPS, this.state.fourthDPS)
      .divide(4)
      .done();

    console.log(averageVelCal);

    const hundredData = {
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
      thirdSplit: this.state.thirdSplit,
      thirdVelocity: this.state.thirdVelocity,
      thirdSR: this.state.thirdSR,
      thirdDPS: this.state.thirdDPS,
      thirdCount: this.state.thirdCount,
      fourthSplit: this.state.fourthSplit,
      fourthVelocity: this.state.fourthVelocity,
      fourthSR: this.state.fourthSR,
      fourthDPS: this.state.fourthDPS,
      fourthCount: this.state.fourthCount,
      avgVelocity: averageVelCal,
      avgSR: averageSRCal,
      avgDPS: averageDPSCal
    };

    this.props.newHundredMetre(
      hundredData,
      this.props.match.params.username,
      this.props.history
    );
  };

  onChange = event => {
    console.log(event.target.name + " " + event.target.value);

    if (event.target.name === "firstVelocity") {
      this.setState({
        avgVelocity: Math.chain(event.target.value)
          .add(
            this.state.secondVelocity,
            this.state.thirdVelocity,
            this.state.fourthVelocity
          )
          .divide(4)
          .done()
      });
    }
    if (event.target.name === "secondVelocity") {
      this.setState({
        avgVelocity: Math.chain(event.target.value)
          .add(
            this.state.firstVelocity,
            this.state.thirdVelocity,
            this.state.fourthVelocity
          )
          .divide(4)
          .done()
      });
    }
    if (event.target.name === "thirdVelocity") {
      this.setState({
        avgVelocity: Math.chain(event.target.value)
          .add(
            this.state.firstVelocity,
            this.state.secondVelocity,
            this.state.fourthVelocity
          )
          .divide(4)
          .done()
      });
    }
    if (event.target.name === "fourthVelocity") {
      this.setState({
        avgVelocity: Math.chain(event.target.value)
          .add(
            this.state.firstVelocity,
            this.state.thirdVelocity,
            this.state.secondVelocity
          )
          .divide(4)
          .done()
      });
    }

    if (event.target.name === "firstSR") {
      this.setState({
        avgSR: Math.chain(event.target.value)
          .add(this.state.secondSR, this.state.thirdSR, this.state.fourthSR)
          .divide(4)
          .done()
      });
    }
    if (event.target.name === "secondSR") {
      this.setState({
        avgSR: Math.chain(event.target.value)
          .add(this.state.firstSR, this.state.thirdSR, this.state.fourthSR)
          .divide(4)
          .done()
      });
    }
    if (event.target.name === "thirdSR") {
      this.setState({
        avgSR: Math.chain(event.target.value)
          .add(this.state.firstSR, this.state.secondSR, this.state.fourthSR)
          .divide(4)
          .done()
      });
    }
    if (event.target.name === "fourthSR") {
      this.setState({
        avgSR: Math.chain(event.target.value)
          .add(this.state.firstSR, this.state.thirdSR, this.state.secondSR)
          .divide(4)
          .done()
      });
    }
    if (event.target.name === "firstDPS") {
      this.setState({
        avgDPS: Math.chain(event.target.value)
          .add(this.state.secondDPS, this.state.thirdDPS, this.state.fourthDPS)
          .divide(4)
          .done()
      });
    }
    if (event.target.name === "secondDPS") {
      this.setState({
        avgDPS: Math.chain(event.target.value)
          .add(this.state.firstDPS, this.state.thirdDPS, this.state.fourthDPS)
          .divide(4)
          .done()
      });
    }
    if (event.target.name === "thirdDPS") {
      this.setState({
        avgDPS: Math.chain(event.target.value)
          .add(this.state.firstDPS, this.state.secondDPS, this.state.fourthDPS)
          .divide(4)
          .done()
      });
    }
    if (event.target.name === "fourthDPS") {
      this.setState({
        avgDPS: Math.chain(event.target.value)
          .add(this.state.firstDPS, this.state.thirdDPS, this.state.secondDPS)
          .divide(4)
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
                <th scope="row">25-50m</th>
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
              <tr>
                <th scope="row">65-75m</th>
                <td>
                  <InputGroup
                    name="thirdSplit"
                    palceholder="Split"
                    value={this.state.thirdSplit}
                    onChange={this.onChange}
                    error={errors.thirdSplit}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="thirdVelocity"
                    palceholder="Velocity"
                    value={this.state.thirdVelocity}
                    onChange={this.onChange}
                    error={errors.thirdVelocity}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="thirdSR"
                    palceholder="SR"
                    value={this.state.thirdSR}
                    onChange={this.onChange}
                    error={errors.thirdSR}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="thirdDPS"
                    palceholder="DPS"
                    value={this.state.thirdDPS}
                    onChange={this.onChange}
                    error={errors.thirdDPS}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="thirdCount"
                    palceholder="Count"
                    value={this.state.thirdCount}
                    onChange={this.onChange}
                    error={errors.thirdCount}
                    type="number"
                  />
                </td>
              </tr>
              <tr>
                <th scope="row">75-100m</th>
                <td>
                  <InputGroup
                    name="fourthSplit"
                    palceholder="Split"
                    value={this.state.fourthSplit}
                    onChange={this.onChange}
                    error={errors.fourthSplit}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="fourthVelocity"
                    palceholder="Velocity"
                    value={this.state.fourthVelocity}
                    onChange={this.onChange}
                    error={errors.fourthVelocity}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="fourthSR"
                    palceholder="SR"
                    value={this.state.fourthSR}
                    onChange={this.onChange}
                    error={errors.fourthSR}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="fourthDPS"
                    palceholder="DPS"
                    value={this.state.fourthDPS}
                    onChange={this.onChange}
                    error={errors.fourthDPS}
                    type="number"
                  />
                </td>
                <td>
                  <InputGroup
                    name="fourthCount"
                    palceholder="Count"
                    value={this.state.fourthCount}
                    onChange={this.onChange}
                    error={errors.fourthCount}
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
HundredMetre.propTypes = {
  newHundredMetre: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { newHundredMetre }
)(withRouter(HundredMetre));
