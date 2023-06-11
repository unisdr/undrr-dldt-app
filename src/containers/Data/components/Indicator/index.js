import React, { useState, useEffect } from "react";
import "./style.css";
import {
  Button,
  message,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Tag,
  Select,
  Table,
} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
const { Option } = Select;
const { TextArea } = Input;

const Indicator = () => {
  const [events, setEvent] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    //getEvents();
  }, []);

  const getEvent = () => {
    axios
      .get(
        `https://pumba-api.onalabs.org/items/events?access_token=lviMHwju7tCCBelqMMs609fcErQ7rdYY`
      )
      .then((res) => {
        setEvent(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
        message.error("Error");
      });
  };

  return (
    <>
      <div className="page-header">
        <div className="content">
          <h1>New Indicator</h1>
        </div>
      </div>
      <div className="page">
        <div className="event-form">
          <Form form={form} layout="vertical" initialValues={{}}>
            <Row gutter={20}>
              <Col xs={24} sm={6}>
                <Form.Item
                  name="name"
                  key={"name"}
                  label={"Name"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Event name" size="large" />
                </Form.Item>
              </Col>

              <Col xs={24} sm={6}>
                <Form.Item
                  name="year"
                  key={"year"}
                  label={"Year"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Event date"
                    size="large"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={6}>
                <Form.Item name="source" key={"source"} label={"Source"}>
                  <Select size="large" placeholder="OCHA"></Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={6}>
                <Form.Item
                  name="admin_level"
                  key={"admin_level"}
                  label={"Admin level"}
                >
                  <Select size="large" placeholder="Admin 2"></Select>
                </Form.Item>
              </Col>

              <Col xs={24} sm={24}>
                <Form.Item
                  name="upload"
                  key={"upload"}
                  label={"File"}
                  help={"Select a CSV file with the indicator data."}
                >
                  <input type="file" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24}>
                <Form.Item
                  name="description"
                  key={"description"}
                  label={"Description"}
                >
                  <TextArea rows={10} />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24}>
                <Button size="large" htmlType="submit" type="primary">
                  Upload
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export { Indicator };
