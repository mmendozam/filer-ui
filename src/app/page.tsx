'use client';

import { useEffect, useState } from 'react';
import { DatabaseOutlined, CloudServerOutlined, SettingOutlined } from '@ant-design/icons';
import { ConfigProvider, theme, Layout, Menu, Row, Col } from 'antd';
import { fetchHostInfo } from './api/dataServices';
import ConfigDetails from './components/ConfigDetails';
import HostDetails from './components/HostDetails';
import { HomePageState } from './models/HomePageState';
import { HOSTS } from './utils/constants';

const { Sider, Content } = Layout;

export default function HomePage() {
    const [state, setState] = useState(new HomePageState());

    useEffect(() => {
        HOSTS.forEach((hostname) => fetchHostInfo(hostname, setState));
    }, []);

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
            }}
        >
            <Layout style={{ minHeight: '100%' }}>
                <Sider>
                    <Menu
                        items={[
                            {
                                key: 'config',
                                label: 'Configuration',
                                icon: <SettingOutlined />,
                            },
                            ...(state?.hosts
                                ?.sort((a, b) => a.name.localeCompare(b.name))
                                ?.map?.((host) => ({
                                key: host.name,
                                label: host.name,
                                icon: <CloudServerOutlined />,
                                children: state
                                    .getHost(host.name)
                                    ?.diskNames?.map?.((disk) => ({
                                        key: `${host.name}-${disk}`,
                                        label: disk,
                                        icon: <DatabaseOutlined />,
                                    })),
                            })) || []),
                        ]}
                        onClick={({ key, keyPath }) =>
                            setState((prev) => {
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
                            })
                        }
                        activeKey={state?.selectedHost || undefined}
                        mode="inline"
                    />
                </Sider>
                <Layout>
                    <Content>
                        <Row gutter={16}>
                            <Col span={24}>
                                {/* Config section */}
                                {state.configMode && (
                                    <ConfigDetails hosts={state.hosts} setState={setState} />
                                )}

                                {/* Hosts section */}
                                {state.selectedHost && (
                                    <HostDetails
                                        host={state.getSelectedHost()!}
                                        selectedDisk={state.selectedDisk}
                                    />
                                )}
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
}
