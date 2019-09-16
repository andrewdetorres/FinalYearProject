import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Table, Row, Col, Card } from "antd";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

class RaceAnalysisTable extends Component {
  render() {
    const columnsEvent = [
      {
        title: "Event",
        dataIndex: "eventType"
      },
      {
        title: "Date",
        dataIndex: "eventDate",
        render: text => <Moment format="DD/MM/YYYY">{text}</Moment>
      }
    ];

    const columnsLap = [
      {
        title: "Race Time",
        dataIndex: "lapTime"
      }
    ];

    const columnsAvg = [
      {
        title: "Avg Velocity",
        dataIndex: "avgVelocity"
      },
      {
        title: "Avg SR",
        dataIndex: "avgSR"
      },
      {
        title: "Avg DPS",
        dataIndex: "avgDPS"
      }
    ];

    const columnsStats = [
      {
        title: "Distance",
        dataIndex: "dist",
        render: text => <strong>{text}</strong>
      },
      {
        title: "Split",
        dataIndex: "split"
      },
      {
        title: "Velocity",
        dataIndex: "velocity"
      },
      {
        title: "Stroke Rate",
        dataIndex: "sr"
      },
      {
        title: "Distance Per Stroke",
        dataIndex: "dps"
      },
      {
        title: "Count",
        dataIndex: "count"
      }
    ];

    var dataEvent = [];
    var dataLap = [];
    var dataAvg = [];
    var dataStats = [];

    console.log(this.props.race_id);

    if (this.props.fifty) {
      this.props.fifty.forEach(race => {
        console.log("race" + race._id);
        if (race._id === this.props.race_id) {
          dataEvent.push({
            key: `${race._id}`,
            eventType: race.eventType,
            eventDate: race.eventDate
          });
          dataLap.push({
            lapTime: race.lapTime
          });
          dataStats.push({
            split: race.firstSplit,
            velocity: race.firstVelocity,
            sr: race.firstSR,
            dps: race.firstDPS,
            count: race.firstCount,
            dist: "0-25m"
          });
          dataStats.push({
            split: race.secondSplit,
            velocity: race.secondVelocity,
            sr: race.secondSR,
            dps: race.secondDPS,
            count: race.secondCount,
            dist: "25-50m"
          });
          dataAvg.push({
            avgVelocity: race.avgVelocity,
            avgSR: race.avgSR,
            avgDPS: race.avgDPS
          });
        }
      });
    }
    if (this.props.hundred) {
      this.props.hundred.forEach(race => {
        console.log("race" + race._id);
        if (race._id === this.props.race_id) {
          dataEvent.push({
            key: `${race._id}`,
            eventType: race.eventType,
            eventDate: race.eventDate
          });
          dataLap.push({
            lapTime: race.lapTime
          });
          dataStats.push({
            split: race.firstSplit,
            velocity: race.firstVelocity,
            sr: race.firstSR,
            dps: race.firstDPS,
            count: race.firstCount,
            dist: "0-25m"
          });
          dataStats.push({
            split: race.secondSplit,
            velocity: race.secondVelocity,
            sr: race.secondSR,
            dps: race.secondDPS,
            count: race.secondCount,
            dist: "25-50m"
          });
          dataStats.push({
            split: race.thirdSplit,
            velocity: race.thirdVelocity,
            sr: race.thirdSR,
            dps: race.thirdDPS,
            count: race.thirdCount,
            dist: "50-75m"
          });
          dataStats.push({
            split: race.fourthSplit,
            velocity: race.fourthVelocity,
            sr: race.fourthSR,
            dps: race.fourthDPS,
            count: race.fourthCount,
            dist: "75-100m"
          });
          dataAvg.push({
            avgVelocity: race.avgVelocity,
            avgSR: race.avgSR,
            avgDPS: race.avgDPS
          });
        }
      });
    }

    return (
      <div>
        <Row gutter={16}>
          <Col span={18}>
            <Table
              columns={columnsEvent}
              dataSource={dataEvent}
              pagination={false}
              bordered
            />
          </Col>
          <Col span={6}>
            <Table
              columns={columnsLap}
              dataSource={dataLap}
              pagination={false}
              bordered
            />
          </Col>
        </Row>
        <div style={{ marginTop: "15px" }} />
        <Table
          columns={columnsStats}
          dataSource={dataStats}
          pagination={false}
          bordered
        />
        <div style={{ marginTop: "15px" }} />
        <Table
          columns={columnsAvg}
          dataSource={dataAvg}
          pagination={false}
          bordered
        />
        <Row gutter={16} style={{ marginTop: "25px" }}>
          <Col md={12} xs={24}>
            <Card title="Stroke rate &amp; Count">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={dataStats}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="dist" />
                  <YAxis
                    label={{
                      value: "Rate",
                      angle: -90,
                      position: "insideLeft"
                    }}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sr"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col md={12} xs={24}>
            <Card title="Velocity &amp; Distance per stroke">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={dataStats}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="dist" />
                  <YAxis
                    label={{
                      value: "mps/metres",
                      angle: -90,
                      position: "insideLeft"
                    }}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="velocity"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    strokeWidth={3}
                  />
                  <Line
                    type="monotone"
                    dataKey="dps"
                    stroke="#82ca9d"
                    activeDot={{ r: 8 }}
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
        <div style={{ marginTop: "15px" }} />
        <Row>
          <Card title="Split time">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={dataStats}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="dist" />
                <YAxis
                  label={{
                    value: "Time (seconds)",
                    angle: -90,
                    position: "insideLeft"
                  }}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="split"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Row>
      </div>
    );
  }
}

RaceAnalysisTable.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(RaceAnalysisTable));
