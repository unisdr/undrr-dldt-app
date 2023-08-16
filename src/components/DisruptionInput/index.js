import React, { useState, useEffect } from "react";
import "./style.css";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { Row, Col, Input, Select, Button, Form, InputNumber } from "antd";
import axios from "axios";
const { Option } = Select;

const DisruptionInputRow = (props) => {
  const { restField, name, onRemove, sectorId } = props;
  const [sectors, setSectors] = useState([]);
  const [disruptions, setDisruptions] = useState([]);
  const params = useParams();

  useEffect(() => {
    getSectors();
    if (sectorId) {
      getDisruption();
    }
  }, []);

  useEffect(() => {
    getDisruption();
  }, [sectorId]);

  const getSectors = () => {
    axios
      .get(
        `${window._env_.REACT_APP_API_URL}/items/sectors?access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setSectors(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDisruptions = () => {
    axios
      .get(
        `${window._env_.REACT_APP_API_URL}/items/disruptions?access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setDisruptions(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDisruption = () => {
    if (sectorId) {
      axios
        .get(
          `${window._env_.REACT_APP_API_URL}/items/disruptions?filter[_and][0][sector][_eq]=${sectorId}&access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
        )
        .then((res) => {
          setDisruptions(res.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="asset-item">
      <CloseCircleOutlined
        onClick={() => onRemove()}
        className="delete-asset-item"
      />
      <Row gutter={15}>
        <Col xs={24} md={14}>
          <div className="asset-field">
            <Form.Item
              {...restField}
              label={`Disruption type`}
              name={[name, "disruption"]}
            >
              <Select style={{ width: "100%" }} placeholder={"Select"}>
                {disruptions.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Col>
        {/*}
    <Col xs={24} md={4}>
    <div className="asset-field">
      <Form.Item
        {...restField}
        label={`damage`}
        name={[name, 'damage']}
        rules={[
        { required: true }
        ]}
      >
      <Select 
        style={{ width: "100%" }}
        placeholder={'Select'}
        >
        {damage.map((item, index) => (
          <Option key={index} value={item.id}>
            {item.name}
          </Option>
        ))}
      </Select>
      </Form.Item>
    </div>
    </Col>
        {*/}

        <Col xs={24} md={5}>
          <div className="asset-field">
            <Form.Item
              {...restField}
              label={`People Affected`}
              name={[name, "quantity"]}
            >
              <InputNumber placeholder={100} style={{ width: "100%" }} />
            </Form.Item>
          </div>
        </Col>
        <Col xs={24} md={4}>
          <div className="asset-field">
            <Form.Item
              {...restField}
              label={`Duration`}
              name={[name, "cost_total"]}
            >
              <InputNumber placeholder={1000} style={{ width: "100%" }} />
            </Form.Item>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const DisruptionInput = (props) => {
  const { sectorId } = props;
  return (
    <div className="asset-input">
      <h3>Disruptions</h3>
      <Form.List name="disruptions">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, restField }) => (
              <DisruptionInputRow
                onRemove={() => {
                  remove(name);
                }}
                key={key}
                name={name}
                sectorId={sectorId}
                restField={restField}
              />
            ))}
            <div className="effect-input-footer">
              <Form.Item>
                <Button onClick={() => add()}>Add Disruption</Button>
              </Form.Item>
            </div>
          </>
        )}
      </Form.List>
    </div>
  );
};

export { DisruptionInput };
