import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { Nav } from "../../components/Nav";
import {
  Button,
  message,
  Row,
  Col,
  Menu,
  DatePicker,
  Drawer,
  Input,
} from "antd";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import * as Plot from "@observablehq/plot";
import {
  AppstoreOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import dayjsRandom from "dayjs-random";
import { Chart } from "./chart";
dayjs.extend(dayjsRandom);
const { RangePicker } = DatePicker;

const Analysis = () => {
  const params = useParams();
  const [dashboard, setDashboard] = useState();
  const [dashboards, setDashboards] = useState();
  const [dashboardsMenu, setDashboardsMenu] = useState();
  const [dashboardId, setDashboardId] = useState(params.id || 1);
  const [effectsCount, setEffectsCount] = useState();
  const [eventsCount, setEventsCount] = useState();
  const [recordsCount, setRecordsCount] = useState();
  const [damageTotal, setDamageTotal] = useState();
  const [lossTotal, setLossTotal] = useState();
  const [charts, setCharts] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [dateRange, setDateRange] = useState();
  const [showChartDrawer, setShowChartDrawer] = useState();
  const [showDashboardSettings, setShowDashboardSettings] = useState(false);
  const [dashboardTitle, setDashboardTitle] = useState();

  useEffect(() => {
    if (dashboardTitle === null) {
      setDashboardTitle(dashboard?.name);
      setDateRange([dayjs(dashboard.start_date), dayjs(dashboard.end_date)]);
      setStartDate(dashboard.start_date);
      setEndDate(dashboard.end_date);
    }
  }, [dashboard]);

  useEffect(() => {
    setDashboardTitle(null);
  }, [params.id]);

  const addDashboard = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/items/dashboards?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
        {
          name: "New dashboard",
          start_date: dayjs("2018-05-01"),
          end_date: dayjs(),
        }
      )
      .then((res) => {
        getDashboards();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDashboards = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/items/dashboards?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        const array = [];
        array.push(
          {
            key: "Records",
            label: <Link to={`/analysis/records`}>Records</Link>,
          },
          {
            key: "Events",
            label: <Link to={`/analysis/events`}>Events</Link>,
          },
          {
            key: "Sectors",
            label: <Link to={`/analysis/sectors`}>Sectors</Link>,
          },
          {
            key: "Hazards",
            label: <Link to={`/analysis/hazards`}>Hazards</Link>,
          }
        );
        res.data.data.forEach((item) => {
          array.push({
            key: item.id,
            label: <Link to={`/dashboard/${item.id}`}>{item.name}</Link>,
          });
        });
        array.push({
          key: "add",
          label: (
            <a
              href="#add"
              onClick={(e) => {
                e.preventDefault();
                addDashboard();
              }}
            >
              Add new +
            </a>
          ),
        });
        setDashboards(res.data.data);

        setDashboardsMenu(array.sort((a, b) => a.key - b.key));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCharts = () => {
    setCharts([]);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/items/charts?filter[dashboard][_eq]=${
          params.id || 1
        }&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setCharts(res.data.data.sort((a, b) => a.id - b.id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDashboards();
  }, [params.id]);

  useEffect(() => {
    if (dashboards?.length > 0) {
      dashboards?.forEach((item, index) => {
        if (item.id === Number(params.id)) {
          setDashboard(item);
        }
      });
    }
  }, [dashboards, params.id]);

  useEffect(() => {
    getCharts();
  }, [params.id]);

  useEffect(() => {
    if (startDate && endDate) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/items/effects?filter[date][_between]=[${startDate},${endDate}]&aggregate[count]=uuid&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
        )
        .then((res) => {
          setEffectsCount(res.data.data[0].count.uuid);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/items/effects?filter[date][_between]=[${startDate},${endDate}]&aggregate[countDistinct]=event&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
        )
        .then((res) => {
          setEventsCount(res.data.data[0].countDistinct.event);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/items/effects?filter[date][_between]=[${startDate},${endDate}]&aggregate[sum]=total_cost&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
        )
        .then((res) => {
          setDamageTotal(res.data.data[0].sum.total_cost);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/items/records?filter[date][_between]=[${startDate},${endDate}]&aggregate[count]=uuid&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
        )
        .then((res) => {
          setRecordsCount(res.data.data[0].count.uuid);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/items/effects?filter[date][_between]=[${startDate},${endDate}]&aggregate[sum]=total_loss&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
        )
        .then((res) => {
          setLossTotal(res.data.data[0].sum.total_loss);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [startDate, endDate]);

  return (
    <>
      <div className="page-header">
        <div className="content">
          <h1>Analysis</h1>
        </div>
      </div>
      <div className="page-hero page-analysis">
        <div className="content">
          <div className="dashboard" style={{ marginBottom: "0px" }}>
            <Menu
              style={{ paddingLeft: "20px" }}
              mode="horizontal"
              items={dashboardsMenu}
            />
          </div>

          <Row gutter={20}>
            <Col xs={24} sm={24} style={{ marginBottom: "20px" }}>
              <div className="card dashboard-controls">
                <div className="content">
                  <label>Date range</label>
                  <br />
                  <RangePicker
                    value={dateRange}
                    onChange={(value) => {
                      setDateRange(value);
                      setStartDate(dayjs(value[0]).format("YYYY-MM-DD"));
                      setEndDate(dayjs(value[1]).format("YYYY-MM-DD"));
                    }}
                  />
                  <SettingOutlined
                    className="dashboard-settings-control"
                    onClick={() =>
                      setShowDashboardSettings(
                        showDashboardSettings ? false : true
                      )
                    }
                  />
                  {showDashboardSettings !== false && (
                    <div className="dashboard-settings">
                      <Row gutter={20}>
                        <Col sm={12} xs={24}>
                          <label>Dashboard title</label>
                          <Input
                            placeholder={"Enter title"}
                            value={dashboardTitle}
                            onChange={(e) => {
                              setDashboardTitle(e.target.value);
                            }}
                            onBlur={(e) => {
                              axios
                                .patch(
                                  `${process.env.REACT_APP_API_URL}/items/dashboards/${params.id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
                                  {
                                    id: dashboard.id,
                                    name: e.target.value,
                                  }
                                )
                                .then(() => {
                                  // getDashboards();
                                });
                            }}
                          />
                        </Col>
                      </Row>
                    </div>
                  )}
                  <DeleteOutlined
                    className="dashboard-delete-control"
                    onClick={() => {
                      axios
                        .delete(
                          `${process.env.REACT_APP_API_URL}/items/dashboards/${params.id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
                        )
                        .then(() => {
                          message.success("Dashboard delete");
                        })
                        .finally(() => {
                          // getDashboards();
                        });
                    }}
                  />
                </div>
              </div>
            </Col>

            <Col xs={24} sm={24}>
              <div className="summary-cards">
                <Row gutter={20}>
                  <Col xs={24} sm={4}>
                    <div className="card">
                      <div className="content">
                        <div className="big-number">{recordsCount}</div>
                        <div className="component-text">Records</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={4}>
                    <div className="card">
                      <div className="content">
                        <div className="big-number">{effectsCount}</div>
                        <div className="component-text">Effects</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={4}>
                    <div className="card">
                      <div className="content">
                        <div className="big-number">{eventsCount}</div>
                        <div className="component-text">Events</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={6}>
                    <div className="card">
                      <div className="content">
                        <div className="big-number">
                          {Number(damageTotal).toLocaleString("en-US") !==
                            "NaN" &&
                            Number(damageTotal).toLocaleString("en-US")}
                        </div>
                        <div className="component-text">Total Damage</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={6}>
                    <div className="card">
                      <div className="content">
                        <div className="big-number">
                          {Number(lossTotal).toLocaleString("en-US") !==
                            "NaN" && Number(lossTotal).toLocaleString("en-US")}
                        </div>
                        <div className="component-text">Total Loss</div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            {charts.map((chart, index) => (
              <Chart
                key={`${index}-${params.id}`}
                dashboard={params.id}
                chart={chart}
                startDate={startDate}
                endDate={endDate}
                refresh={() => getCharts()}
              />
            ))}

            <Button
              type="link"
              className="add-chart"
              onClick={() => {
                axios
                  .post(
                    `${process.env.REACT_APP_API_URL}/items/charts?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
                    {
                      cols: 24,
                      height: 140,
                      dashboard: params.id,
                      title: "My new chart",
                      mark: "rectY",
                      aggregate: "sum",
                      indicator: "total_cost",
                      margin_right: 50,
                      margin_left: 100,
                      exclude: [],
                      interval: "year",
                      x: "date",
                      y: "value",
                    }
                  )
                  .then(() => {
                    getCharts();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Add Chart
            </Button>
          </Row>

          <Drawer
            open={showChartDrawer}
            onClose={() => {
              setShowChartDrawer(false);
            }}
          />
        </div>
      </div>
    </>
  );
};

export { Analysis };
