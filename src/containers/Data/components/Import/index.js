import React, { useState, useEffect } from "react";
import "./style.css";
import { Nav } from "../../../../components/Nav";
import { Button, message, Row, Col, Tag, Select, Table, Tabs } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { DownloadOutlined } from "@ant-design/icons";
const { Option } = Select;

const Import = () => {
  const [records, setRecords] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="import-page">
        <Row gutter={30}>
          <Col sm={2} xs={24}></Col>
          <Col sm={18} xs={24}>
            <p>
              {" "}
              The DLDT allows you to easily import your data into the system for
              comprehensive disaster tracking and analysis. You can import data
              in CSV format, which provides a flexible and widely supported file
              format for storing tabular data.
            </p>
            <Button htmlType="button">
              <DownloadOutlined /> Download import template
            </Button>
            <div
              style={{
                background: "#f9f9f9",
                padding: "40px",
                margin: "20px 0",
              }}
            >
              <input type="file" />
            </div>
            <p>To get started, follow these steps:</p>
            <ul>
              <li>
                Prepare your data: Ensure your data is organized in a CSV file
                format with the required columns and data structure. Refer to
                the provided data import template for guidance and consistency.
              </li>
              <li>
                Download the template: If you need a template to structure your
                data correctly, click on the "Download Template" button below.
                The template will provide a pre-defined structure with the
                necessary column headers.
              </li>
              <li>
                Fill in your data: Open the downloaded template in a spreadsheet
                editor or any text editor that supports CSV files. Populate the
                template with your actual data, ensuring the data is accurate
                and complete.
              </li>
              <li>
                Upload your data: Once you have prepared your data, click on the
                "Upload Data" button to select and upload your CSV file. The
                system will process the file and import the data into the DLDT
                prototype.
              </li>
            </ul>

            <Button type="primary" size="large" htmlType="button">
              Import data
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export { Import };
