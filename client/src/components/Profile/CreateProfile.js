import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputGroup from "../Common/InputGroup";
import ListInputGroup from "../Common/ListInputGroup";
import { createProfile } from "../../actions/profileActions";
import { withRouter } from "react-router-dom";
import { Button, Row, Col, Radio } from "antd";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      dateOfBirth: "",
      age: "",
      gender: "",
      contactNumber: "",
      streetAddress: "",
      postcode: "",
      city: "",
      GDPR: "",
      errors: {}
    };
  }

  onSubmit = event => {
    event.preventDefault();

    const profileInformation = {
      username: this.state.username,
      dateOfBirth: this.state.dateOfBirth,
      age: this.state.age,
      gender: this.state.gender,
      contactNumber: this.state.contactNumber,
      streetAddress: this.state.streetAddress,
      postcode: this.state.postcode,
      city: this.state.city,
      GDPR: this.state.GDPR
    };

    this.props.createProfile(profileInformation, this.props.history);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    const selectOptions = [
      { label: "Select Gender", Value: 0 },
      { label: "Male", Value: "Male" },
      { label: "Female", Value: "Female" },
      {
        label: "Non-binary / third gender",
        Value: "Non-binary / Third gender"
      },
      { label: "Prefer not to say", Value: "Prefer not to say" },
      { label: "Other", Value: "Other" }
    ];
    const GDPRselectOptions = [
      { label: "I do not Accept GDPR", Value: false },
      { label: "I accept GDPR", Value: true }
    ];
    return (
      <div className="creatProfile">
        <Row type="flex" justify="center">
          <Col span={24}>
            <h1 className="display-4 text-center">Edit profile</h1>
          </Col>
        </Row>

        <Row type="flex" justify="center">
          <Col span={12}>
            <form onSubmit={this.onSubmit} noValidate>
              <InputGroup
                name="username"
                palceholder="Personal Username"
                value={this.state.username}
                onChange={this.onChange}
                error={errors.username}
              />
              <InputGroup
                name="dateOfBirth"
                palceholder="Date of Birth"
                value={this.state.dateOfBirth}
                onChange={this.onChange}
                error={errors.dateOfBirth}
                type="date"
              />
              <InputGroup
                name="age"
                palceholder="Age"
                value={this.state.age}
                onChange={this.onChange}
                error={errors.age}
                type="number"
              />
              <ListInputGroup
                name="gender"
                palceholder="gender"
                value={this.state.gender}
                onChange={this.onChange}
                options={selectOptions}
                error={errors.gender}
              />
              <InputGroup
                name="contactNumber"
                palceholder="Contact Number"
                value={this.state.contactNumber}
                onChange={this.onChange}
                error={errors.passwcontactNumberord}
              />
              <InputGroup
                name="streetAddress"
                palceholder="Street Address"
                value={this.state.streetAddress}
                onChange={this.onChange}
                error={errors.streetAddress}
              />
              <InputGroup
                name="postcode"
                palceholder="Post Code"
                value={this.state.postcode}
                onChange={this.onChange}
                error={errors.postcode}
              />
              <InputGroup
                name="city"
                palceholder="City"
                value={this.state.city}
                onChange={this.onChange}
                error={errors.city}
              />
              <ListInputGroup
                name="GDPR"
                palceholder="GDPR"
                value={this.state.GDPR}
                onChange={this.onChange}
                options={GDPRselectOptions}
                error={errors.GDPR}
              />
              <Button block htmlType="submit">
                Update Profile
              </Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
