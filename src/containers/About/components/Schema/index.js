import React, { useState, useEffect } from "react";
import "./style.css";
import { Button, message, Row, Col, Tag, Select, Table, Tabs } from "antd";
const { Option } = Select;

const Schema = () => {
  return (
    <>
      <div className="docs-page">
        <Row gutter={30}>
          <Col sm={24} xs={24}>
            Schema
          </Col>
        </Row>
      </div>
    </>
  );
};

export { Schema };
