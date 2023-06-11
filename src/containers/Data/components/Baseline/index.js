import React, { useState, useEffect } from "react";
import "./style.css";
import { Nav } from "../../../../components/Nav";
import { Button, message, Row, Col, Tag, Select, Table, Tabs } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
const { Option } = Select;

const Baseline = () => {
  const [records, setRecords] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getEvents();
  }, []);

  const getEvents = () => {
    setLoading(true);
    return axios
      .get(
        `${process.env.REACT_APP_API_URL}/items/indicators?limit=1000000&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setEvents(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        message.error("Error");
      });
  };

  return (
    <>
      <div className="page-controls">
        <Link to="/indicator/add">
          <Button
            className="add-record"
            type="primary"
            size="large"
            htmlType="button"
          >
            Add Indicator
          </Button>
        </Link>{" "}
      </div>
      <div className="components">
        <Row gutter={30}>
          <Col xs={24}>
            <div className="table-wrapper">
              <Table
                columns={[
                  {
                    dataIndex: "name",
                    title: "Name",
                    key: "name",
                  },
                  {
                    dataIndex: "year",
                    title: "Year",
                    key: "year",
                    render: (value, record) => {
                      return <Tag color="orange">{value}</Tag>;
                    },
                  },
                  {
                    dataIndex: "admin_level",
                    title: "Admin levels",
                    key: "admin_level",
                    render: (value, record) => {
                      return <Tag color="green">{value}</Tag>;
                    },
                  },
                  {
                    dataIndex: "date_created",
                    title: "Created",
                    key: "date_created",
                    sorter: (a, b) =>
                      moment(a.date_created).format("x") -
                      moment(b.date_created).format("x"),
                    render: (value, record) => {
                      return <>{moment(value).format("MM-DD-YY hh:mm")}</>;
                    },
                  },
                  {
                    dataIndex: "date_updated",
                    title: "Updated",
                    key: "date_updated",
                    defaultSortOrder: "descend",
                    sorter: (a, b) =>
                      moment(a.date_updated || a.date_created).format("x") -
                      moment(b.date_updated || b.date_created).format("x"),
                    render: (value, record) => {
                      if (value) {
                        return <>{moment(value).format("MM-DD-YY hh:mm")}</>;
                      } else {
                        return (
                          <>
                            {moment(record.date_created).format(
                              "MM-DD-YY hh:mm"
                            )}
                          </>
                        );
                      }
                    },
                  },
                  {
                    dataIndex: "edit",
                    title: "",
                    key: "edit",
                    render: (value, record) => {
                      return <Link to={`/indicator/add`}>Edit</Link>;
                    },
                  },
                ]}
                pagination={{
                  pageSize: 40,
                }}
                loading={loading}
                dataSource={events}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export { Baseline };
