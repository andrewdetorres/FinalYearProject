import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputGroup from "../Common/InputGroup";
import { Link, withRouter } from "react-router-dom";
import { newBPM } from "../../actions/profileActions";

import { Button, Row, Col, Icon, Radio } from "antd";

class NewBPM extends Component {
  constructor(props) {
    super(props);

    this.state = {
      BPMReading: "",
      BPMDate: "",
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

    const BPMData = {
      BPMReading: this.state.BPMReading,
      BPMDate: this.state.BPMDate,
      current: this.state.current
    };

    this.props.newBPM(
      BPMData,
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
            <h1 className="display-4 text-center">Add new BPM reading</h1>
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
                name="BPMReading"
                palceholder="BPM reading (e.g 65)"
                value={this.state.BPMReading}
                onChange={this.onChange}
                error={errors.BPMReading}
                type="number"
              />
              <InputGroup
                name="BPMDate"
                palceholder="Date of reading"
                value={this.state.BPMDate}
                onChange={this.onChange}
                error={errors.BPMDate}
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

NewBPM.propTypes = {
  newBPM: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { newBPM }
)(withRouter(NewBPM));
