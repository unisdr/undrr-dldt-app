import React, { useState, useEffect } from "react";
import "./style.css";
import {
  CloseCircleOutlined,
  PaperClipOutlined,
  EnvironmentOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Input,
  Select,
  Button,
  Form,
  Tooltip,
  Modal,
  DatePicker,
  InputNumber,
} from "antd";
import axios from "axios";
import { MediaInput } from "../MediaInput";
import dayjs from "dayjs";
import { AimOutlined, InfoCircleOutlined } from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;

const DamageInputRow = (props) => {
  const { field, onRemove, sectorId, form } = props;
  const [sectors, setSectors] = useState([]);
  const [assets, setAssets] = useState([]);
  const [units, setUnits] = useState([]);
  const [damage, setDamage] = useState([]);
  const [showMediaDrawer, setShowMediaDrawer] = useState(false);
  const params = useParams();

  useEffect(() => {
    getSectors();
    getDamage();
    getAsset();
    getUnits();
    if (sectorId) {
      getAsset();
    }
  }, []);

  useEffect(() => {
    getAsset();
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

  const getUnits = () => {
    axios
      .get(
        `${window._env_.REACT_APP_API_URL}/items/units?access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setUnits(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAssets = () => {
    axios
      .get(
        `${window._env_.REACT_APP_API_URL}/items/assets?access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        console.log(res);
        setAssets(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAsset = () => {
    if (sectorId) {
      axios
        .get(
          `${window._env_.REACT_APP_API_URL}/items/assets?filter[_and][0][sector][_eq]=${sectorId}&access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
        )
        .then((res) => {
          setAssets(res.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getDamage = () => {
    axios
      .get(
        `${window._env_.REACT_APP_API_URL}/items/damage?access_token=${window._env_.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setDamage(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="asset-item">
      <CloseCircleOutlined
        onClick={() => onRemove()}
        className="delete-asset-item"
      />
      <Row gutter={10}>
        <Col xs={12} md={6}>
          <div className="asset-field">
            <Form.Item {...field} label={`asset`} name={[field.name, "asset"]}>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder={"Select"}
              >
                {assets.map((item, index) => (
                  <Option key={index} value={item.id}>
                    <>
                      <Tooltip
                        color={`#ffffff`}
                        overlayInnerStyle={{
                          color: "#555555",
                          fontSize: "11px",
                          padding: "20px",
                        }}
                        placement="topLeft"
                        title="Sed a ligula convallis, tincidunt nulla vitae, luctus ligula. Sed lorem ligula, eleifend quis commodo vitae, commodo et eros. Vivamus gravida urna at tincidunt convallis. Cras quis lectus turpis."
                      >
                        <InfoCircleOutlined />
                      </Tooltip>
                      &nbsp;&nbsp;{item.name}
                    </>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Col>
        <Col xs={12} md={3}>
          <div className="asset-field">
            <Form.Item
              {...field}
              label={`damage`}
              name={[field.name, "damage"]}
            >
              <Select style={{ width: "100%" }} placeholder={"Select"}>
                {damage.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Col>
        <Col xs={12} md={2}>
          <div className="asset-field">
            <Form.Item
              {...field}
              label={`Count`}
              name={[field.name, "quantity"]}
            >
              <InputNumber placeholder={10} style={{ width: "100%" }} />
            </Form.Item>
          </div>
        </Col>
        <Col xs={12} md={3}>
          <div className="asset-field">
            <Form.Item
              {...field}
              label={`Unit type`}
              name={[field.name, "unit"]}
            >
              <Select style={{ width: "100%" }} placeholder={"Select"}>
                {units.map((item, index) => (
                  <Option key={index} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Col>
        <Col xs={24} md={10}>
          <Row gutter={10}>
            <Col xs={12} md={12}>
              <div className="asset-field">
                <Form.Item
                  {...field}
                  label={`Unit cost`}
                  name={[field.name, "unit_cost"]}
                >
                  <InputNumber placeholder={100} style={{ width: "100%" }} />
                </Form.Item>
              </div>
            </Col>
            <Col xs={12} md={12}>
              <div className="asset-field">
                <Form.Item
                  {...field}
                  label={`Total cost`}
                  name={[field.name, "total_cost"]}
                >
                  <InputNumber placeholder={1000} style={{ width: "100%" }} />
                </Form.Item>
              </div>
            </Col>
            <Col xs={12} md={12}>
              <div className="asset-field">
                <Form.Item
                  {...field}
                  label={`Unit replacement cost`}
                  name={[field.name, "unit_rep_cost"]}
                >
                  <InputNumber placeholder={0} style={{ width: "100%" }} />
                </Form.Item>
              </div>
            </Col>
            <Col xs={12} md={12}>
              <div className="asset-field">
                <Form.Item
                  {...field}
                  label={`Total replacement cost`}
                  name={[field.name, "rep_cost"]}
                >
                  <InputNumber placeholder={0} style={{ width: "100%" }} />
                </Form.Item>
              </div>
            </Col>
            <Col xs={12} md={12}>
              <Form.Item
                {...field}
                label={`Unit recovery cost`}
                name={[field.name, "unit_recovery_cost"]}
              >
                <InputNumber placeholder={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={12} md={12}>
              <Form.Item
                {...field}
                label={`Total recovery cost`}
                name={[field.name, "recovery_cost"]}
              >
                <InputNumber placeholder={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col xs={24} sm={14}>
          <DatePicker value={dayjs("2023-05-04")} />{" "}
          <Button onClick={() => setShowMediaDrawer(true)}>
            <PaperClipOutlined />
            Media{" "}
            {form.getFieldValue(["assets", field.key, "media"])?.length > 0
              ? `(${
                  form.getFieldValue(["assets", field.key, "media"])?.length
                })`
              : ""}
          </Button>{" "}
          <Button
          //onClick={() => setShowMediaDrawer(true)}
          >
            <EnvironmentOutlined />
            Location
          </Button>{" "}
          <Button
          //onClick={() => setShowMediaDrawer(true)}
          >
            <FileOutlined />
            Source
          </Button>
        </Col>
      </Row>

      {/*}
    <Row gutter={10}>
    <Col xs={24} md={7}>
    <div className="asset-field">
      <Form.Item
        {...field}
        label={`Longitude`}
        name={[field.name, 'longitude']}
      >
        <Input />
      </Form.Item>
    </div>
    </Col>
    <Col xs={24} md={7}>
    <div className="asset-field">
      <Form.Item
        {...field}
        label={`Latitude`}
        name={[field.name, 'latitude']}
      >
        <Input />
      </Form.Item>
    </div>
    </Col>
    </Row>
     {*/}

      <Modal
        open={showMediaDrawer}
        onCancel={() => setShowMediaDrawer(false)}
        onOk={() => setShowMediaDrawer(false)}
      >
        <Form.List name={[field.name, "media"]}>
          {(attachemnts, { add, remove }) => (
            <Row gutter={10}>
              {attachemnts.map((attachment) => (
                <Col xs={24} md={24}>
                  <Form.Item {...attachment} name={[attachment.name, "file"]}>
                    <MediaInput
                      onChange={(value) => value}
                      onRemove={(name) => remove(attachment.name)}
                    />
                  </Form.Item>
                </Col>
              ))}
              <Button onClick={() => add()}>Add media</Button>
            </Row>
          )}
        </Form.List>
      </Modal>
    </div>
  );
};

const DamageInput = (props) => {
  const { sectorId, form } = props;
  return (
    <div className="asset-input">
      <h3>Damages</h3>
      <Form.List name="assets">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <DamageInputRow
                onRemove={() => {
                  remove(field.name);
                }}
                sectorId={sectorId}
                form={form}
                field={field}
              />
            ))}
            <div className="effect-input-footer">
              <Form.Item>
                <Button onClick={() => add()}>Add Damage</Button>
              </Form.Item>
            </div>
          </>
        )}
      </Form.List>
    </div>
  );
};

export { DamageInput };
