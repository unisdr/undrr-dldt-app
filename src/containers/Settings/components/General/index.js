import React, { useState, useEffect } from "react";
import "./style.css";
import { Button, message, Row, Col, Tag, Select, Table, Tabs } from "antd";
const { Option } = Select;

const General = () => {
  return (
    <>
      <div className="docs-page">
        <Row gutter={40}>
          <Col xs={24} sm={2}></Col>
          <Col xs={24} sm={22}>
            <p>Manage the settings for your Pumba instance.</p>
            <h2>Language</h2>
            <Select placeholder="Select" style={{ width: "300px" }}></Select>
            <h2>Time zone</h2>
            <Select placeholder="Select" style={{ width: "300px" }}></Select>
          </Col>
        </Row>
      </div>
    </>
  );
};

export { General };
