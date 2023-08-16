import React, { useState, useEffect } from "react";
import "./style.css";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { Row, Col, Input, Select, Button, Form, InputNumber } from "antd";
import axios from "axios";
const { Option } = Select;

const HumanInputRow = (props) => {
  const { restField, name, onRemove, sectorId } = props;
  const [sectors, setSectors] = useState([]);
  const [humanEffects, setHumanEffects] = useState([]);
  const [humanEffectsFilter1, setHumanEffectsFilter1] = useState([]);
  const [humanEffectsFilter2, setHumanEffectsFilter2] = useState([]);
  const [group1, setGroup1] = useState();
  const [group2, setGroup2] = useState();
  const params = useParams();

  useEffect(() => {
    getHumanEffects();
  }, []);

  useEffect(() => {
    getHumanEffectsGroup1(2, group1);
  }, [group1]);

  useEffect(() => {
    getHumanEffectsGroup2(3, group2);
  }, [group2]);

  const getHumanEffects = () => {
    axios
      .get(
        `${window._env_.REACT_APP_API_URL}/items/human_effects?access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        const sort = res.data.data.sort((a, b) =>
          a.group.localeCompare(b.group)
        );
        setHumanEffects(sort);
        setHumanEffectsFilter1(sort);
        setHumanEffectsFilter2(sort);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getHumanEffectsGroup1 = (level, group) => {
    if (level && group) {
      axios
        .get(
          `${window._env_.REACT_APP_API_URL}/items/human_effects?filter[_and][0][level][_eq]=${level}&filter[_and][1][group][_eq]=${group}&access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
        )
        .then((res) => {
          const sort = res.data.data.sort((a, b) =>
            a.group.localeCompare(b.group)
          );
          setHumanEffectsFilter1(sort);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getHumanEffectsGroup2 = (level, group) => {
    if (level && group) {
      axios
        .get(
          `${window._env_.REACT_APP_API_URL}/items/human_effects?filter[_and][0][level][_eq]=${level}&filter[_and][1][group][_eq]=${group}&access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
        )
        .then((res) => {
          const sort = res.data.data.sort((a, b) =>
            a.group.localeCompare(b.group)
          );
          setHumanEffectsFilter2(sort);
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
        <Col xs={24}>
          <h3>Deaths</h3>
        </Col>
        <Col xs={6}>
          <b>Deaths</b>
          <Form.Item {...restField} label={`Total`} name={[name, "total"]}>
            <InputNumber placeholder="0" />
          </Form.Item>
        </Col>
        <Col xs={6}>
          <b>By Sex</b>
          <Form.Item {...restField} label={`Female`} name={[name, "female"]}>
            <InputNumber placeholder="0" />
          </Form.Item>
          <Form.Item {...restField} label={`Male`} name={[name, "Male"]}>
            <InputNumber placeholder="0" />
          </Form.Item>
        </Col>
        <Col xs={6}>
          <b>By Age</b>
          <Form.Item
            {...restField}
            label={`Children (0-14)`}
            name={[name, "_"]}
          >
            <InputNumber placeholder="0" />
          </Form.Item>
          <Form.Item {...restField} label={`Adult (15-54)`} name={[name, "_"]}>
            <InputNumber placeholder="0" />
          </Form.Item>
          <Form.Item {...restField} label={`Elder (65+)`} name={[name, "_"]}>
            <InputNumber placeholder="0" />
          </Form.Item>
        </Col>
        <Col xs={6}>
          <b>Other disagregation</b>
          <Form.Item
            {...restField}
            label={`With disabilties`}
            name={[name, "_"]}
          >
            <InputNumber placeholder="0" />
          </Form.Item>
          <Form.Item
            {...restField}
            label={`Below poverty line`}
            name={[name, "_"]}
          >
            <InputNumber placeholder="0" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={15}>
        <Col xs={24}>
          <h3>Missing</h3>
        </Col>
        <Col xs={6}>
          <b>Missing</b>
          <Form.Item {...restField} label={`Total`} name={[name, "total"]}>
            <InputNumber placeholder="0" />
          </Form.Item>
        </Col>
        <Col xs={6}>
          <b>By Sex</b>
          <Form.Item {...restField} label={`Female`} name={[name, "female"]}>
            <InputNumber placeholder="0" />
          </Form.Item>
          <Form.Item {...restField} label={`Male`} name={[name, "Male"]}>
            <InputNumber placeholder="0" />
          </Form.Item>
        </Col>
        <Col xs={6}>
          <b>By Age</b>
          <Form.Item
            {...restField}
            label={`Children (0-14)`}
            name={[name, "_"]}
          >
            <InputNumber placeholder="0" />
          </Form.Item>
          <Form.Item {...restField} label={`Adult (15-54)`} name={[name, "_"]}>
            <InputNumber placeholder="0" />
          </Form.Item>
          <Form.Item {...restField} label={`Elder (65+)`} name={[name, "_"]}>
            <InputNumber placeholder="0" />
          </Form.Item>
        </Col>
        <Col xs={6}>
          <b>Other disagregation</b>
          <Form.Item
            {...restField}
            label={`With disabilties`}
            name={[name, "_"]}
          >
            <InputNumber placeholder="0" />
          </Form.Item>
          <Form.Item
            {...restField}
            label={`Below poverty line`}
            name={[name, "_"]}
          >
            <InputNumber placeholder="0" />
          </Form.Item>
        </Col>
      </Row>
    </div>
  );
};

const HumanInput = (props) => {
  const { sectorId } = props;
  return (
    <div className="asset-input">
      <h3>Human direct effects</h3>

      <Form.List name="human_effects">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, restField }) => (
              <HumanInputRow
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
                <Button onClick={() => add()}>Add Effect</Button>
              </Form.Item>
            </div>
          </>
        )}
      </Form.List>
    </div>
  );
};

export { HumanInput };
