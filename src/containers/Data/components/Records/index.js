import React, { useState, useEffect } from "react";
import "./style.css";
import { Nav } from "../../../../components/Nav";
import { Button, message, Row, Col, Tag, Select, Table, Tabs } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
const { Option } = Select;

const Records = () => {
  const [records, setRecords] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getRecords();
    getSectors();
    getEvents();
    getCountries();
    setLoading(true);
  }, []);

  useEffect(() => {
    getRecords();
  }, [countryId]);

  const getRecords = () => {
    setLoading(true);
    let url = `${process.env.REACT_APP_API_URL}/items/records?limit=100&sort[]=-date_created&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`;
    if (countryId) {
      url = `${process.env.REACT_APP_API_URL}/items/records?filter[_and][0][country][_eq]=${countryId}&limit=100&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`;
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
        `${process.env.REACT_APP_API_URL}/items/sectors?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
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
        `${process.env.REACT_APP_API_URL}/items/events?limit=1000000&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setEvents(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        message.error("Error");
      });
  };

  const getCountries = () => {
    return axios
      .get(
        `${process.env.REACT_APP_API_URL}/items/countries?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
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
                      dataIndex: "uuid",
                      title: "Record",
                      key: "id",
                      render: (value, record) => {
                        return <Link to={`/record/${value}`}>DL0000-00</Link>;
                      },
                    },
                    {
                      dataIndex: "country",
                      title: "Country",
                      key: "country",
                      render: (value, record) => {
                        return <Tag color="green">{getCountryName(value)}</Tag>;
                      },
                    },
                    {
                      dataIndex: "sector",
                      title: "Sector",
                      key: "sector",
                      filters: [
                        {
                          text: "Agriculture",
                          value: 1,
                        },
                        {
                          text: "Health",
                          value: 11,
                        },
                        {
                          text: "Education",
                          value: 12,
                        },
                        {
                          text: "Housing",
                          value: 10,
                        },
                        {
                          text: "Culture and Heritage",
                          value: 13,
                        },
                      ],
                      onFilter: (value, record) => record.sector === value,
                      render: (value, record) => {
                        return (
                          <Tag color="blue">
                            <Link to={`/record/${record.id}`}>
                              {getSectorName(value)}{" "}
                            </Link>
                          </Tag>
                        );
                      },
                    },
                    {
                      dataIndex: "event",
                      title: "Event",
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
