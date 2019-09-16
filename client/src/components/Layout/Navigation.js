import React from "react";
import { Layout, Menu, Icon, Avatar, Modal } from "antd";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { logoutCurrentUser } from "../../actions/authActions";
import {
  getCurrentProfile,
  clearCurrentProfile
} from "../../actions/profileActions";
import { connect } from "react-redux";

const { Sider } = Layout;

class Navigation extends React.Component {
  state = {
    collapsed: false,
    visible: false,
    confirmLoading: false,
    width: 100,
    height: 50,
    modalText: "Are you sure you wish to log out of the system?"
  };

  onLogoutClick = () => {
    this.props.clearCurrentProfile();
  };

  usernameDashLink = () => {
    this.props.history.push("/dashboard");
  };

  usernameProfileLink = () => {
    this.props.history.push("/edit-profile");
  };
  usernameRacesLink = () => {
    this.props.history.push("/my-races");
  };
  usernameSearchLink = () => {
    this.props.history.push("/swimmer-search");
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  usernameOk = () => {
    this.setState({
      confirmLoading: true,
      modalText: "You are now being logged out."
    });

    this.props.logoutCurrentUser();
    this.props.clearCurrentProfile();

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
    const { visible, confirmLoading, modalText } = this.state;
    const { user } = this.props.auth;

    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        style={{ background: "#fff" }}
      >
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          <Avatar
            size={64}
            icon="user"
            style={{ marginTop: "25px", marginLeft: "calc(50% - 32px)" }}
          />
          <Menu.Item key="1" onClick={this.toggle}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "double-right" : "double-left"}
            />
            <span>{this.state.collapsed ? "Open Nav" : "Collapse Nav"}</span>
          </Menu.Item>
          <Menu.Divider style={{ marginTop: "50px" }} />
          <Menu.Item key="2" onClick={this.usernameDashLink}>
            <Icon type="dashboard" />
            <span>Dashboard</span>
          </Menu.Item>
          <Menu.Item key="3" onClick={this.usernameProfileLink}>
            <Icon type="user" />
            <span>My Profile</span>
          </Menu.Item>
          <Menu.Item key="4" onClick={this.usernameRacesLink}>
            <Icon type="bar-chart" />
            <span>My Races</span>
          </Menu.Item>
          <Menu.Item key="5" onClick={this.usernameSearchLink}>
            <Icon type="search" />
            <span>Swimmer Search</span>
          </Menu.Item>
          <Menu.Divider />
        </Menu>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="navigation-logout"
          style={{ position: "absolute", bottom: "0" }}
        >
          <Menu.Divider />
          <Menu.Item key="6" onClick={this.showModal}>
            <Icon type="logout" />
            <span>Log Out</span>
          </Menu.Item>

          <Modal
            visible={visible}
            title="Log Out"
            onOk={this.usernameOk}
            confirmLoading={confirmLoading}
            onCancel={this.usernameCancel}
            okText="Log Out"
            cancelText="Cancel"
          >
            <p>{modalText}</p>
          </Modal>
        </Menu>
      </Sider>
    );
  }
}

Navigation.propTypes = {
  logoutUser: PropTypes.func,
  getCurrentProfile: PropTypes.func,
  clearCurrentProfile: PropTypes.func,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, clearCurrentProfile, logoutCurrentUser }
)(withRouter(Navigation));
