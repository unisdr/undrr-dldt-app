import React, { useState, useEffect } from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import "./style.css";
import logo from "./logo.png";
import { Row, Col, Input, Select, Button, Form, InputNumber } from "antd";
import footerImage from "./footer.png";

const GlobalFooter = (props) => {
  return (
    <div className="global-footer">
      <img style={{ width: "100%" }} src={footerImage} />
    </div>
  );
};

export { GlobalFooter };
