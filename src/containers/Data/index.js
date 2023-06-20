import React, { useState, useEffect } from "react";
import "./style.css";
import { Nav } from "../../components/Nav";
import { Button, message, Row, Col, Tag, Select, Table, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { Records } from "./components/Records";
import { Events } from "./components/Events";
import { Baseline } from "./components/Baseline";
import { Import } from "./components/Import";
import { Export } from "./components/Export";
const { Option } = Select;

const Data = () => {
  const [records, setRecords] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState();
  const [events, setEvents] = useState([]);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="content">
          <h1>Data</h1>
        </div>
      </div>
      <div className="page">
        <div className="dashboard">
          <Menu
            mode="horizontal"
            items={[
              {
                label: <Link to="/data/records">Record List</Link>,
                key: "records",
              },
              {
                label: <Link to="/data/events">Events</Link>,
                key: "events",
              },
              {
                label: <Link to="/data/baseline">Baseline</Link>,
                key: "baseline",
              },
              {
                label: <Link to="/data/import">Import</Link>,
                key: "import",
              },
              {
                label: <Link to="/data/export">Export</Link>,
                key: "export",
              },
            ]}
          />
          {location.pathname === "/data/records" && <Records />}
          {location.pathname === "/data/events" && <Events />}
          {location.pathname === "/data/baseline" && <Baseline />}
          {location.pathname === "/data/import" && <Import />}
          {location.pathname === "/data/export" && <Export />}
        </div>
      </div>
    </>
  );
};

export { Data };
