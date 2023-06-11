import React, { useState, useEffect } from "react";
import "./style.css";
import { Nav } from "../../../../components/Nav";
import {
  Button,
  message,
  Row,
  Col,
  Tag,
  Select,
  Table,
  Tabs,
  Transfer,
} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { DownloadOutlined } from "@ant-design/icons";
const { Option } = Select;

const Export = () => {
  const [effects, setEffects] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fields = [
    "type",
    "hazard",
    "asset",
    "event",
    "admin_1",
    "admin_2",
    "admin_3",
    "admin_4",
    "admin_5",
    "damage",
    "unit",
    "unit_cost",
    "total_cost",
    "unit_loss",
    "total_loss",
    "disruption",
    "human_effect",
    "date",
  ];

  const effectFields = [];
  fields.forEach((item, index) => {
    effectFields.push({
      key: item,
      title: `${item}`,
      description: `description ${item} -- ${index}`,
      chosen: index % 2 === 0,
    });
  });

  return (
    <>
      <div className="export-page">
        <Row gutter={30}>
          <Col sm={2} xs={24}></Col>
          <Col sm={18} xs={24}>
            <p>
              The DLDT allows you to easily export your data for further
              analysis, reporting, or sharing with other stakeholders. You can
              export your data in CSV format, which provides a widely supported
              and versatile file format for data interchange.
            </p>
            <div style={{ padding: "40px", background: "#f9f9f9" }}>
              <Transfer
                showSearch
                dataSource={effectFields}
                render={(item) => item.title}
              />
            </div>
            <p>To export your data, follow these steps:</p>
            <ul>
              <li>
                Select the data: Choose the specific data subset or criteria you
                want to export. You can filter and customize the data based on
                various parameters such as time period, hazard type,
                geographical region, or any other relevant attributes.
              </li>
              <li>
                Choose export format: Click on the "Export Data" button and
                select the CSV format from the available options. CSV format
                ensures compatibility with popular spreadsheet applications and
                data analysis tools.
              </li>
              <li>
                Download your data: After selecting the export format, the
                system will process your request and generate the CSV file
                containing the requested data. Once the export is complete,
                click on the "Download Data" button to save the file to your
                local device.
              </li>
            </ul>

            <Button type="primary" size="large" htmlType="button">
              Export data
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export { Export };
