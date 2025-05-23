'use client';

import { useEffect, useState } from 'react';
import { DatabaseOutlined, CloudServerOutlined, SettingOutlined } from '@ant-design/icons';
import { ConfigProvider, theme, Layout, Menu, Row, Col, Descriptions, Tag } from 'antd';
import { fetchHostStatus } from './api/dataServices';
import { HomePageState } from './models/HomePageState'
import { HOSTS } from './utils/constants'

const { Sider, Content } = Layout;

export default function HomePage() {
  const [state, setState] = useState(new HomePageState())

  useEffect(() => {
    HOSTS.forEach(hostname => fetchHostStatus(hostname, setState));
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
                [...(state?.hosts?.map?.(host => ({
                  key: host.name,
                  label: host.name,
                  icon: <CloudServerOutlined />,
                  children: state.getHost(host.name)?.diskNames?.map?.(disk => ({ key: `${host.name}-${disk}`, label: disk, icon: <DatabaseOutlined /> }))
                })) || []), {
                  key: 'config',
                  label: 'Configuration',
                  icon: <SettingOutlined />,
                }]
              }
              onClick={({ key, keyPath }) => setState(prev => {
                const next = prev.clone();

                if (key === 'config') {
                  next.configMode = true;
                  next.selectedHost = null;
                  next.selectedDisk = null;
                } else {
                  const host = keyPath?.[keyPath?.length - 1];
                  const disk = key.replace(`${host}-`, '');
                  next.configMode = false;
                  next.selectedHost = host;
                  next.selectedDisk = disk;
                }

                return next;
              })}
              activeKey={state?.selectedHost || undefined}
              mode="inline"
            />
          </Sider>

          <Content
          >
            <Row gutter={16}>
              <Col span={24}>
                {state.configMode && (<h2>Config</h2>)}

                {state.selectedHost && (<Descriptions title={`${state.selectedHost} / ${state.selectedDisk}`} items={[
                  {
                    key: '1',
                    label: 'Hostname',
                    children: `${state?.getSelectedHost?.()?.name}`,
                  },
                  {
                    key: '2',
                    label: 'Running',
                    children: `${state?.getSelectedHost?.()?.running}`,
                  },
                  {
                    key: '3',
                    label: 'Disks',
                    children: state?.getSelectedHost?.()?.diskNames?.map?.(disk => (<Tag key={disk}>{disk}</Tag>)),
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
