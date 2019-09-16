import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Table } from "antd";
import Moment from "react-moment";

class Injury extends Component {
  render() {
    const tableColumns = [
      {
        title: "Injury Location",
        dataIndex: "injuryLocation"
      },
      {
        title: "Description",
        dataIndex: "injuryDescription"
      },
      {
        title: "Returns in (weeks)",
        dataIndex: "returnIn",
        sorter: (a, b) => a.returnIn - b.returnIn
      },
      {
        title: "Date of injury",
        dataIndex: "injuryDate",
        render: text => <Moment format="DD/MM/YYYY">{text}</Moment>
      },
      {
        title: "Current Injury",
        dataIndex: "current"
      }
    ];

    const data = [];

    if (this.props.injuries) {
      this.props.injuries.forEach(injury => {
        data.push({
          key: `${injury._id}`,
          injuryLocation: `${injury.injuryLocation}`,
          injuryDescription: `${injury.injuryDescription}`,
          returnIn: `${injury.returnIn}`,
          injuryDate: `${injury.injuryDate}`,
          current: `${injury.current}`
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

Injury.propTypes = {
  getCurrentProfile: PropTypes.func
};

export default connect(null)(withRouter(Injury));
