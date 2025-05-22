'use client';

import { useEffect, useState } from 'react';
import {
  DatabaseOutlined,
} from '@ant-design/icons';
import { ConfigProvider, theme, Layout, Menu, Row, Col, Descriptions, Tag } from 'antd';
import axios from 'axios';

const { Sider, Content } = Layout;

const HOSTS = ['rp3-retro'];

class File {
  public directory: string;
  public extension: string;
  public name: string;
  public size: number;

  constructor(directory: string, extension: string, name: string, size: number) {
    this.directory = directory;
    this.extension = extension;
    this.name = name;
    this.size = size;
  }
}

class Disk {
  public host: string;
  public disk_name: string;
  public path: string | null;
  public date: Date | null;
  public content: File[];

  constructor(host: string, disk_name: string) {
    this.host = host;
    this.disk_name = disk_name;
    this.path = null;
    this.date = null;
    this.content = [];
  }
}

interface StatusResponse {
  host: string;
  running: boolean;
  disks: string[];
}

class Host {
  public name: string;
  public disks: string[];
  public running: boolean;

  constructor(name: string, disks: string[], running: boolean) {
    this.name = name;
    this.disks = disks;
    this.running = running;
  }

  public static of(response: StatusResponse): Host {
    return new Host(response.host, response.disks, response.running);
  }

  public clone(): Host {
    return new Host(this.name, this.disks, this.running);
  }
}



class HomePageState {
  public loading: boolean;
  public hosts: Host[];
  public selectedHost: string | null;
  public error: string | null;

  constructor() {
    this.loading = false;
    this.hosts = [];
    this.selectedHost = null;
    this.error = null;
  }

  public clone(): HomePageState {
    const clone = new HomePageState();
    clone.loading = this.loading;
    clone.hosts = this.hosts.map(host => host.clone());
    clone.selectedHost = this.selectedHost;
    clone.error = this.error;
    return clone;
  }

  public addHost(host: Host): void {
    const index = this.hosts.findIndex(h => h.name === host.name);
    if (index !== -1) {
      this.hosts[index] = host;
    } else {
      this.hosts.push(host);
    }
  }

  public getHost(hostname: string | null): Host | undefined {
    return this.hosts.find(host => host.name === hostname);
  }

  public getSelectedHost(): Host | undefined {
    return this.getHost(this.selectedHost);
  }
}

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
        console.log(`[getHostStatus] ${erroMsg}`);
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
