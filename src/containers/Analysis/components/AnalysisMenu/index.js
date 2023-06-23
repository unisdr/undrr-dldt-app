import React, { useState, useEffect } from "react";
import { Button, message, Select, Row, Col, Menu } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const AnalysisMenu = () => {
  const [dashboardsMenu, setDashboardsMenu] = useState([]);

  const addDashboard = () => {
    axios
      .post(
        `${window._env_.REACT_APP_API_URL}/items/dashboards?access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`,
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
        `${window._env_.REACT_APP_API_URL}/items/dashboards?access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        const array = [];
        /*
        array.push(
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
          },
          {
            key: "Records",
            label: <Link to={`/analysis/records`}>Records</Link>,
          },
        );
        */
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
        setDashboardsMenu(array.sort((a, b) => a.key - b.key));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDashboards();
  }, []);

  return (
    <div>
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
        </div>
      </div>
    </div>
  );
};

export { AnalysisMenu };
