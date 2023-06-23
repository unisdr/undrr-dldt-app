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
        `https://pumba-api.onalabs.org/items/human_effects?access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
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
          `https://pumba-api.onalabs.org/items/human_effects?filter[_and][0][level][_eq]=${level}&filter[_and][1][group][_eq]=${group}&access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
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
          `https://pumba-api.onalabs.org/items/human_effects?filter[_and][0][level][_eq]=${level}&filter[_and][1][group][_eq]=${group}&access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
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
    <div className="hde-item">
      <CloseCircleOutlined
        onClick={() => onRemove()}
        className="delete-asset-item"
      />
      <Row gutter={5}>
        <Col xs={24} md={7}>
          <div className="asset-field">
            <Form.Item {...restField} name={[name, "human_effect"]}>
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder={"Select"}
                onChange={(value, e) => {
                  setGroup1(e["data-group"]);
                }}
              >
                {humanEffects?.map(
                  (item) =>
                    item.level === 1 && (
                      <Option
                        key={item.id}
                        data-group={item.group}
                        value={item.id}
                      >
                        {item.name}
                      </Option>
                    )
                )}
              </Select>
            </Form.Item>
          </div>
        </Col>
        {humanEffectsFilter1.length > 0 && (
          <Col xs={24} md={6}>
            <div className="asset-field">
              <Form.Item
                {...restField}
                name={[name, "human_effect_primary_category"]}
              >
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder={"Select"}
                  onFocus={() => {
                    // filter options
                    console.log("select");
                  }}
                  onChange={(value, e) => {
                    setGroup2(e["data-group"]);
                  }}
                >
                  {humanEffectsFilter1?.map(
                    (item) =>
                      item.level === 2 && (
                        <Option
                          key={item.id}
                          data-group={item.group}
                          value={item.id}
                        >
                          {item.name}
                        </Option>
                      )
                  )}
                </Select>
              </Form.Item>
            </div>
          </Col>
        )}
        {humanEffectsFilter2.length > 0 && (
          <Col xs={24} md={6}>
            <div className="asset-field">
              <Form.Item
                {...restField}
                name={[name, "human_effect_secondary_category"]}
              >
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder={"Select"}
                  onFocus={() => {
                    // filter options
                    console.log("select");
                  }}
                >
                  {humanEffectsFilter2?.map(
                    (item) =>
                      item.level === 3 && (
                        <Option
                          key={item.id}
                          data-group={item.group}
                          value={item.id}
                        >
                          {item.name}
                        </Option>
                      )
                  )}
                </Select>
              </Form.Item>
            </div>
          </Col>
        )}

        <Col xs={24} md={4}>
          <div className="asset-field">
            <Form.Item {...restField} name={[name, "quantity"]}>
              <InputNumber placeholder={100} style={{ width: "100%" }} />
            </Form.Item>
          </div>
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
