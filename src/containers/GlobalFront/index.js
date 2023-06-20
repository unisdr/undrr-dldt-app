import React, { useState, useEffect } from "react";
import "./style.css";
import { Nav } from "../../components/Nav";
import { Button, message, Row, Col, Tag, Tooltip, Select, Tabs, Table, Menu } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import damageChart from './damage-chart.png';
import hazardChart from './hazard-chart.png';
import sectorChart from './sector-chart.png';

const GlobalFront = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const statusColor = {
    draft: '#F4E496',
    published: '#0A696A',
  }
  
  const StatusTable = () => {
  return (
  <Table
  dataSource={[
    { edit: 'edit', effects: 2, uuid: '523ad310-dd02-443a-b69f-81e55d39b662', user: 'elisapetak@disasterland.gov', status: 'draft' , updated: '06-13-23 08:52'},
    { edit: 'edit', effects: 1, uuid: '523ad310-dd02-443a-b69f-81e55d39b662', user: 'elisapetak@disasterland.gov', status: 'draft' , updated: '06-13-23 11:22'},
    { edit: 'edit', effects: 3, uuid: '523ad310-dd02-443a-b69f-81e55d39b662', user: 'elisapetak@disasterland.gov', status: 'draft' , updated: '06-13-23 08:52'},
    { edit: 'edit', effects: 4, uuid: '523ad310-dd02-443a-b69f-81e55d39b662', user: 'elisapetak@disasterland.gov', status: 'draft' , updated: '06-13-23 11:22'},
    { edit: 'edit', effects: 2, uuid: '523ad310-dd02-443a-b69f-81e55d39b662', user: 'elisapetak@disasterland.gov', status: 'draft' , updated: '06-13-23 08:52'},
    { edit: 'edit', effects: 2, uuid: '523ad310-dd02-443a-b69f-81e55d39b662', user: 'elisapetak@disasterland.gov', status: 'draft' , updated: '06-13-23 11:22'},
  ]}
  columns={[{
    key: 'status',
    dataIndex: 'status',
    title: 'Status',
    render: (value) => {
        return (
        <Tooltip title={ value }>
          {} <div 
            style={{ background: statusColor[value] }} 
            className="status-circle">
            { value }
          </div>
        </Tooltip>
        )
    }
  },
  {
    dataIndex: "region",
    title: "Region",
    key: "region",
    render: () => (<Tag color="green">DL32</Tag>)
  },
  {
    key: 'updated',
    dataIndex: 'updated',
    title: 'Updated'
  },
  { key: 'user',
    dataIndex: 'user',
    title: 'Last edit',
    render: (value) => (<><UserOutlined /> {value} </>)
  },
  {
    key: 'sector',
    dataIndex: 'sector',
    title: 'Sector',
    render: (value) => ( <Tag color="blue">Water & Sanitation</Tag>)
  },
  {
    key: 'event',
    dataIndex: 'event',
    title: 'Event',
    render: (value) => ( <Tag color="orange">LS-2015-11-07-DL41</Tag>)
  },
  {
    key: 'effects',
    dataIndex: 'effects',
    title: 'Effects',
  },
  {
    key: 'edit',
    title: 'Edit',
    dataIndex: 'uuid',
    render: (value) => (<Link to={ `/record/${value}` }>Edit</Link>)
  }]}
/>
)}

  return (
    <div className="front-page front-page-global">
      <div className="front-section">
        <div className="content">
      
        
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
                        <div className="big-number">
                          7.23B
                        </div>
                        <div className="component-text">Total Damage</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={4}>
                    <div className="card">
                      <div className="content">
                        <div className="big-number">
                          8.82B
                        </div>
                        <div className="component-text">Total Loss</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={4}>
                    <div className="card">
                      <div className="content">
                        <div className="big-number">
                          10.22B
                        </div>
                        <div className="component-text">Recovery Need</div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
    
    <Row gutter={20}>
       <Col xs={24} sm={6}>
        <h2>Welcome</h2>
        <p className="small">
        The new Disaster Loss Damage Tracking (DLDT) application is a robust system designed to capture, analyze, and visualize data related to disasters and their impacts. It serves as a comprehensive platform for tracking and managing information about losses, damages, and effects caused by various hazards.
        </p>
       </Col>
      <Col xs={24} sm={9}>
      <h2>Sectors</h2>
      <img src={sectorChart} />
      </Col>
      <Col xs={24} sm={9}>
      <h2>Hazards</h2>
       <img src={hazardChart} />
      </Col>
      <Col xs={24} sm={10}>
      <h2>Recent Events</h2>
      <Table
  dataSource={[
    { edit: 'edit', effects: 2, uuid: '523ad310-dd02-443a-b69f-81e55d39b662', user: 'elisapetak@disasterland.gov', status: 'draft' , updated: '06-13-23 08:52'},
    { edit: 'edit', effects: 1, uuid: '523ad310-dd02-443a-b69f-81e55d39b662', user: 'elisapetak@disasterland.gov', status: 'draft' , updated: '06-13-23 11:22'},
    { edit: 'edit', effects: 3, uuid: '523ad310-dd02-443a-b69f-81e55d39b662', user: 'elisapetak@disasterland.gov', status: 'draft' , updated: '06-13-23 08:52'},
    { edit: 'edit', effects: 4, uuid: '523ad310-dd02-443a-b69f-81e55d39b662', user: 'elisapetak@disasterland.gov', status: 'draft' , updated: '06-13-23 11:22'},
    { edit: 'edit', effects: 2, uuid: '523ad310-dd02-443a-b69f-81e55d39b662', user: 'elisapetak@disasterland.gov', status: 'draft' , updated: '06-13-23 08:52'},
    { edit: 'edit', effects: 2, uuid: '523ad310-dd02-443a-b69f-81e55d39b662', user: 'elisapetak@disasterland.gov', status: 'draft' , updated: '06-13-23 11:22'},
  ]}
  columns={[
  {
    dataIndex: "region",
    title: "Region",
    key: "region",
    render: () => (<Tag color="orange">Event name FL-3401</Tag>)
  },{
    dataIndex: "hazard",
    title: "Hazard",
    key: "hazard",
    render: () => (<Tag color="purple">Coastal Flood</Tag>)
  },{
    dataIndex: "loss",
    title: "Loss",
    key: "loss",
    render: () => (<>22M</>)
  },{
    dataIndex: "damage",
    title: "Damage",
    key: "damage",
    render: () => (<>12M</>)
  }]
 }
  />
      </Col>
      <Col xs={24} sm={14}>
      <h2>Explore</h2>
       <div className="map"></div>
      </Col>
      <Col xs={24} sm={24}>
      <h2>Loss by Year</h2>
        <img src={damageChart} />
      </Col>
    </Row>
        
       
        </div>
      </div>
    </div>
  );
};

export { GlobalFront };
