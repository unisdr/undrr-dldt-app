import React, { useRef, useState, useEffect } from "react";
import { Row, Col, Select, Slider, Input, Button, message, Switch } from "antd";
import * as Plot from "@observablehq/plot";
import { DeleteOutlined, SettingOutlined } from "@ant-design/icons";
import axios from "axios";
import mapData from "./disasterland.json";
import * as topojson from "topojson";
import * as d3 from "d3";
const { Option } = Select;

const Chart = (props) => {
  const { startDate, endDate, chart, dashboard } = props;
  const [chartData, setChartData] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [hazards, setHazards] = useState([]);
  const [marginRight, setMarginRight] = useState(chart.margin_right);
  const [marginLeft, setMarginLeft] = useState(chart.margin_left);
  const [facetPadding, setFacetPadding] = useState(chart.facet_padding || 0);
  const [x, setX] = useState(chart.x || "");
  const [y, setY] = useState(chart.y || "");
  const [title, setTitle] = useState(chart.title);
  const [hde, setHde] = useState(chart.hde);
  const [cols, setCols] = useState(chart.cols);
  const [group, setGroup] = useState(chart.group || null);
  const [interval, setInterval] = useState(chart.interval || "month");
  const [height, setHeight] = useState(chart.height);
  const [indicator, setIndicator] = useState(chart.indicator);
  const [aggregation, setAggregation] = useState(chart.aggregate);
  const [mark, setMark] = useState(chart.mark);
  const [exclude, setExclude] = useState(chart.exclude);
  const [showSettings, setShowSettings] = useState(false);
  const [map, setMap] = useState(Number(chart.map) || false);
  const [color, setColor] = useState(chart.color || null);

  const chartRef = useRef();

  const features = topojson.feature(mapData, mapData.objects.disasterland);

  const weekToDate = (year, week) => {
    const days = 4 + 7 * (week - 1);
    const date = new Date(year, 0, days);
    return date;
  };

  const getGroup = (item) => {
    if (group === "sector") {
      return sectors?.[item.sector]?.name;
    }
    if (group === "hazard") {
      return hazards?.[item.hazard]?.name;
    }
    if (group === "event") {
      return item.event;
    }
    return null;
  };

  const filterData = (row) => {
    if (chart.hde && mark === "line" && exclude?.length) {
      if (!exclude.includes(row.hde)) {
        return false;
      }
    }
    if (group === "sector" && row.group === "Human Direct Effects") {
      return false;
    }
    return true;
  };

  const getFontSize = (cols) => {
    if (cols === 12) {
      return 14;
    }
    if (cols === 8) {
      return 16;
    }
    if (cols === 24) {
      return 7;
    }
    return 7;
  };

  const getRightMargin = () => {
    if (group) {
      if (marginRight < 100) {
        return 100;
      } else {
        return marginRight;
      }
    }
    return marginRight;
  };

  const getStroke = () => {
    if (mark === "line" && chart.color) {
      return chart.color;
    }
    if (mark === "line" && chart.hde) {
      return "hde";
    }
    if (mark === "line" && !chart.hde) {
      return "group";
    }
    return null;
  };

  const getFill = () => {
    if (color) {
      return color;
    }
    if (chart.hde && mark !== "line") {
      return "value";
    }
    if (mark === "rectY") {
      return "value";
    }
    return null;
    //mark !== 'line' ? 'value' : null
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/items/sectors?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        const obj = {};
        res.data.data.forEach((item) => {
          obj[item.id] = item;
        });
        setSectors(obj);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/items/hazards?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        const obj = {};
        res.data.data.forEach((item) => {
          obj[item.id] = item;
        });
        setHazards(obj);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let query = `&aggregate[${aggregation}]=${indicator}&groupBy=date`;
    if (interval === "year") {
      query = `&aggregate[${aggregation}]=${indicator}&groupBy=year(date)`;
    }
    if (interval === "month") {
      query = `&aggregate[${aggregation}]=${indicator}&groupBy=month(date)&groupBy=year(date)`;
    }
    if (interval === "week") {
      query = `&aggregate[${aggregation}]=${indicator}&groupBy=week(date)&groupBy=month(date)&groupBy=year(date)`;
    }
    if (group !== null) {
      query += `&groupBy=${group}`;
    }
    if (chart.hde && mark === "line") {
      query += `&filter[human_effect][_neq]=null&groupBy=human_effect`;
    }
    if (chart.hde && mark === "rectY") {
      query += `&filter[human_effect][_eq]=${chart.hde}`;
    }

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/items/effects?filter[date][_between]=[${startDate},${endDate}]${query}&limit=-1&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        const array = [];
        res.data.data.forEach((item) => {
          if (interval === "year") {
            array.push({
              date: new Date(String(`${item.date_year}`)),
              value: Number(item[aggregation][indicator]),
              group: getGroup(item),
              hde: item.human_effect,
            });
          }
          if (interval === "month") {
            array.push({
              date: new Date(String(`${item.date_year}-${item.date_month}`)),
              value: Number(item[aggregation][indicator]),
              group: getGroup(item),
              hde: item.human_effect,
            });
          }
          if (interval === "week") {
            array.push({
              date: new Date(
                String(weekToDate(item.date_year, item.date_week))
              ),
              value: Number(item[aggregation][indicator]),
              group: getGroup(item),
              hde: item.human_effect,
            });
          }
          if (interval === "day") {
            array.push({
              date: new Date(String(`${item.date}`)),
              value: Number(item[aggregation][indicator]),
              group: getGroup(item),
              hde: item.human_effect,
            });
          }
        });

        setChartData(
          array.filter((row) => filterData(row)).sort((a, b) => a.date - b.date)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    startDate,
    endDate,
    interval,
    sectors,
    hazards,
    mark,
    dashboard,
    indicator,
    hde,
    exclude,
    group,
  ]);

  useEffect(() => {
    let plot;
    if (!map) {
      plot = Plot.plot({
        style: {
          width: "100%",
          fontSize: getFontSize(cols),
          background: "rgba(0,0,0,0.01)",
        },
        color: {
          legend: true,
          scheme: "Oranges",
        },
        y: {
          label: "",
          grid: y ? true : false,
          axis: y ? true : null,
        },
        fy: {
          label: null,
          padding: y ? 0.3 : 0,
        },
        height: height,
        marginTop: 20,
        marginRight: getRightMargin(),
        marginLeft: marginLeft,
        marks: [
          Plot[mark](chartData, {
            x: x,
            y: y ? y : false,
            z: chart.hde ? "hde" : null,
            fill: getFill(),
            stroke: getStroke(),
            interval: interval,
            fy: group !== null ? "group" : null,
            marker: "circle",
            curve: "bump-x",
          }),
          //Plot.text(chartData, { x: "date", y: "value", text: (d) => `${d.value}`, dx: -1, dy: -8}),
          Plot.ruleY([0], { stroke: "#111", strokeWidth: y ? 0.5 : 0 }),
        ],
      });
    } else {
      const circle = d3.geoCircle().center([80.61, -8.75]).radius(4)();
      plot = Plot.plot({
        projection: {
          type: "mercator",
          //domain: circle,
          domain: circle,
          inset: 10,
        },
        color: {
          type: "ordinal",
          legend: true,
          scheme: "Blues",
        },

        style: {
          width: "100%",
          background: "transparent",
        },
        height: height,
        marks: [
          Plot.graticule(),
          Plot.geo(features, {
            stroke: "#555",
            strokeWidth: 0.5,
          }),
          Plot.geo(features, {
            fill: (d) => d.properties.adm1_pcode,
            //fy: (d) => d.properties.prov_code,
            //domain: circle,
          }),
          //Plot.frame()
        ],
      });
    }
    chartRef.current.append(plot);
    return () => plot.remove();
  }, [chartData, interval, mark, height, y, cols, map, color]);

  return (
    <Col xs={24} sm={cols || 24}>
      <div className="card card-chart">
        <div className="content">
          <h2>{title}</h2>
          <SettingOutlined
            className="show-settings"
            onClick={() => {
              setShowSettings(showSettings ? false : true);
            }}
          />
          <DeleteOutlined
            className="delete-chart"
            onClick={() => {
              axios
                .delete(
                  `${process.env.REACT_APP_API_URL}/items/charts/${chart.id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
                )
                .then(() => {
                  message.success("Chart deleted");
                })
                .finally(() => {
                  props.refresh();
                });
            }}
          />
          {showSettings && (
            <div className="chart-controls">
              <Row gutter={10}>
                <Col xs={12} sm={6}>
                  <label>Title</label>
                  <Input
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      axios.patch(
                        `${process.env.REACT_APP_API_URL}/items/charts/${chart.id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
                        {
                          id: chart.id,
                          title: e.target.value,
                        }
                      );
                    }}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <label>Interval</label>
                  <Select
                    style={{ width: "100%" }}
                    value={interval}
                    onChange={(value) => {
                      setInterval(value);
                      axios.patch(
                        `${process.env.REACT_APP_API_URL}/items/charts/${chart.id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
                        {
                          id: chart.id,
                          interval: value,
                        }
                      );
                    }}
                  >
                    <Option value="day">Day</Option>
                    <Option value="week">Week</Option>
                    <Option value="month">Month</Option>
                    <Option value="year">Year</Option>
                  </Select>
                </Col>
                <Col xs={12} sm={6}>
                  <label>Mark</label>
                  <Select
                    style={{ width: "100%" }}
                    value={mark}
                    onChange={(value) => {
                      setMark(value);
                      axios.patch(
                        `${process.env.REACT_APP_API_URL}/items/charts/${chart.id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
                        {
                          id: chart.id,
                          mark: value,
                        }
                      );
                    }}
                  >
                    <Option value="line">Line</Option>
                    <Option value="rectY">Column</Option>
                    <Option value="dot">Scatter</Option>
                  </Select>
                </Col>
                <Col xs={12} sm={4}>
                  <label>Width</label>
                  <Select
                    value={cols}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      setCols(value);
                      axios.patch(
                        `${process.env.REACT_APP_API_URL}/items/charts/${chart.id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
                        {
                          id: chart.id,
                          cols: value,
                        }
                      );
                    }}
                  >
                    <Option value={8}>8</Option>
                    <Option value={12}>12</Option>
                    <Option value={24}>24</Option>
                  </Select>
                </Col>
                <Col xs={12} sm={4}>
                  <label>Y-Axis</label>
                  <Select
                    allowClear
                    value={y}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      if (value) {
                        setY(value);
                      } else {
                        setY("");
                      }
                      axios.patch(
                        `${process.env.REACT_APP_API_URL}/items/charts/${chart.id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
                        {
                          id: chart.id,
                          y: value || null,
                        }
                      );
                    }}
                  >
                    <Option value={"value"}>Value</Option>
                  </Select>
                </Col>
                <Col xs={12} sm={4}>
                  <label>Indicator</label>
                  <Select
                    value={indicator}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      setIndicator(value);
                      axios.patch(
                        `${process.env.REACT_APP_API_URL}/items/charts/${chart.id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
                        {
                          id: chart.id,
                          indicator: value,
                        }
                      );
                    }}
                  >
                    <Option value={"total_cost"}>Damage</Option>
                    <Option value={"total_loss"}>Loss</Option>
                    <Option value={"quantity"}>Quantity</Option>
                  </Select>
                </Col>
                <Col xs={12} sm={4}>
                  <label>Category</label>
                  <Select
                    allowClear
                    mode={"multiple"}
                    value={exclude}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      console.log(value);
                      if (value?.length) {
                        console.log("has value");
                        setHde("DEA");
                      } else {
                        console.log("no value");
                        setHde(null);
                      }
                      setExclude(value);
                      axios.patch(
                        `${process.env.REACT_APP_API_URL}/items/charts/${chart.id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
                        {
                          id: chart.id,
                          hde: value?.length ? "DEA" : null,
                          exclude: value,
                        }
                      );
                    }}
                  >
                    <Option value={"DEA"}>Deaths</Option>
                    <Option value={"INJ"}>Injuries</Option>
                    <Option value={"MIS"}>Missing</Option>
                  </Select>
                </Col>
                <Col xs={12} sm={4}>
                  <label>Group</label>
                  <Select
                    allowClear
                    value={group}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      if (value) {
                        setGroup(value);
                      } else {
                        setGroup("");
                      }
                      axios.patch(
                        `${process.env.REACT_APP_API_URL}/items/charts/${chart.id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
                        {
                          id: chart.id,
                          group: value || "",
                        }
                      );
                    }}
                  >
                    <Option value={"sector"}>Sector</Option>
                    <Option value={"hazard"}>Hazard</Option>
                    <Option value={"event"}>Event</Option>
                  </Select>
                </Col>
                <Col xs={12} sm={3}>
                  <label>Color</label>
                  <Select
                    style={{ width: "100%" }}
                    allowClear
                    value={color}
                    onChange={(value) => {
                      setColor(value);
                      axios.patch(
                        `${process.env.REACT_APP_API_URL}/items/charts/${chart.id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
                        {
                          id: chart.id,
                          color: value || null,
                        }
                      );
                    }}
                  >
                    <Option value={"#004f91"}>Blue</Option>
                    <Option value={"#00afae"}>Green</Option>
                    <Option value={"#962987"}>Purple</Option>
                    <Option value={"#eb752a"}>Orange</Option>
                  </Select>
                </Col>
                <Col xs={12} sm={4}>
                  <label>Height</label>
                  <Slider
                    value={height}
                    min={100}
                    max={2000}
                    step={5}
                    onChange={(value) => {
                      setHeight(value);
                    }}
                    onAfterChange={(value) => {
                      axios.patch(
                        `${process.env.REACT_APP_API_URL}/items/charts/${chart.id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
                        {
                          id: chart.id,
                          height: value,
                        }
                      );
                    }}
                  />
                </Col>
                <Col xs={12} sm={2}>
                  <label>Map</label>
                  <Switch
                    checked={map}
                    onChange={(value) => {
                      setMap(value);
                      axios.patch(
                        `${process.env.REACT_APP_API_URL}/items/charts/${chart.id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
                        {
                          id: chart.id,
                          map: value === true ? 1 : 0,
                        }
                      );
                    }}
                  />
                </Col>
              </Row>
            </div>
          )}
          <div ref={chartRef}></div>
        </div>
      </div>
    </Col>
  );
};

export { Chart };
