import React, { useState, useEffect } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import "./style.css";
import logo from "./logo.png";
import { Row, Col, Input, Select, Button, Form, InputNumber } from "antd";

const GlobalHeader = (props) => {
  return (
    <div className="global-header">
      <div className="color-bar color-bar-red"></div>
      <div className="color-bar color-bar-purple"></div>
      <div className="color-bar color-bar-green"></div>
      <div className="color-bar color-bar-orange"></div>
      <div className="menu">
        <div className="content">
          <a className="brand" href="#">
            <img alt="UNDRR" className="undrr-logo" src={logo} />
          </a>
        </div>
      </div>
    </div>
  );
};

export { GlobalHeader };
