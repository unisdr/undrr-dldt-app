import React, { useState, useEffect } from "react";
import { Button, message, Select, Row, Col, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const EventsEmbed = () => {
  const location = useLocation();

  return (
    <div className="page-embed">
      <div className="iframe-wrapper">
        <div className="content">
          <iframe
            seamless
            scrolling="no"
            src='https://app.akuko.io/embed/bdc5f22f-8c83-4015-982d-e6b453b44b85?components=[null,"nac9lZtqhh","5Yh0UngOuG","8jaYhZSqC6","B0yiwxqYCN","cUuXd7Hfof","iUW6SMrWpl","zMzDQvaNE5","aavza9Z11X","NXvMImfmKx","jotV95PBQ7","62VURmzItJ","stn07kWudw","xsTFAoQsPk","zT3VcyWWt9","l5NfkYC0dt"]'
            style={{ border: "none" }}
            width="100%"
            height="4000"
          />
        </div>
      </div>
    </div>
  );
};

export { EventsEmbed };
