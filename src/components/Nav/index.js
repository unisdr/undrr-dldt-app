import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";
import {
  SettingOutlined,
  ExportOutlined,
  QuestionCircleOutlined,
  UserAddOutlined,
  UserOutlined,
  AppstoreOutlined,
  EyeOutlined,
  InfoOutlined,
  HomeOutlined,
  BlockOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";
import logo from "./logo.png";
import { Menu } from "antd";

const Nav = () => {
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${window._env_.REACT_APP_API_URL}/items/settings?access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setSettings(res.data.data);
      });
  }, []);

  return (
    <div className="nav">
      <div className="content">
        <Link className="brand" to="/">
          <span className="icon">DLDT</span>
        </Link>
        <Link to="/" className="instance-flag">
          Flag
        </Link>
        <Link to="/" className="instance-name">
          {settings.app_name || "Disasterland"}
        </Link>
        <Menu
          mode="horizontal"
          className="main-menu"
          expandIcon={<EyeOutlined />}
          items={[
            {
              label: (
                <Link to="/data/records">
                  <AppstoreOutlined /> Data
                </Link>
              ),
              key: "data",
            },
            {
              label: (
                <Link to="/dashboard/55">
                  <EyeOutlined /> Analysis
                </Link>
              ),
              key: "analysis",
            },
            {
              label: (
                <Link to="/about/general">
                  <QuestionCircleOutlined /> About
                </Link>
              ),
              key: "About",
            },
            {
              label: (
                <Link to="/settings/general">
                  <SettingOutlined /> Settings
                </Link>
              ),
              key: "Settings",
            },
            {
              label: (
                <Link to="/">
                  <UserOutlined /> My Account
                </Link>
              ),
              key: "account",
            },
          ]}
        />
        {/*}
      <Link className="settings-link" to="/settings"><SettingOutlined /> Settings</Link>
      {*/}
      </div>
    </div>
  );
};

export { Nav };
