import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table } from "antd";
import Moment from "react-moment";
import { deleteBPM } from "../../actions/profileActions";

class AdminBPM extends Component {
  onDeleteClick(bpm_id) {
    this.props.deleteBPM(bpm_id.text);
  }
  render() {
    const tableColumns = [
      {
        title: "BPM Reading",
        dataIndex: "BPMReading",
        sorter: (a, b) => a.BPMReading - b.BPMReading
      },
      {
        title: "Date Recorded",
        dataIndex: "BPMDate",
        render: text => <Moment format="DD/MM/YYYY">{text}</Moment>
      },
      {
        title: "Delete BPM",
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

    if (this.props.bpm) {
      this.props.bpm.forEach(bpm => {
        data.push({
          key: `${bpm._id}`,
          BPMReading: `${bpm.BPMReading}`,
          BPMDate: `${bpm.BPMDate}`,
          delete: `${bpm._id}`
        });
      });
    }

    function onChange(pagination, filters, sorter) {
      console.log("params", pagination, filters, sorter);
    }

    return (
      <div>
        <Table columns={tableColumns} dataSource={data} onChange={onChange} />
      </div>
    );
  }
}

AdminBPM.propTypes = {
  getCurrentProfile: PropTypes.func,
  deleteBPM: PropTypes.func
};

export default connect(
  null,
  { deleteBPM }
)(AdminBPM);
