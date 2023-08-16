import React, { useState, useEffect } from "react";
import "./style.css";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { Row, Col, Input, Select, Button, Form, InputNumber } from "antd";
import axios from "axios";
const { Option } = Select;

const LossInputRow = (props) => {
  const { restField, name, onRemove, sectorId } = props;
  const [sectors, setSectors] = useState([]);
  const [losses, setLosses] = useState([]);
  const params = useParams();

  useEffect(() => {
    getSectors();
    if (sectorId) {
      getLoss();
    }
  }, []);

  useEffect(() => {
    getLoss();
  }, [sectorId]);

  const getSectors = () => {
    axios
      .get(
        `${window._env_.REACT_APP_API_URL}items/sectors?access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setSectors(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLosses = () => {
    axios
      .get(
        `${window._env_.REACT_APP_API_URL}/items/losses?access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setLosses(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLoss = () => {
    if (sectorId) {
      axios
        .get(
          `${window._env_.REACT_APP_API_URL}/items/losses?filter[_and][0][sector][_eq]=${sectorId}&access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
        )
        .then((res) => {
          setLosses(res.data?.data);
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
            <Form.Item {...restField} label={`Loss type`} name={[name, "loss"]}>
              <Select style={{ width: "100%" }} placeholder={"Select"}>
                {losses.map((item, index) => (
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

        <Col xs={24} md={6}>
          <div className="asset-field">
            <Form.Item
              {...restField}
              label={`Total loss`}
              name={[name, "total_loss"]}
            >
              <InputNumber placeholder={1000} style={{ width: "100%" }} />
            </Form.Item>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const LossInput = (props) => {
  const { sectorId } = props;
  return (
    <div className="asset-input">
      <h3>Losses</h3>
      <Form.List name="losses">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, restField }) => (
              <LossInputRow
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
                <Button onClick={() => add()}>Add Loss</Button>
              </Form.Item>
            </div>
          </>
        )}
      </Form.List>
    </div>
  );
};

export { LossInput };
