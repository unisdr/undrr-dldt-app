import React, { useState, useEffect } from "react";
import "./style.css";
import { Nav } from "../../components/Nav";
import { Button, message, Select, Row, Col, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { General } from "./components/General/";
import { Maps } from "./components/Maps/";
import { Assets } from "./components/Assets";
import { Units } from "./components/Units";
import { Damage } from "./components/Damage";
import { Regions } from "./components/Regions";
import { Users } from "./components/Users";
import { Translations } from "./components/Translations";

const Settings = () => {
  const location = useLocation();

  return (
    <>
      <div className="page-header">
        <div className="content">
          <h1>Settings</h1>
        </div>
      </div>
      <div className="page">
        <div className="dashboard">
          <Menu
            mode="horizontal"
            items={[
              {
                label: <Link to="/settings/general">General</Link>,
                key: "general",
              },
              {
                label: <Link to="/settings/users">Users</Link>,
                key: "users",
              },
              {
                label: <Link to="/settings/regions">Regions</Link>,
                key: "regions",
              },
              {
                label: <Link to="/settings/assets">Assets</Link>,
                key: "assets",
              },
              {
                label: <Link to="/settings/units">Units</Link>,
                key: "units",
              },
              {
                label: <Link to="/settings/damage">Damage</Link>,
                key: "damage",
              },
              {
                label: <Link to="/settings/maps">Maps</Link>,
                key: "maps",
              },
              {
                label: <Link to="/settings/translation">Translations</Link>,
                key: "translation",
              },
            ]}
          />
          {location.pathname === "/settings/general" && <General />}
          {location.pathname === "/settings/users" && <Users />}
          {location.pathname === "/settings/regions" && <Regions />}
          {location.pathname === "/settings/assets" && <Assets />}
          {location.pathname === "/settings/units" && <Units />}
          {location.pathname === "/settings/damage" && <Damage />}
          {location.pathname === "/settings/maps" && <Maps />}
          {location.pathname === "/settings/translation" && <Translations />}
        </div>
      </div>
    </>
  );
};

export { Settings };
