'use client';

import { useEffect, useState } from 'react';
import {
  DatabaseOutlined,
} from '@ant-design/icons';
import { ConfigProvider, theme, Layout, Menu, Row, Col, Descriptions, Tag } from 'antd';
import axios from 'axios';
import { HomePageState } from './models/HomePageState'
import { Host } from './models/Host';
import { StatusResponse } from './models/StatusResponse';

const { Sider, Content } = Layout;

const HOSTS = ['rp3-retro'];



export default function HomePage() {
  const [state, setState] = useState(new HomePageState())

  const fetchHostStatus = async (hostname: string) => {
    console.log(`[getHostStatus] host: ${hostname}`);
    try {
      setState(prev => {
        const next = prev.clone();
        next.loading = true;
        return next;
      });
      const response = await axios.get<StatusResponse>(`http://${hostname}.local:5000/status`);
      const host = Host.of(response.data);
      setState(prev => {
        const next = prev.clone();
        next.addHost(host)
        return next;
      });
    } catch (error) {
      setState(prev => {
        const next = prev.clone();
        const erroMsg = `Error fetching data for host: ${hostname}`;
        console.error(`[getHostStatus] ${erroMsg}`);
        console.error(error);
        next.error = erroMsg;
        return next;
      });
    } finally {
      setState(prev => {
        const next = prev.clone();
        next.loading = false;
        return next;
      });
    }
  };

  useEffect(() => {
    HOSTS.forEach(host => fetchHostStatus(host));
  }, []);

  return (
    <ConfigProvider theme={{
      algorithm: theme.darkAlgorithm,
    }}>
      <Layout>
        <Layout>
          <Sider>
            <Menu
              items={
                state?.hosts?.map?.(host => ({
                  key: host.name,
                  label: host.name,
                  icon: <DatabaseOutlined />,
                  // children: state.getHost(host.name)?.disks?.map?.(disk => ({ key: disk}))
                })) || []
              }
              onClick={({ key }) => setState(prev => {
                const next = prev.clone();
                next.selectedHost = key;
                return next;
              })}
              activeKey={state?.selectedHost || undefined}
            />
          </Sider>

          <Content
          >
            <Row gutter={16}>
              <Col span={24}>
                {state.selectedHost && (<Descriptions title={state.selectedHost} items={[
                  {
                    key: '1',
                    label: 'Hostname',
                    children: `${!!state?.getSelectedHost?.()?.name}`,
                  },
                  {
                    key: '2',
                    label: 'Running',
                    children: `${!!state?.getSelectedHost?.()?.running}`,
                  },
                  {
                    key: '3',
                    label: 'Host',
                    children: state?.getSelectedHost?.()?.disks?.map?.(disk => (<Tag key={disk}>{disk}</Tag>)),
                  }
                ]} />)}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
