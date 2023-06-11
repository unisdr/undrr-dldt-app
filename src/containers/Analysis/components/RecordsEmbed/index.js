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
            src='https://app.akuko.io/embed/787c6654-c707-4779-9bc8-70ca797a314c?components=[null,"H0NUqI4vlA","lqvUQmRBRh","Y9QqqS2oak","FpeGLy8XgM","4djN2oH0gt","v09ogwnV7e"]'
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
