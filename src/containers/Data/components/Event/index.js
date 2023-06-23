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

const Event = () => {
  const [events, setEvent] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    //getEvents();
  }, []);

  const getEvent = () => {
    axios
      .get(
        `${window._env_.REACT_APP_API_URL}/items/events?access_token=${window._env_.REACT_APP_ACCESS_TOKEN}}`
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
          <h1>New Event</h1>
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
                  <Input placeholder="Event name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item
                  name="national_id"
                  key={"nation_id"}
                  label={"National Event ID"}
                >
                  <Input placeholder="National Event ID" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item name="glide" key={"glide"} label={"GLIDE Number"}>
                  <Input placeholder="GLIDE number" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item
                  name="date"
                  key={"date"}
                  label={"Date"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Event date"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item
                  name="duration"
                  key={"duration"}
                  label={"Duration"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber placeholder="Days" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item
                  name="country"
                  key={"country"}
                  label={"Country"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Select country"></Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item
                  name="hazard"
                  key={"hazard"}
                  label={"Hazard"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Select hazard"></Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={6}>
                <Form.Item name="source" key={"source"} label={"Source"}>
                  <Select placeholder="WMO"></Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="event" key={"event"} label={"Related Event"}>
                  <Select showSearch placeholder="Type to search..."></Select>
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
              <Button size="large" htmlType="submit" type="primary">
                Submit
              </Button>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export { Event };
