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
            src='https://app.akuko.io/embed/11c07cb2-1ef7-4963-9df8-fa4737a10873?components=[null,"1TXXZkwqt6","l5NfkYC0dt","zT3VcyWWt9","xsTFAoQsPk","62VURmzItJ","stn07kWudw","jotV95PBQ7","aavza9Z11X","NXvMImfmKx","zMzDQvaNE5","pQaPSk3qPR","BmhmHXWb1u","B0yiwxqYCN","8jaYhZSqC6","5Yh0UngOuG","nac9lZtqhh"]'
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
