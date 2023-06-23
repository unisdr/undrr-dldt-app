import React, { useState, useEffect } from "react";
import "./style.css";
import { Nav } from "../../components/Nav";
import {
  Button,
  message,
  DatePicker,
  Row,
  Col,
  Tag,
  Tooltip,
  Select,
  Table,
  Tabs,
  Input,
} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import dayjs from "dayjs";
import axios from "axios";
import { CircleFilled } from "@ant-design/icons";
const { Option } = Select;

const Front = () => {
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
    let url = `${window._env_.REACT_APP_API_URL}/items/records?limit=5&sort[]=-date_created&access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`;
    if (countryId) {
      url = `${window._env_.REACT_APP_API_URL}/items/records?filter[_and][0][country][_eq]=${countryId}&limit=5&access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`;
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
      <div className="page">
        <div className="dashboard">
          <div className="welcome-msg">
            <p>
              Welcome to the Disaster Losses and Damage Tracking System. You can
              create a <Link to="/">new record</Link>, explore data in the{" "}
              <Link to="/">analysis</Link> section, configure your instance{" "}
              <Link to="/">settings</Link>, and <Link to="/">import</Link> or{" "}
              <Link to="/">export</Link> data.
            </p>
          </div>
          <div className="components">
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
            {/*}
      <div className="record-filters">
      <Row gutter={30}>
        <Col sm={6} xs={24}>
          <label>Hazard</label>
          <Select style={{ width: '100%' }} placeholder="Select hazard"></Select>
        </Col>
        <Col sm={6} xs={24}>
          <label>Event</label>
          <Select style={{ width: '100%' }} placeholder="Select event"></Select>
        </Col>
        <Col sm={6} xs={24}>
          <label>Record created</label>
          <DatePicker style={{ width: '100%' }} />
        </Col>
        </Row>
        </div>
         {*/}
            <Row gutter={30}>
              <Col xs={24}>
                <h2>Assigned Records</h2>
                {sectors?.length > 1 && (
                  <div className="table-wrapper">
                    <Table
                      columns={[
                        {
                          dataIndex: "uuid",
                          title: "UUID",
                          key: "uuid",
                          render: (value, record) => (
                            <Input style={{ width: "100px" }} value={value} />
                          ),
                        },
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
                          dataIndex: "status",
                          title: "Action required?",
                          key: "action",
                          render: (value, record) => "Yes",
                        },
                        {
                          dataIndex: "date_sent",
                          title: "Date sent for my action",
                          key: "date_sent",
                          render: (value, record) =>
                            dayjs().format("DD MMM 'YY"),
                        },
                        {
                          dataIndex: "sent_by",
                          title: "Sent by",
                          key: "sent_by",
                          render: (value, record) => "Tanguy Thomas",
                        },
                        {
                          dataIndex: "origin",
                          title: "Origin",
                          key: "origin",
                          render: (value, record) => "Toronto DLAS",
                        },
                        {
                          /*}
                    {
                      dataIndex: "sector",
                      title: "Sector",
                      key: "sector",
                      filters: sectors.filter((row) => row.id !== 'AGR').map((item) => ({ text: item.name, value: item.id })),
                      onFilter: (value, record) => record.sector === value,
                      render: (value, record) => {
                        return (
                          <Tag color="blue">
                              {getSectorName(value)}{" "}
                          </Tag>
                        );
                      },
                    },
                  {*/
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
                            return <b>Tropical Cyclone Erma</b>;
                          },
                        },
                        {
                          dataIndex: "event",
                          title: "Event date",
                          key: "event_date",
                          render: (value, record) => {
                            return dayjs()
                              .subtract(10, "days")
                              .format("DD MMM 'YY");
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
                            return "Region A";
                          },
                        },
                        {
                          dataIndex: "district",
                          title: "District",
                          key: "district",
                          filters: regions.map((item) => ({
                            text: item.code,
                            value: item.code,
                          })),
                          onFilter: (value, record) => record.region === value,
                          render: (value, record) => {
                            return "District A";
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
                            return <>{moment(value).format("DD MMM 'YY")}</>;
                          },
                        },
                        {
                          dataIndex: "date_updated",
                          title: "Updated",
                          key: "date_updated",
                          defaultSortOrder: "descend",
                          sorter: (a, b) =>
                            moment(a.date_updated || a.date_created).format(
                              "x"
                            ) -
                            moment(b.date_updated || b.date_created).format(
                              "x"
                            ),
                          render: (value, record) => {
                            if (value) {
                              return <>{moment(value).format("DD MMM 'YY")}</>;
                            } else {
                              return (
                                <>
                                  {moment(record.date_created).format(
                                    "DD MMM 'YY"
                                  )}
                                </>
                              );
                            }
                          },
                        },
                        {
                          dataIndex: "user_updated",
                          title: "Updated by",
                          key: "updated_by",
                          render: (value, record) => {
                            console.log(record);
                            return "Tanguy Thomas";
                          },
                        },
                        {
                          /*}
                    {
                      dataIndex: "effects",
                      title: "Effects",
                      key: "effects",
                      render: (value, record) => {
                        return record?.effects?.length;
                      },
                    },
                  {*/
                        },
                        {
                          dataIndex: "edit",
                          title: "",
                          key: "edit",
                          render: (value, record) => {
                            return (
                              <Link to={`/record/${record.uuid}`}>Edit</Link>
                            );
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

                <h2>My Records</h2>
                {sectors?.length > 1 && (
                  <div className="table-wrapper">
                    <Table
                      columns={[
                        {
                          dataIndex: "uuid",
                          title: "UUID",
                          key: "uuid",
                          render: (value, record) => (
                            <Input style={{ width: "100px" }} value={value} />
                          ),
                        },
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
                          dataIndex: "status",
                          title: "Action required?",
                          key: "action",
                          render: (value, record) => "Yes",
                        },
                        {
                          dataIndex: "date_sent",
                          title: "Date sent for my action",
                          key: "date_sent",
                          render: (value, record) =>
                            dayjs().format("DD MMM 'YY"),
                        },
                        {
                          dataIndex: "sent_by",
                          title: "Sent by",
                          key: "sent_by",
                          render: (value, record) => "Tanguy Thomas",
                        },
                        {
                          dataIndex: "origin",
                          title: "Origin",
                          key: "origin",
                          render: (value, record) => "Toronto DLAS",
                        },
                        {
                          /*}
                    {
                      dataIndex: "sector",
                      title: "Sector",
                      key: "sector",
                      filters: sectors.filter((row) => row.id !== 'AGR').map((item) => ({ text: item.name, value: item.id })),
                      onFilter: (value, record) => record.sector === value,
                      render: (value, record) => {
                        return (
                          <Tag color="blue">
                              {getSectorName(value)}{" "}
                          </Tag>
                        );
                      },
                    },
                  {*/
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
                            return <b>Tropical Cyclone Erma</b>;
                          },
                        },
                        {
                          dataIndex: "event",
                          title: "Event date",
                          key: "event_date",
                          render: (value, record) => {
                            return dayjs()
                              .subtract(10, "days")
                              .format("DD MMM 'YY");
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
                            return "Region A";
                          },
                        },
                        {
                          dataIndex: "district",
                          title: "District",
                          key: "district",
                          filters: regions.map((item) => ({
                            text: item.code,
                            value: item.code,
                          })),
                          onFilter: (value, record) => record.region === value,
                          render: (value, record) => {
                            return "District A";
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
                            return <>{moment(value).format("DD MMM 'YY")}</>;
                          },
                        },
                        {
                          dataIndex: "date_updated",
                          title: "Updated",
                          key: "date_updated",
                          defaultSortOrder: "descend",
                          sorter: (a, b) =>
                            moment(a.date_updated || a.date_created).format(
                              "x"
                            ) -
                            moment(b.date_updated || b.date_created).format(
                              "x"
                            ),
                          render: (value, record) => {
                            if (value) {
                              return <>{moment(value).format("DD MMM 'YY")}</>;
                            } else {
                              return (
                                <>
                                  {moment(record.date_created).format(
                                    "DD MMM 'YY"
                                  )}
                                </>
                              );
                            }
                          },
                        },
                        {
                          dataIndex: "user_updated",
                          title: "Updated by",
                          key: "updated_by",
                          render: (value, record) => {
                            console.log(record);
                            return "Tanguy Thomas";
                          },
                        },
                        {
                          /*}
                    {
                      dataIndex: "effects",
                      title: "Effects",
                      key: "effects",
                      render: (value, record) => {
                        return record?.effects?.length;
                      },
                    },
                  {*/
                        },
                        {
                          dataIndex: "edit",
                          title: "",
                          key: "edit",
                          render: (value, record) => {
                            return (
                              <Link to={`/record/${record.uuid}`}>Edit</Link>
                            );
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

                <h2>Gap Analysis</h2>
                {sectors?.length > 1 && (
                  <div className="table-wrapper">
                    <Table
                      columns={[
                        {
                          dataIndex: "uuid",
                          title: "UUID",
                          key: "uuid",
                          render: (value, record) => (
                            <Input style={{ width: "100px" }} value={value} />
                          ),
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
                            return <b>Tropical Cyclone Erma</b>;
                          },
                        },
                        {
                          dataIndex: "sectors",
                          title: "Sectors Effect Count",
                          key: "sectors",
                          render: (value, record) => {
                            return "Crops (22), Livestock (13), Energy & Electricity (34)";
                          },
                        },
                        {
                          dataIndex: "regions",
                          title: "Regions Effect Count",
                          key: "regions",
                          render: (value, record) => {
                            return "Region A (32), Region B (23), Region C (32)";
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
        </div>
      </div>
    </>
  );
};

export { Front };
