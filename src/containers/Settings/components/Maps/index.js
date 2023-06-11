import React, { useState, useEffect } from "react";
import "./style.css";
import { Nav } from "../../../../components/Nav";
import { Button, message, Row, Col, Tag, Select, Table, Tabs } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
const { Option } = Select;

const Maps = () => {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getRegions();
  }, []);

  const getRegions = () => {
    return axios
      .get(
        `${process.env.REACT_APP_API_URL}/items/units?limit=-1&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setRegions(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        message.error("Error");
      });
  };

  return (
    <>
      <div className="page-controls">
        <Link>
          <Button
            className="add-record"
            type="primary"
            size="large"
            htmlType="button"
          >
            Add Geometry
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
                    render: (value, record) => {
                      return "Admin boundaries 1";
                    },
                  },
                  {
                    dataIndex: "type",
                    title: "Type",
                    key: "type",
                    render: (value, record) => {
                      return <Tag color="orange">geojson</Tag>;
                    },
                  },
                  {
                    dataIndex: "level",
                    title: "Level",
                    key: "level",
                    onFilter: (value, record) => record.asset === value,
                    render: (value, record) => {
                      return <Tag color="green">Admin {value}</Tag>;
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
                dataSource={regions}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export { Maps };
