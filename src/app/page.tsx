'use client';

import { useEffect, useState } from 'react';
import {
  DatabaseOutlined,
} from '@ant-design/icons';
import { ConfigProvider, theme, Table, Button, Layout, Menu } from 'antd';
import axios from 'axios';

const { Header, Sider, Content } = Layout;

const dataSource = [
  { key: '1', name: 'Host A', value: 'Data A' },
  { key: '2', name: 'Host B', value: 'Data B' },
];

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Value', dataIndex: 'value', key: 'value' },
];

export default function HomePage() {
  const [status, setStatus] = useState<any | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://rp3-retro.local:5000/status');
      setStatus(response.data);
    } catch (error) {
      console.error('Error fetching data from Flask:', error);
      setStatus('Failed to fetch message.');
    }
  };

  return (
    <ConfigProvider theme={{
      algorithm: theme.darkAlgorithm,
    }}>
      <Layout>
        <Sider>
          <div className="demo-logo-vertical" />
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <DatabaseOutlined />,
                label: 'nav 1',
              },
              {
                key: '2',
                icon: <DatabaseOutlined />,
                label: 'nav 2',
              },
              {
                key: '3',
                icon: <DatabaseOutlined />,
                label: 'nav 3',
              },
            ]}
          >

          </Menu>
        </Sider>
        <Layout>
          <Header>
            Header
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
