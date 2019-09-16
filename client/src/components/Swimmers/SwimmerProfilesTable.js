import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Table, Input, Button, Icon } from "antd";
import Moment from "react-moment";
import Highlighter from "react-highlight-words";

class SwimmerProfilesTable extends Component {
  state = {
    searchText: ""
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.usernameSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.usernameSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.usernameReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  usernameSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  usernameReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const tableColumns = [
      {
        title: "Swimmer Name",
        dataIndex: "name",
        width: "25%",
        ...this.getColumnSearchProps("name")
      },
      {
        title: "Date of Birth",
        dataIndex: "dob",
        render: text => <Moment format="DD/MM/YYYY">{text}</Moment>
      },
      {
        title: "Username",
        dataIndex: "username",
        ...this.getColumnSearchProps("username")
      },
      {
        title: "View Information",
        dataIndex: "link",
        render: text => <Link to={`/swimmer/${text}`}>View</Link>
      }
    ];

    const data = [];

    if (this.props.swimmerProfiles) {
      this.props.swimmerProfiles.forEach(profile => {
        if (!profile.user.isAdmin) {
          data.push({
            key: `${profile._id}`,
            name: `${profile.user.name}`,
            username: `${profile.username}`,
            dob: `${profile.dateOfBirth}`,
            link: `${profile.username}`
          });
        }
      });
    }

    console.log(data);

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

SwimmerProfilesTable.propTypes = {
  getCurrentProfile: PropTypes.func
};

export default connect(null)(withRouter(SwimmerProfilesTable));
