import React, { useState, useEffect } from "react";
import { Button, message, Select, Row, Col, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

const HazardsEmbed = () => {
  const location = useLocation();

  return (
    <div className="page-embed">
      <div className="iframe-wrapper">
        <div className="content">
          <iframe
            seamless
            scrolling="no"
            src='https://app.akuko.io/embed/bdb417ea-3644-4be4-ba8c-7d926d8b33a7?components=[null,"nac9lZtqhh","tuPqHldu17","5Yh0UngOuG","8jaYhZSqC6","Z5POKIDogh","tsoiNVCAgg","iUW6SMrWpl","2Ml7by4hAI","62VURmzItJ","jotV95PBQ7","NXvMImfmKx","zMzDQvaNE5","cUuXd7Hfof"]'
            style={{ border: "none" }}
            width="100%"
            height="6000"
          />
        </div>
      </div>
    </div>
  );
};

export { HazardsEmbed };
