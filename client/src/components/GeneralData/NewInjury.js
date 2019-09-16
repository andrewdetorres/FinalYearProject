import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputGroup from "../Common/InputGroup";
import { Link, withRouter } from "react-router-dom";
import { newInjury } from "../../actions/profileActions";

import { Button, Row, Col, Icon, Radio } from "antd";

class NewInjury extends Component {
  constructor(props) {
    super(props);

    this.state = {
      injuryLocation: "",
      injuryDescription: "",
      returnIn: "",
      current: 1,
      injuryDate: "",
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

    const injuryData = {
      injuryLocation: this.state.injuryLocation,
      injuryDescription: this.state.injuryDescription,
      returnIn: this.state.returnIn,
      current: this.state.current,
      injuryDate: this.state.injuryDate
    };

    this.props.newInjury(
      injuryData,
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
            <h1 className="display-4 text-center">Add new injury</h1>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col span={12}>
            <form onSubmit={this.onSubmit} noValidate>
              <Radio.Group defaultValue={this.state.current}>
                <Radio value={1}>Current Injury</Radio>
                <Radio value={0}>Past injury</Radio>
              </Radio.Group>
              <InputGroup
                name="injuryLocation"
                palceholder="Injury area"
                value={this.state.injuryLocation}
                onChange={this.onChange}
                error={errors.injuryLocation}
              />
              <InputGroup
                name="injuryDescription"
                palceholder="Injury description"
                value={this.state.injuryDescription}
                onChange={this.onChange}
                error={errors.injuryDescription}
              />
              <InputGroup
                name="returnIn"
                palceholder="Weeks until return"
                value={this.state.returnIn}
                onChange={this.onChange}
                error={errors.returnIn}
                type="number"
              />
              <InputGroup
                name="injuryDate"
                palceholder="Date of injury"
                value={this.state.injuryDate}
                onChange={this.onChange}
                error={errors.injuryDate}
                type="date"
              />
              <Button block htmlType="submit">
                Add new injury
              </Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

NewInjury.propTypes = {
  newInjury: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { newInjury }
)(withRouter(NewInjury));
