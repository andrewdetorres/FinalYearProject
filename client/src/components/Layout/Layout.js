import React, { Component } from "react";
import { Layout } from "antd";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";

import Navigation from "./Navigation";
import Dashboard from "../Dashboard/Dashboard";

class MainDashboard extends Component {
  render() {
    const { Footer, Content } = Layout;

    return (
      <Layout style={{ height: "100vh" }}>
        <Navigation />
        <Layout>
          <Content
            style={{
              padding: "0 16px"
            }}
          >
            <Dashboard />
            <Footer style={{ textAlign: "center" }}>
              Prototype system {new Date().getFullYear} - Created by Andrew De
              Torres
            </Footer>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default connect(
  null,
  { getCurrentProfile }
)(MainDashboard);
