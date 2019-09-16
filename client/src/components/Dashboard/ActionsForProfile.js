import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Button, Row, Col } from "antd";

class ActionsForProfile extends Component {
  render() {
    const { username } = this.props;
    return (
      <div>
        <h5>General Data</h5>
        <Row type="flex" justify="start">
          <Col>
            <Link to={`/new-injury/${username}`}>
              <Button>
                <Icon type="medicine-box" /> New injury
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to={`/new-bloodpressure/${username}`}>
              <Button>
                <Icon type="rise" /> New blood pressure
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to={`/new-bpm/${username}`}>
              <Button>
                <Icon type="heart" /> New BPM
              </Button>
            </Link>
          </Col>
        </Row>
        <h5>Race Data</h5>
        <Row type="flex" justify="start">
          <Col>
            <Link to={`/fiftyrace/${username}`}>
              <Button>
                <Icon type="plus" /> New 50m
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to={`/hundredrace/${username}`}>
              <Button>
                <Icon type="plus" /> New 100m
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ActionsForProfile;
