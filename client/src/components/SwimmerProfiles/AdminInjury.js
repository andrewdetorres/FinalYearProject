import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table } from "antd";
import Moment from "react-moment";
import { deleteInjury } from "../../actions/profileActions";

class AdminInjury extends Component {
  onDeleteClick(injury_id) {
    this.props.deleteInjury(injury_id.text);
  }

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
      },
      {
        title: "Delete Injury",
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

    if (this.props.injuries) {
      this.props.injuries.forEach(injury => {
        data.push({
          key: `${injury._id}`,
          injuryLocation: `${injury.injuryLocation}`,
          injuryDescription: `${injury.injuryDescription}`,
          returnIn: `${injury.returnIn}`,
          injuryDate: `${injury.injuryDate}`,
          current: `${injury.current}`,
          delete: `${injury._id}`
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

AdminInjury.propTypes = {
  getCurrentProfile: PropTypes.func,
  deleteInjury: PropTypes.func
};

export default connect(
  null,
  { deleteInjury }
)(AdminInjury);
