import React, { useState, useEffect } from "react";
import "./style.css";
import { Nav } from "../../components/Nav";
import { Button, message, Select, Row, Col, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { Intro } from "./components/Intro";
import { Docs } from "./components/Docs";
import { Help } from "./components/Help";

const { Option } = Select;

const About = () => {
  const location = useLocation();
  return (
    <>
      <div className="page-header">
        <div className="content">
          <h1>About</h1>
        </div>
      </div>
      <div className="page">
        <div className="dashboard">
          <Menu
            mode="horizontal"
            items={[
              {
                label: <Link to="/about/general">General</Link>,
                key: "about",
              },
              {
                label: <Link to="/about/docs">Docs</Link>,
                key: "docs",
              },
              {
                label: <Link to="/about/help">Help</Link>,
                key: "help",
              },
            ]}
          />
          {location.pathname === "/about/general" && <Intro />}
          {location.pathname === "/about/docs" && <Docs />}
          {location.pathname === "/about/help" && <Help />}
        </div>
      </div>
    </>
  );
};

export { About };
