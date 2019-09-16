import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Table } from "antd";
import Moment from "react-moment";

class RaceTable extends Component {
  render() {
    const tableColumns = [
      {
        title: "Event",
        dataIndex: "event"
      },
      {
        title: "Distance",
        dataIndex: "distance"
      },
      {
        title: "Time",
        dataIndex: "lapTime",
        sorter: (a, b) => a.returnIn - b.returnIn
      },
      {
        title: "Date of race",
        dataIndex: "eventDate",
        render: text => <Moment format="DD/MM/YYYY">{text}</Moment>
      },
      {
        title: "View Information",
        dataIndex: "info",
        render: text => <Link to={`/race/${text}`}>View</Link>
      }
    ];

    const data = [];

    if (this.props.fiftyRaces) {
      this.props.fiftyRaces.forEach(race => {
        data.push({
          key: `${race._id}`,
          distance: "50m",
          event: `${race.eventType}`,
          eventDate: `${race.eventDate}`,
          lapTime: `${race.lapTime}`,
          info: `${race._id}`
        });
      });
    }

    if (this.props.hundredRaces) {
      this.props.hundredRaces.forEach(race => {
        data.push({
          key: `${race._id}`,
          distance: "100m",
          event: `${race.eventType}`,
          eventDate: `${race.eventDate}`,
          lapTime: `${race.lapTime}`,
          info: `${race._id}`
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

RaceTable.propTypes = {
  getCurrentProfile: PropTypes.func
};

export default connect(null)(withRouter(RaceTable));
