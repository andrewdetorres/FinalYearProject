import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Table } from "antd";
import Moment from "react-moment";

class BloodPressure extends Component {
  render() {
    const tableColumns = [
      {
        title: "Blood Pressure Reading",
        dataIndex: "bloodPressureReading"
      },
      {
        title: "Date Recorded",
        dataIndex: "bloodPressureDate",
        render: text => <Moment format="DD/MM/YYYY">{text}</Moment>
      },
      {
        title: "Current Reading",
        dataIndex: "current"
      }
    ];

    const data = [];

    if (this.props.bloodPressure) {
      this.props.bloodPressure.forEach(bloodPressure => {
        data.push({
          key: `${bloodPressure._id}`,
          bloodPressureReading: `${bloodPressure.bloodPressureReading}`,
          bloodPressureDate: `${bloodPressure.bloodPressureDate}`,
          current: `${bloodPressure.current}`
        });
      });
    }

    return (
      <div>
        <Table columns={tableColumns} dataSource={data} />
      </div>
    );
  }
}

BloodPressure.propTypes = {
  getCurrentProfile: PropTypes.func
};

export default connect(null)(withRouter(BloodPressure));
