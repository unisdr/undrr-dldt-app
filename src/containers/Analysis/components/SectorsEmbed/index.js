import React, { useState, useEffect } from "react";
import { Button, message, Select, Row, Col, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const SectorsEmbed = () => {
  const location = useLocation();

  return (
    <div className="page-embed">
      <div className="iframe-wrapper">
        <div className="content">
          <iframe
            seamless
            scrolling="no"
            src='https://app.akuko.io/embed/99fa0d81-c535-48c2-8da8-c4bdd49e0831?components=[null,"nac9lZtqhh","5Yh0UngOuG","8jaYhZSqC6","Z5POKIDogh","jotV95PBQ7","62VURmzItJ","zMzDQvaNE5","8jp89l9ULn","NXvMImfmKx","AAqNpVChsn","g5jCl2HdNP","2Ml7by4hAI"]'
            style={{ border: "none" }}
            width="100%"
            height="6000"
          />
        </div>
      </div>
    </div>
  );
};

export { SectorsEmbed };
