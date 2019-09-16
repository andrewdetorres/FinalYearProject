import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table } from "antd";
import Moment from "react-moment";
import { deleteBloodPressure } from "../../actions/profileActions";

class AdminBloodPressure extends Component {
  onDeleteClick(bloodpressure_id) {
    this.props.deleteBloodPressure(bloodpressure_id.text);
  }
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
      },
      {
        title: "Delete Blood Pressure",
        dataIndex: "delete",
        render: text => (
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick.bind(this, { text })}
          >
            Delete
          </button>
        )
      }
    ];

    const data = [];

    if (this.props.bloodPressure) {
      this.props.bloodPressure.forEach(bloodPressure => {
        data.push({
          key: `${bloodPressure._id}`,
          bloodPressureReading: `${bloodPressure.bloodPressureReading}`,
          bloodPressureDate: `${bloodPressure.bloodPressureDate}`,
          current: `${bloodPressure.current}`,
          delete: `${bloodPressure._id}`
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

AdminBloodPressure.propTypes = {
  getCurrentProfile: PropTypes.func,
  deleteBloodPressure: PropTypes.func
};

export default connect(
  null,
  { deleteBloodPressure }
)(AdminBloodPressure);
