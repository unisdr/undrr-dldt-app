import React, { useEffect, useState, Fragment } from "react";
import "./style.css";
import { DamageInput } from "../../../../components/DamageInput";
import { LossInput } from "../../../../components/LossInput";
import { DisruptionInput } from "../../../../components/DisruptionInput";
import { HumanInput } from "../../../../components/HumanInputs";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { PushpinOutlined } from "@ant-design/icons";
import {
  Input,
  InputNumber,
  Form,
  Button,
  Select,
  Row,
  Col,
  DatePicker,
  Popover,
  Cascader,
  TreeSelect,
  message,
} from "antd";
import dayjs from "dayjs";
const { Option } = Select;
const { TextArea } = Input;

const Record = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState(params.id);
  const [record, setRecord] = useState({});
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState([]);
  const [effects, setEffects] = useState([]);
  const [losses, setLosses] = useState([]);
  const [disruptions, setDisruptions] = useState([]);
  const [humanEffects, setHumanEffects] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [events, setEvents] = useState([]);
  const [countries, setCountries] = useState([]);
  const [causes, setCauses] = useState([]);
  const [eventId, setEventId] = useState();
  const [countryId, setCountryId] = useState("DL");
  const [sectorId, setSectorId] = useState();
  const [form] = Form.useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
    getRecord(params.id);
    getRecordForm();
    getCountries();
    getCauses();
    getSectors();
  }, []);

  useEffect(() => {
    getEvents();
    getRegions();
  }, [countryId]);

  useEffect(() => {
    if (record.country) {
      setCountryId(record.country);
    }
    if (record.effects) {
      getEffects(record.effects);
    }
    if (record.event) {
      setEventId(record.event);
    }
  }, [record]);

  useEffect(() => {
    form.resetFields();
  }, [record, effects, losses, disruptions, humanEffects]);

  const getEffects = (ids) => {
    const promises = [];
    ids.forEach((id) => {
      promises.push(getEffect(id));
    });
    Promise.all(promises).then((res) => {
      const array = [];
      res.forEach((item) => {
        const row = item.data.data;
        const mediaIds = [];
        row.media?.forEach((attachment) => mediaIds.push({ file: attachment }));
        array.push({
          id: row.id,
          country: row.country,
          region: row.region,
          district: row.district,
          hazard: row.hazard,
          sector: row.sector,
          asset: row.asset,
          loss: row.loss,
          type: row.type || "damage",
          disruption: row.disruption,
          human_effect: row.human_effect,
          human_effect_primary_category: row.human_effect_primary_category,
          human_effect_secondary_category: row.human_effect_secondary_category,
          damage: row.damage,
          quantity: row.quantity,
          unit: row.unit,
          unit_cost: row.unit_cost,
          total_cost: row.total_cost,
          unit_rep_cost: row.unit_rep_cost,
          rep_cost: row.rep_cost,
          total_loss: row.total_loss,
          unit_recovery_cost: row.unit_recovery_cost,
          recovery_cost: row.recovery_cost,
          longitude: row.longitude,
          latitude: row.latitude,
          date: row.date,
          media: mediaIds,
        });
      });
      const sort = array.sort((a, b) => a.id - b.id);
      const damages = sort.filter((a) => a.type === "damage");
      const losses = sort.filter((a) => a.type === "loss");
      const disruptions = sort.filter((a) => a.type === "disruption");
      const humanEffects = sort.filter((a) => a.type === "human_effect");
      /*
      const orderdHumanEffects = [];
      humanEffects.forEach((item) => {
        if (item.human_effect === 'DEA') {
          orderdHumanEffects.push(item);
        }
      })
      humanEffects.forEach((item) => {
        if (item.human_effect === 'MIS') {
          orderdHumanEffects.push(item);
        }
      })
      humanEffects.forEach((item) => {
        if (item.human_effect === 'INJ') {
          orderdHumanEffects.push(item);
        }
      })
      humanEffects.forEach((item) => {
        if (item.human_effect === 'DIS') {
          orderdHumanEffects.push(item);
        }
      })
      humanEffects.forEach((item) => {
        if (item.human_effect === 'ADS') {
          orderdHumanEffects.push(item);
        }
      })
      */
      setEffects(damages);
      setLosses(losses);
      setDisruptions(disruptions);
      setHumanEffects(humanEffects);
    });
  };

  const getRecord = (id) => {
    if (id) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/items/records/${id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
        )
        .then((res) => {
          setRecord(res.data?.data);
          setSectorId(res.data.data.sector);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getEffect = (id) => {
    return axios
      .get(
        `${process.env.REACT_APP_API_URL}/items/effects/${id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
      )
      .catch((err) => {
        console.log(err);
      });
  };

  const getCountries = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/items/countries?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        setCountries(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEvents = () => {
    if (countryId) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/items/events?filter[_and][0][country][_eq]=${countryId}&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
        )
        .then((res) => {
          setEvents(res.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getCauses = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/items/hazards?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        console.log(res);
        setCauses(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRegions = () => {
    if (countryId) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/items/regions?filter[_and][0][country][_eq]=${countryId}&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
        )
        .then((res) => {
          const obj = {};
          const array = [];
          res.data?.data.forEach((item) => {
            if (obj[item.level]) {
              obj[item.level].push({
                label: item.name,
                value: item.code,
                parent: item.parent,
              });
            } else {
              obj[item.level] = [
                {
                  label: item.name,
                  value: item.code,
                  parent: item.parent,
                },
              ];
            }
          });
          obj[1].forEach((item) => {
            const children = obj[2].filter((row) => row.parent === item.value);
            array.push({
              label: item.label,
              value: item.value,
              children: children,
            });
          });
          setRegions(array);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getSectors = () => {
    if (countryId) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/items/sectors?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
        )
        .then((res) => {
          const array = [];
          const children = res.data?.data.filter((row) => row.level === 2);
          res.data?.data.forEach((item) => {
            if (item.level === 1) {
              if (item.id === "AGR") {
                array.push({
                  label: item.name,
                  value: item.id,
                  children: children.map((child) => {
                    return { label: child.name, value: child.id };
                  }),
                });
              } else {
                array.push({
                  label: item.name,
                  value: item.id,
                });
              }
            }
          });
          setSectors(array);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getRecordForm = () => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/fields/records?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
      )
      .then((res) => {
        const items = res.data?.data;
        const sort = items.sort((a, b) => a?.meta.sort - b?.meta.sort);
        setFields(sort);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const submitRecordForm = (data) => {
    if (!record.uuid) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/items/records?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
          data
        )
        .then((res) => {
          message.success("Record saved");
          navigate("/data/records");
          setLoading(false);
        })
        .catch((err) => {
          message.error("Error");
          console.log(err);
          setLoading(false);
        });
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/items/records/${data.uuid}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
          data
        )
        .then((res) => {
          message.success("Record saved");
          navigate("/data/records");
          setLoading(false);
        })
        .catch((err) => {
          message.error("Error");
          console.log(err);
          setLoading(false);
        });
    }
  };

  const submitEffect = (data) => {
    if (!data.uuid) {
      return axios
        .post(
          `${process.env.REACT_APP_API_URL}/items/effects?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
          data
        )
        .catch((err) => {
          message.error("Error saving Asset");
          console.log(err);
        });
    } else {
      // console.log(`update effect ${data.uuid} row...`);
      return axios
        .patch(
          `${process.env.REACT_APP_API_URL}/items/effects/${data.id}?access_token=${process.env.REACT_APP_ACCESS_TOKEN}`,
          data
        )
        .catch((err) => {
          message.error("Error updating Asset");
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="content">
          {params.id ? <h1>Record #DL0000-00</h1> : <h1>New Record</h1>}
        </div>
      </div>
      <div className="page">
        <div className="record">
          <Form
            form={form}
            layout="vertical"
            scrollToFirstError={true}
            initialValues={{
              uuid: record?.uuid,
              title: record?.title,
              country: record?.country,
              date: dayjs(record?.date || dayjs()),
              sector: ["CAA", "LIV", "FIS", "AQU"].some((id) =>
                record.sector?.includes(id)
              )
                ? ["AGR", record.sector]
                : record.sector,
              region: record?.region,
              event: record?.event,
              hazard: record?.hazard,
              duration: record?.duration,
              district: record?.district,
              human_effects: humanEffects,
              assets: effects,
              losses: losses,
              disruptions: disruptions,
            }}
            onValuesChange={(values) => {
              //console.log(values)
              if (values.sector === "HDE") {
                /*
                console.log('hde is selected')
                form.setFieldValue(['human_effects', 0, 'human_effect'], 'DEA');
                form.setFieldValue(['human_effects', 0, 'human_effect_primary_category'], 'MLE');
                form.setFieldValue(['human_effects', 0, 'human_effect_secondary_category'], 'CHL');
                form.setFieldValue(['human_effects', 1, 'human_effect'], 'DEA');
                form.setFieldValue(['human_effects', 1, 'human_effect_secondary_category'], 'ADL');
                form.setFieldValue(['human_effects', 1, 'human_effect_primary_category'], 'FEM');
                */
              }
              if (values?.assets?.length > 0) {
                values.assets.forEach((item, index) => {
                  if (item.unit_cost) {
                    const count = form.getFieldValue([
                      "assets",
                      index,
                      "quantity",
                    ]);
                    const cost = item.unit_cost;
                    const total = count * cost;
                    form.setFieldValue(
                      ["assets", index, "total_cost"],
                      total || 0
                    );
                  }
                  if (item.quantity) {
                    const count = item.quantity;
                    const cost = form.getFieldValue([
                      "assets",
                      index,
                      "unit_cost",
                    ]);
                    const unit_repair_cost = form.getFieldValue([
                      "assets",
                      index,
                      "unit_rep_cost",
                    ]);
                    const total_cost = count * cost;
                    const repair_cost = count * unit_repair_cost;
                    form.setFieldValue(
                      ["assets", index, "total_cost"],
                      total_cost || 0
                    );
                    form.setFieldValue(
                      ["assets", index, "rep_cost"],
                      repair_cost || 0
                    );
                  }
                  if (item.unit_rep_cost) {
                    const count = form.getFieldValue([
                      "assets",
                      index,
                      "quantity",
                    ]);
                    const cost = item.unit_rep_cost;
                    const total = count * cost;
                    form.setFieldValue(
                      ["assets", index, "rep_cost"],
                      total || 0
                    );
                  }
                });
              }
            }}
            onFinish={(values) => {
              // submit effects and build array of ids
              setLoading(true);

              const promises = [];
              if (values.assets?.length > 0) {
                values?.assets.forEach((item) => {
                  const mediaIds = [];
                  item.media?.forEach((attachment) =>
                    mediaIds.push(attachment.file)
                  );
                  promises.push(
                    submitEffect({
                      ...item,
                      country: "DL",
                      region: values.region,
                      date: values.date,
                      hazard: "FL",
                      sector:
                        values.sector.length > 1
                          ? values.sector[1]
                          : values.sector[0],
                      event: values.event,
                      type: "damage",
                      media: mediaIds,
                    })
                  );
                });
              }

              if (values.losses?.length > 0) {
                values?.losses.forEach((item) => {
                  promises.push(
                    submitEffect({
                      ...item,
                      country: "DL",
                      region: values.region,
                      date: values.date,
                      sector:
                        values.sector.length > 1
                          ? values.sector[1]
                          : values.sector[0],
                      hazard: "FL",
                      event: values.event,
                      type: "loss",
                    })
                  );
                });
              }

              if (values.disruptions?.length > 0) {
                values?.disruptions.forEach((item) => {
                  promises.push(
                    submitEffect({
                      ...item,
                      country: "DL",
                      region: values.region,
                      date: values.date,
                      sector:
                        values.sector.length > 1
                          ? values.sector[1]
                          : values.sector[0],
                      hazard: values.hazard,
                      event: values.event,
                      type: "disruption",
                    })
                  );
                });
              }

              if (values.human_effects?.length > 0) {
                values?.human_effects.forEach((item) => {
                  promises.push(
                    submitEffect({
                      ...item,
                      country: "DL",
                      region: values.region,
                      date: values.date,
                      sector:
                        values.sector.length > 1
                          ? values.sector[1]
                          : values.sector[0],
                      hazard: values.hazard,
                      event: values.event,
                      type: "human_effect",
                    })
                  );
                });
              }

              Promise.all(promises).then((res) => {
                const effectIds = [];
                res?.forEach((item) => {
                  effectIds.push(item?.data?.data?.uuid);
                });

                // submit record with damage and loss ids
                const data = {
                  title: values.title,
                  country: "DL",
                  date: values.date,
                  sector:
                    values.sector.length > 1
                      ? values.sector[1]
                      : values.sector[0],
                  region: values.region,
                  district: values.district,
                  event: values.event,
                  hazard: values.hazard,
                  duration: values.duration,
                  effects: effectIds,
                };
                if (record.uuid) {
                  data.uuid = record.uuid;
                }
                submitRecordForm(data);
                // form.resetFields();
              });
            }}
          >
            <div className="record-form">
              <Row gutter={15}>
                {id && (
                  <Col xs={24} md={6}>
                    <Form.Item label={"UUID"} key={"uuid"} name={"uuid"}>
                      <Input disabled />
                    </Form.Item>
                  </Col>
                )}
                <Col xs={24} md={6}>
                  <Form.Item label={"event"} key={"event"} name={"event"}>
                    <Select
                      allowClear
                      showSearch
                      style={{ width: "100%" }}
                      placeholder={"Select"}
                      onChange={(value) => {
                        setEventId(value);
                      }}
                    >
                      {events.map((item, index) => (
                        <Option key={index} value={item.uuid}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                {!eventId && (
                  <>
                    <Col xs={24} md={5}>
                      <Form.Item
                        label={"hazard"}
                        key={"hazard"}
                        name={"hazard"}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          optionFilterProp="children"
                          filterOption={(input, option) => {
                            return (
                              option.children
                                ?.toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            );
                          }}
                          style={{ width: "100%" }}
                          placeholder={"Select"}
                        >
                          {causes.map((item, index) => (
                            <Option key={index} value={item.id}>
                              {item.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={4}>
                      <Form.Item
                        label={"Record date"}
                        key={"date"}
                        name={"date"}
                      >
                        <DatePicker style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={3}>
                      <Form.Item
                        label={"duration"}
                        key={"duration"}
                        name={"duration"}
                      >
                        <InputNumber
                          placeholder={"days"}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}
                {eventId && (
                  <>
                    <Col xs={24} md={6}>
                      <Form.Item
                        label={"Event Glide Number"}
                        key={"glide"}
                        name={"glide"}
                      >
                        <Input disabled placeholder="FL-2022-000270-PAK" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={6}>
                      <Form.Item
                        label={"National Event ID"}
                        key={"national_id"}
                        name={"national_id"}
                      >
                        <Input disabled placeholder="DL-0000-00000-000" />
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Row>
              {eventId && (
                <Row gutter={10}>
                  <Col xs={24} md={7}>
                    <Form.Item
                      label={"Event hazard"}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        disabled
                        style={{ width: "100%" }}
                        placeholder={"Flood"}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={3}>
                    <Form.Item
                      label={"Event date"}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input disabled placeholder={"2023-04-22"} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={7}>
                    <Form.Item
                      label={"hazard"}
                      key={"hazard"}
                      name={"hazard"}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => {
                          return (
                            option.children
                              ?.toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          );
                        }}
                        style={{ width: "100%" }}
                        placeholder={"Select"}
                      >
                        {causes.map((item, index) => (
                          <Option key={index} value={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={4}>
                    <Form.Item label={"Record date"} key={"date"} name={"date"}>
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={3}>
                    <Form.Item
                      label={"duration"}
                      key={"duration"}
                      name={"duration"}
                    >
                      <InputNumber
                        placeholder={"days"}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              )}

              <Row gutter={20}>
                <Col xs={24} sm={18}>
                  <Form.Item
                    label={"Select region"}
                    key={"region"}
                    name={"region"}
                  >
                    <TreeSelect
                      placeholder="Type to search..."
                      showSearch
                      filterOption={(input, option) => {
                        return option?.children
                          .toLowerCase()
                          .includes(input.toLowerCase());
                      }}
                      treeNodeFilterProp="label"
                      treeData={regions}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={10}>
                <Col xs={24}>
                  <h2>
                    Effects
                    {record.effects?.length > 0 && (
                      <> ({record.effects.length})</>
                    )}
                  </h2>
                </Col>
                <Col xs={24} md={10}>
                  <Form.Item
                    label={"sector"}
                    key={"sector"}
                    name={"sector"}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Cascader
                      showSearch
                      options={sectors}
                      onChange={(values) => {
                        if (values.length === 2) {
                          setSectorId(values[1]);
                        } else {
                          setSectorId(values[0]);
                        }
                      }}
                    />
                  </Form.Item>
                </Col>

                {sectorId !== "HDE" && (
                  <Col xs={24}>
                    <div className="damage-input">
                      <DamageInput
                        sectorId={sectorId || record?.sector}
                        form={form}
                      />
                    </div>
                  </Col>
                )}

                {sectorId === "EDU" && (
                  <Col xs={24}>
                    <div className="disruption-input">
                      <DisruptionInput sectorId={sectorId || record?.sector} />
                    </div>
                  </Col>
                )}

                {sectorId !== "HDE" && (
                  <Col xs={24}>
                    <div className="losses-input">
                      <LossInput sectorId={sectorId || record?.sector} />
                    </div>
                  </Col>
                )}

                {sectorId === "HDE" && (
                  <Col xs={24}>
                    <div className="losses-input">
                      <HumanInput sectorId={sectorId || record?.sector} />
                    </div>
                  </Col>
                )}
              </Row>

              <Row gutter={20}>
                <Col xs={24} md={16}>
                  <div style={{ marginTop: "40px" }}>
                    <Form.Item label={"Comments"} key={"title"} name={"title"}>
                      <TextArea rows={6} />
                    </Form.Item>
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div style={{ marginTop: "40px" }}>
                    <Form.Item label={"Status"} key={"status"} name={"status"}>
                      <Select placeholder="Draft">
                        <Option value="draft">Draft</Option>
                        <Option value="published">Published</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="record-form-footer">
              <Row>
                <Col xs={24}>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    disabled={loading}
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export { Record };
