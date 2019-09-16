import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputGroup from "../Common/InputGroup";
import { Link, withRouter } from "react-router-dom";
import { newBloodPressure } from "../../actions/profileActions";

import { Button, Row, Col, Icon, Radio } from "antd";

class NewBloodPressure extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bloodPressureReading: "",
      bloodPressureDate: "",
      current: 1,
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

    const bloodPressureData = {
      bloodPressureReading: this.state.bloodPressureReading,
      bloodPressureDate: this.state.bloodPressureDate,
      current: this.state.current
    };

    this.props.newBloodPressure(
      bloodPressureData,
      this.props.match.params.username,
      this.props.history
    );
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onCheck = event => {
    this.setState({
      current: event.target.value
    });
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Row type="flex" justify="left" style={{ margin: "10px 0px 25px 0px" }}>
          <Col>
            <Link to="/dashboard">
              <Button>
                <Icon type="arrow-left" />
                Back
              </Button>
            </Link>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={24}>
            <h1 className="display-4 text-center">Add new blood pressure</h1>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={12}>
            <form onSubmit={this.onSubmit} noValidate>
              <Radio.Group defaultValue={this.state.current}>
                <Radio value={1}>Current reading</Radio>
                <Radio value={2}>Past reading</Radio>
              </Radio.Group>
              <InputGroup
                name="bloodPressureReading"
                palceholder="Blood pressure reading (e.g 120/80mmHg)"
                value={this.state.bloodPressureReading}
                onChange={this.onChange}
                error={errors.bloodPressureReading}
              />
              <InputGroup
                name="bloodPressureDate"
                palceholder="Date of reading"
                value={this.state.bloodPressureDate}
                onChange={this.onChange}
                error={errors.bloodPressureDate}
                type="date"
              />
              <Button block htmlType="submit">
                Add new reading
              </Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

NewBloodPressure.propTypes = {
  newBloodPressure: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { newBloodPressure }
)(withRouter(NewBloodPressure));
