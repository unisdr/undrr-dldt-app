import React, { useState, useEffect } from "react";
import "./style.css";
import { Nav } from "../../../../components/Nav";
import { Button, message, Row, Col, Tag, Select, Table, Tabs } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
const { Option } = Select;

const Events = () => {
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

  const getSectors = () => {
    return axios
      .get(
        `${window._env_.REACT_APP_API_URL}/items/sectors?access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setSectors(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        message.error("Error");
      });
  };

  const getEvents = () => {
    setLoading(true);
    return axios
      .get(
        `${window._env_.REACT_APP_API_URL}/items/events?limit=1000000&access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
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

  const getCountries = () => {
    return axios
      .get(
        `${window._env_.REACT_APP_API_URL}/items/countries?access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setCountries(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        message.error("Error");
      });
  };

  const getSectorName = (sectorId) => {
    if (sectorId && sectors.length > 0) {
      const sector = sectors?.filter((item) => item.id === sectorId);
      return sector[0]?.name || "-";
    }
  };

  const getCountryName = (id) => {
    if (id && countries.length > 0) {
      const country = countries?.filter((item) => item.code === id);
      return country[0]?.name || "-";
    }
  };

  const getEventName = (id) => {
    if (id && events.length > 0) {
      const event = events?.filter((item) => item.uuid === id);
      return event[0]?.name;
    }
    return "None";
  };

  return (
    <>
      <div className="page-controls">
        <Link to="/event/add">
          <Button
            className="add-record"
            type="primary"
            size="large"
            htmlType="button"
          >
            Add Event
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
                    dataIndex: "uuid",
                    title: "UUID",
                    key: "event",
                    filters: [
                      {
                        text: "Pakistan Floods 2022",
                        value: 45,
                      },
                    ],
                    onFilter: (value, record) => record.event === value,
                    render: (value, record) => {
                      return <Tag color="orange">{value}</Tag>;
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
                      return <Link to={`/event/add`}>Edit</Link>;
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

export { Events };
