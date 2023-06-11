import React, { useState, useEffect } from "react";
import "./style.css";
import { Nav } from "../../components/Nav";
import { Button, message, Row, Col, Tag, Select, Table, Menu } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

const Front = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="front-page">
      <div className="front-section front-section-1">
        <div className="content">
          <div className="box">
            <h2>Welcome to the future of disaster loss and damage tracking</h2>
            <p>We are building a new DLDT tracking system</p>
            <Link to="/data/records">Explore the DLDT prototype</Link>
          </div>
        </div>
      </div>
      <div className="front-section front-section-2">
        <div className="content">
          <Row gutter={20}>
            <Col sm={2} xs={24}></Col>
            <Col sm={14} xs={24}>
              <p>
                The new Disaster Loss Damage Tracking (DLDT) application is a
                robust system designed to capture, analyze, and visualize data
                related to disasters and their impacts. It serves as a
                comprehensive platform for tracking and managing information
                about losses, damages, and effects caused by various hazards.
                DLDT enables users to efficiently record and catalog these
                effects, associate them with specific events and hazards, and
                generate meaningful insights to support disaster risk management
                and response efforts. With its user-friendly interface,
                customizable analytics, and integration capabilities, DLDT
                empowers organizations and countries to effectively assess,
                monitor, and address the consequences of disasters.
              </p>
              <h2>About this prototype</h2>
              <p>
                The DLDT prototype is an early-stage version of the Disaster
                Loss Damage Tracking system, designed to demonstrate the
                envisioned functionality and features of the final application.
                Although the prototype may not encompass the full range of
                intended capabilities, it provides a tangible representation of
                key aspects such as data entry, visualization, and basic
                analysis. The prototype serves as a valuable tool for
                stakeholders to visualize the user interface, interact with
                simulated functionality, and provide feedback on the overall
                design and user experience. By using the prototype, stakeholders
                can actively participate in the development process,
                contributing insights and suggestions to shape the future
                direction of DLDT. The prototype acts as a foundation for
                further refinement and development, helping to ensure that the
                final application aligns with the needs and requirements of
                users and stakeholders.
              </p>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export { Front };
