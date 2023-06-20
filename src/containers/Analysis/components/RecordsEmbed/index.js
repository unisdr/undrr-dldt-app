import React, { useState, useEffect } from "react";
import { Button, message, Select, Row, Col, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const RecordsEmbed = () => {
  const location = useLocation();

  return (
    <div className="page-embed">
      <div className="iframe-wrapper">
        <div className="content">
          <iframe
            seamless
            scrolling="no"
            src='https://app.akuko.io/embed/130911da-6da8-4ed4-99ab-0aab686507ad?components=[null,"H0NUqI4vlA","lqvUQmRBRh","Y9QqqS2oak","FpeGLy8XgM","4djN2oH0gt","v09ogwnV7e"]'
            style={{ border: "none" }}
            width="100%"
            height="2400"
          />
        </div>
      </div>
    </div>
  );
};

export { RecordsEmbed };
