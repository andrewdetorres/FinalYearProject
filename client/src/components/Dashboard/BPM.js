import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Table } from "antd";
import Moment from "react-moment";

class BPM extends Component {
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
      }
    ];

    const data = [];

    if (this.props.bpm) {
      this.props.bpm.forEach(bpm => {
        data.push({
          key: `${bpm._id}`,
          BPMReading: `${bpm.BPMReading}`,
          BPMDate: `${bpm.BPMDate}`
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

BPM.propTypes = {
  getCurrentProfile: PropTypes.func
};

export default connect(null)(withRouter(BPM));
