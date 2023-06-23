import React, { useState, useEffect } from "react";
import "./style.css";
import { Nav } from "../../components/Nav";
import {
  Button,
  message,
  Row,
  Col,
  Tag,
  Tooltip,
  Select,
  Tabs,
  Table,
  Menu,
} from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import damageChart from "./damage-chart.png";
import hazardChart from "./hazard-chart.png";
import sectorChart from "./sector-chart.png";
import sectorsDamage from "./sectors-damage.png";
import lossChart from "./loss-chart.png";
import damageEvents from "./damage-events.png";
import damageHazards from "./damage-hazards.png";
import lossHazards from "./loss-hazards.png";
import damageSectors from "./damage-sectors.png";
const { TabPane } = Tabs;

const GlobalFront = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const statusColor = {
    draft: "#F4E496",
    published: "#0A696A",
  };

  const StatusTable = () => {
    return (
      <Table
        dataSource={[
          {
            edit: "edit",
            effects: 2,
            uuid: "523ad310-dd02-443a-b69f-81e55d39b662",
            user: "elisapetak@disasterland.gov",
            status: "draft",
            updated: "06-13-23 08:52",
          },
          {
            edit: "edit",
            effects: 1,
            uuid: "523ad310-dd02-443a-b69f-81e55d39b662",
            user: "elisapetak@disasterland.gov",
            status: "draft",
            updated: "06-13-23 11:22",
          },
          {
            edit: "edit",
            effects: 3,
            uuid: "523ad310-dd02-443a-b69f-81e55d39b662",
            user: "elisapetak@disasterland.gov",
            status: "draft",
            updated: "06-13-23 08:52",
          },
          {
            edit: "edit",
            effects: 4,
            uuid: "523ad310-dd02-443a-b69f-81e55d39b662",
            user: "elisapetak@disasterland.gov",
            status: "draft",
            updated: "06-13-23 11:22",
          },
          {
            edit: "edit",
            effects: 2,
            uuid: "523ad310-dd02-443a-b69f-81e55d39b662",
            user: "elisapetak@disasterland.gov",
            status: "draft",
            updated: "06-13-23 08:52",
          },
          {
            edit: "edit",
            effects: 2,
            uuid: "523ad310-dd02-443a-b69f-81e55d39b662",
            user: "elisapetak@disasterland.gov",
            status: "draft",
            updated: "06-13-23 11:22",
          },
        ]}
        columns={[
          {
            key: "status",
            dataIndex: "status",
            title: "Status",
            render: (value) => {
              return (
                <Tooltip title={value}>
                  {}{" "}
                  <div
                    style={{ background: statusColor[value] }}
                    className="status-circle"
                  >
                    {value}
                  </div>
                </Tooltip>
              );
            },
          },
          {
            dataIndex: "region",
            title: "Region",
            key: "region",
            render: () => <Tag color="green">DL32</Tag>,
          },
          {
            key: "updated",
            dataIndex: "updated",
            title: "Updated",
          },
          {
            key: "user",
            dataIndex: "user",
            title: "Last edit",
            render: (value) => (
              <>
                <UserOutlined /> {value}{" "}
              </>
            ),
          },
          {
            key: "sector",
            dataIndex: "sector",
            title: "Sector",
            render: (value) => <Tag color="blue">Water & Sanitation</Tag>,
          },
          {
            key: "event",
            dataIndex: "event",
            title: "Event",
            render: (value) => <Tag color="orange">LS-2015-11-07-DL41</Tag>,
          },
          {
            key: "effects",
            dataIndex: "effects",
            title: "Effects",
          },
          {
            key: "edit",
            title: "Edit",
            dataIndex: "uuid",
            render: (value) => <Link to={`/record/${value}`}>Edit</Link>,
          },
        ]}
      />
    );
  };

  return (
    <div className="front-page front-page-global">
      <div className="front-section">
        <div className="content">
          <p className="intro">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <div className="summary-cards">
            <Row gutter={20}>
              <Col xs={24} sm={4}>
                <div className="card">
                  <div className="content">
                    <div className="big-number">892M</div>
                    <div className="component-text">People Affected</div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={4}>
                <div className="card">
                  <div className="content">
                    <div className="big-number">172</div>
                    <div className="component-text">Events</div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={4}>
                <div className="card">
                  <div className="content">
                    <div className="big-number">862k</div>
                    <div className="component-text">Records Submitted</div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={4}>
                <div className="card">
                  <div className="content">
                    <div className="big-number">7.23B</div>
                    <div className="component-text">Total Damage</div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={4}>
                <div className="card">
                  <div className="content">
                    <div className="big-number">8.82B</div>
                    <div className="component-text">Total Loss</div>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={4}>
                <div className="card">
                  <div className="content">
                    <div className="big-number">10.22B</div>
                    <div className="component-text">Recovery Need</div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <Row gutter={20}>
            <Col xs={24} sm={24}>
              <h2>Damage</h2>
              <img src={damageChart} />
              <p className="caption">
                Nulla sem sapien, congue vel arcu vitae, euismod elementum quam.
                Nullam tincidunt auctor tincidunt. Cras eu eros sed odio aliquam
                pellentesque. Cras eu vestibulum lectus. Ut ut pretium sem.
                Maecenas orci felis, posuere quis cursus elementum, imperdiet ac
                nibh. Aliquam euismod, nunc at consectetur blandit, libero leo
                vehicula turpis, at aliquam urna urna aliquam nisl. Aliquam
                pharetra nunc mauris, at pretium nisi elementum eget.
              </p>
            </Col>

            <Col xs={24} sm={24}>
              <h2>Losses</h2>
              <img src={lossChart} />
              <p className="caption">
                Nulla sem sapien, congue vel arcu vitae, euismod elementum quam.
                Nullam tincidunt auctor tincidunt. Cras eu eros sed odio aliquam
                pellentesque. Cras eu vestibulum lectus. Ut ut pretium sem.
                Maecenas orci felis, posuere quis cursus elementum, imperdiet ac
                nibh. Aliquam euismod, nunc at consectetur blandit, libero leo
                vehicula turpis, at aliquam urna urna aliquam nisl. Aliquam
                pharetra nunc mauris, at pretium nisi elementum eget.
              </p>
            </Col>

            <Col xs={24} sm={24}>
              <h2>Explore</h2>
              <Tabs>
                <TabPane tab="Damage" key="1"></TabPane>
                <TabPane tab="Losses" key="2"></TabPane>
                <TabPane tab="Deaths" key="3"></TabPane>
                <TabPane tab="Injured" key="4"></TabPane>
                <TabPane tab="Displaced" key="5"></TabPane>
              </Tabs>
              <div className="map"></div>
              <p className="caption">
                Nulla sem sapien, congue vel arcu vitae, euismod elementum quam.
                Nullam tincidunt auctor tincidunt. Cras eu eros sed odio aliquam
                pellentesque. Cras eu vestibulum lectus. Ut ut pretium sem.
                Maecenas orci felis, posuere quis cursus elementum, imperdiet ac
                nibh. Aliquam euismod, nunc at consectetur blandit, libero leo
                vehicula turpis, at aliquam urna urna aliquam nisl. Aliquam
                pharetra nunc mauris, at pretium nisi elementum eget.
              </p>
            </Col>

            <Col xs={24} sm={24}>
              <h2>Events</h2>
              <Tabs>
                <TabPane tab="Damage" key="1"></TabPane>
                <TabPane tab="Losses" key="2"></TabPane>
              </Tabs>
              <img src={damageEvents} />
              <p className="caption">
                Nulla sem sapien, congue vel arcu vitae, euismod elementum quam.
                Nullam tincidunt auctor tincidunt. Cras eu eros sed odio aliquam
                pellentesque. Cras eu vestibulum lectus. Ut ut pretium sem.
                Maecenas orci felis, posuere quis cursus elementum, imperdiet ac
                nibh. Aliquam euismod, nunc at consectetur blandit, libero leo
                vehicula turpis, at aliquam urna urna aliquam nisl. Aliquam
                pharetra nunc mauris, at pretium nisi elementum eget.
              </p>
            </Col>

            <Col xs={24} sm={24}>
              <h2>Hazards</h2>
              <Tabs activeKey="2">
                <TabPane tab="Damage" key="1"></TabPane>
                <TabPane tab="Losses" key="2"></TabPane>
              </Tabs>
              <img src={lossHazards} />
              <p className="caption">
                Nulla sem sapien, congue vel arcu vitae, euismod elementum quam.
                Nullam tincidunt auctor tincidunt. Cras eu eros sed odio aliquam
                pellentesque. Cras eu vestibulum lectus. Ut ut pretium sem.
                Maecenas orci felis, posuere quis cursus elementum, imperdiet ac
                nibh. Aliquam euismod, nunc at consectetur blandit, libero leo
                vehicula turpis, at aliquam urna urna aliquam nisl. Aliquam
                pharetra nunc mauris, at pretium nisi elementum eget.
              </p>
            </Col>

            <Col xs={24} sm={24}>
              <h2>Sectors</h2>
              <Tabs>
                <TabPane tab="Damage" key="1"></TabPane>
                <TabPane tab="Losses" key="2"></TabPane>
              </Tabs>
              <img src={damageSectors} />
              <p className="caption">
                Nulla sem sapien, congue vel arcu vitae, euismod elementum quam.
                Nullam tincidunt auctor tincidunt. Cras eu eros sed odio aliquam
                pellentesque. Cras eu vestibulum lectus. Ut ut pretium sem.
                Maecenas orci felis, posuere quis cursus elementum, imperdiet ac
                nibh. Aliquam euismod, nunc at consectetur blandit, libero leo
                vehicula turpis, at aliquam urna urna aliquam nisl. Aliquam
                pharetra nunc mauris, at pretium nisi elementum eget.
              </p>
            </Col>

            <Col xs={24} sm={24}>
              <Table
                dataSource={[
                  {
                    edit: "edit",
                    effects: 2,
                    uuid: "523ad310-dd02-443a-b69f-81e55d39b662",
                    user: "elisapetak@disasterland.gov",
                    status: "draft",
                    updated: "06-13-23 08:52",
                  },
                  {
                    edit: "edit",
                    effects: 1,
                    uuid: "523ad310-dd02-443a-b69f-81e55d39b662",
                    user: "elisapetak@disasterland.gov",
                    status: "draft",
                    updated: "06-13-23 11:22",
                  },
                  {
                    edit: "edit",
                    effects: 3,
                    uuid: "523ad310-dd02-443a-b69f-81e55d39b662",
                    user: "elisapetak@disasterland.gov",
                    status: "draft",
                    updated: "06-13-23 08:52",
                  },
                  {
                    edit: "edit",
                    effects: 4,
                    uuid: "523ad310-dd02-443a-b69f-81e55d39b662",
                    user: "elisapetak@disasterland.gov",
                    status: "draft",
                    updated: "06-13-23 11:22",
                  },
                  {
                    edit: "edit",
                    effects: 2,
                    uuid: "523ad310-dd02-443a-b69f-81e55d39b662",
                    user: "elisapetak@disasterland.gov",
                    status: "draft",
                    updated: "06-13-23 08:52",
                  },
                  {
                    edit: "edit",
                    effects: 2,
                    uuid: "523ad310-dd02-443a-b69f-81e55d39b662",
                    user: "elisapetak@disasterland.gov",
                    status: "draft",
                    updated: "06-13-23 11:22",
                  },
                ]}
                columns={[
                  {
                    dataIndex: "region",
                    title: "Region",
                    key: "region",
                    render: () => "Event name FL-3401",
                  },
                  {
                    dataIndex: "hazard",
                    title: "Hazard",
                    key: "hazard",
                    render: () => "Coastal Flood",
                  },
                  {
                    dataIndex: "start_date",
                    title: "Date",
                    key: "date",
                    render: () => "16 Jun, '23",
                  },
                  {
                    dataIndex: "loss",
                    title: "Loss",
                    key: "loss",
                    render: () => <>22M</>,
                  },
                  {
                    dataIndex: "damage",
                    title: "Damage",
                    key: "damage",
                    render: () => <>12M</>,
                  },
                  {
                    dataIndex: "recovery",
                    title: "Recovery need",
                    key: "recovery",
                    render: () => <>32M</>,
                  },
                  {
                    dataIndex: "view",
                    title: "",
                    key: "view",
                    render: () => <Button>View profile</Button>,
                  },
                ]}
              />
              <p className="caption">
                Nulla sem sapien, congue vel arcu vitae, euismod elementum quam.
                Nullam tincidunt auctor tincidunt. Cras eu eros sed odio aliquam
                pellentesque. Cras eu vestibulum lectus. Ut ut pretium sem.
                Maecenas orci felis, posuere quis cursus elementum, imperdiet ac
                nibh. Aliquam euismod, nunc at consectetur blandit, libero leo
                vehicula turpis, at aliquam urna urna aliquam nisl. Aliquam
                pharetra nunc mauris, at pretium nisi elementum eget.
              </p>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export { GlobalFront };
