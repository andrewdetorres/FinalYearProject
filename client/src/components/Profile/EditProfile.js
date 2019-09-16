import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputGroup from "../Common/InputGroup";
import ListInputGroup from "../Common/ListInputGroup";
import {
  createProfile,
  getCurrentProfile,
  deleteUserAccount
} from "../../actions/profileActions";
import { withRouter, Link } from "react-router-dom";
import _ from "lodash";
import { Button, Row, Col, Icon, Modal, Radio } from "antd";

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
      visible: false,
      confirmLoading: false,
      modalText:
        "This will permently delete your account, this can not be undone. Are you sure you wish to continue?",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
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

    if (nextProps.profile.profile) {
      const currentProfile = nextProps.profile.profile;

      currentProfile.age = !_.isEmpty(currentProfile.age)
        ? currentProfile.age
        : "";
      currentProfile.contactNumber = !_.isEmpty(currentProfile.contactNumber)
        ? currentProfile.contactNumber
        : "";
      currentProfile.streetAddress = !_.isEmpty(currentProfile.streetAddress)
        ? currentProfile.streetAddress
        : "";
      currentProfile.postcode = !_.isEmpty(currentProfile.postcode)
        ? currentProfile.postcode
        : "";
      currentProfile.city = !_.isEmpty(currentProfile.city)
        ? currentProfile.city
        : "";
      currentProfile.GDPR = !_.isEmpty(currentProfile.GDPR)
        ? currentProfile.GDPR
        : false;

      this.setState({
        username: currentProfile.username,
        dateOfBirth: currentProfile.dateOfBirth,
        age: currentProfile.age,
        gender: currentProfile.gender,
        contactNumber: currentProfile.contactNumber,
        streetAddress: currentProfile.streetAddress,
        postcode: currentProfile.postcode,
        city: currentProfile.city,
        GDPR: currentProfile.GDPR
      });
    }
  }

  onDeleteProfile = event => {
    this.setState({
      visible: true
    });
  };

  usernameOk = () => {
    this.setState({
      confirmLoading: true,
      modalText: "You are now being logged out."
    });

    this.props.deleteUserAccount();

    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
      this.props.history.push("/");
    }, 2000);
  };

  usernameCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };

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
        <Row type="flex" justify="left" style={{ margin: "10px 0px 25px 0px" }}>
          <Col>
            <Link to="/dashboard">
              <Button>
                <Icon type="arrow-left" />
                Dashboard
              </Button>
            </Link>
          </Col>
        </Row>

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
              <div style={{ marginTop: "50px" }} />
              <Button onClick={this.onDeleteProfile}>
                <Icon type="delete" /> Delete Account
              </Button>

              {/* Modal for account deletion */}
              <Modal
                visible={this.state.visible}
                title="Delete Account"
                onOk={this.usernameOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.usernameCancel}
                okText="Delete Account"
                cancelText="Cancel"
              >
                <p>{this.state.modalText}</p>
              </Modal>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteUserAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile, deleteUserAccount }
)(withRouter(CreateProfile));
