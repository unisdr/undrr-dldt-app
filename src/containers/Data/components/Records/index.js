import React, { useState, useEffect } from "react";
import "./style.css";
import { Nav } from "../../../../components/Nav";
import {
  Button,
  message,
  Row,
  Col,
  Tag,
  Tooltip,
  Select,
  Table,
  Tabs,
} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { CircleFilled } from "@ant-design/icons";
const { Option } = Select;

const Records = () => {
  const [records, setRecords] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState();
  const [events, setEvents] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);

  const statusColor = {
    draft: "#F4E496",
    published: "#0A696A",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getRecords();
    getSectors();
    getEvents();
    getCountries();
    getRegions();
    setLoading(true);
  }, []);

  useEffect(() => {
    getRecords();
  }, [countryId]);

  const getRecords = () => {
    setLoading(true);
    let url = `${window._env_.REACT_APP_API_URL}/items/records?limit=100&sort[]=-date_created&access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`;
    if (countryId) {
      url = `${window._env_.REACT_APP_API_URL}/items/records?filter[_and][0][country][_eq]=${countryId}&limit=100&access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`;
    }
    axios
      .get(url)
      .then((res) => {
        //const sort = res.data.data.sort((a, b) => moment(a.date).format('x') - moment(b.date).format('x'));
        setRecords(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        message.error("Error");
      });
  };

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
    return axios
      .get(
        `${window._env_.REACT_APP_API_URL}/items/events?limit=1000000&access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setEvents(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        message.error("Error");
      });
  };

  const getRegions = () => {
    return axios
      .get(
        `${window._env_.REACT_APP_API_URL}/items/regions?limit=1000000&access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setRegions(res.data.data);
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
        <Link to="/record/add">
          <Button
            className="add-record"
            type="primary"
            size="large"
            htmlType="button"
          >
            Add Record
          </Button>
        </Link>{" "}
      </div>
      <div className="components">
        <Row gutter={30}>
          <Col xs={24}>
            {sectors?.length > 1 && (
              <div className="table-wrapper">
                <Table
                  columns={[
                    {
                      dataIndex: "status",
                      title: "Status",
                      key: "status",
                      sorter: (a, b) => a.status.localeCompare(b.status),
                      render: (value, record) => {
                        return (
                          <Tooltip title={value}>
                            {}{" "}
                            <div
                              style={{ background: statusColor[value] }}
                              className="status-circle"
                            >
                              {value}
                            </div>
                          </Tooltip>
                        );
                      },
                    },
                    {
                      dataIndex: "region",
                      title: "Region",
                      key: "region",
                      filters: regions.map((item) => ({
                        text: item.code,
                        value: item.code,
                      })),
                      onFilter: (value, record) => record.region === value,
                      render: (value, record) => {
                        return value;
                      },
                    },
                    {
                      dataIndex: "sector",
                      title: "Sector",
                      key: "sector",
                      filters: sectors
                        .filter((row) => row.id !== "AGR")
                        .map((item) => ({ text: item.name, value: item.id })),
                      onFilter: (value, record) => record.sector === value,
                      render: (value, record) => {
                        return getSectorName(value);
                      },
                    },
                    {
                      dataIndex: "event",
                      title: "Event",
                      key: "event",
                      filters: events.map((item) => ({
                        text: item.name,
                        value: item.uuid,
                      })),
                      onFilter: (value, record) => record.event === value,
                      render: (value, record) => {
                        return getEventName(value);
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
                      dataIndex: "effects",
                      title: "Effects",
                      key: "effects",
                      render: (value, record) => {
                        return record?.effects?.length;
                      },
                    },
                    {
                      dataIndex: "edit",
                      title: "",
                      key: "edit",
                      render: (value, record) => {
                        return <Link to={`/record/${record.uuid}`}>Edit</Link>;
                      },
                    },
                  ]}
                  pagination={{
                    pageSize: 40,
                  }}
                  loading={loading}
                  dataSource={records}
                />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export { Records };
