import React, { useState, useEffect } from "react";
import "./style.css";
import { Nav } from "../../components/Nav";
import { Button, message, Row, Col, Tag, Tooltip, Select, Tabs, Table, Menu } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import damageChart from './damage-chart.png';

const Front = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const statusColor = {
    draft: '#F4E496',
    published: '#0A696A',
  }
  
  const StatusTable = () => {
  return (
    <div className="table-wrapper">
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
</div>
)}

  return (
    <div className="front-page">
      <div className="front-section">
        <div className="content">
        
         <div className="welcome-msg">
          <p>Welcome to the Disasterland Disaster Losses and Damage Tracking System.
          You can create a <Link to="/">new record</Link>, explore data in the <Link to="/">analysis</Link> section, configure your instance <Link to="/">settings</Link>, and <Link to="/">import</Link> or <Link to="/">export</Link> data.</p>
        </div>
        
    
        <h2>Latest updates</h2>
        <div className="content">
          <Tabs 
           tabPosition={'left'}
           items={[
            { label: 'Records', 
              key: 'records',
              children:(
                <StatusTable />
              )
            },
            { label: 'Users', 
              key: 'users',
              children:(<StatusTable />)
            },
            { label: 'Events', 
              key: 'events',
              children:(<StatusTable />)
            },
            { label: 'Alerts', 
              key: 'alerts',
              children:(<StatusTable />)
            }

           ]}
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Front };
