import { useState } from 'react';
import { Card, Row, Col, Button, Select, Divider, Tag } from 'antd';
import {
    ApiOutlined,
    CloudDownloadOutlined,
    CloudSyncOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { fetchHostStatus, fetchDiskInfo, refreshDiskInfo, SetStateFn } from '../api/dataServices';
import { Host, HostManagerState } from '../models';
import DiskDetails from './DiskDetails';

type DiskDetailsProps = {
    host: Host;
    setState: SetStateFn;
};

export default function HostManager({ host, setState }: DiskDetailsProps) {
    const [managerState, setManagerState] = useState(
        new HostManagerState({ selectedDiskname: host?.diskNames?.sort?.()?.[0] || '' })
    );

    return (
        <Col key={host.name} xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Card title={host.name}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Row gutter={[16, 16]}>
                            <Col span={6}>
                                <Button
                                    block
                                    icon={<ApiOutlined />}
                                    iconPosition="end"
                                    onClick={() => fetchHostStatus(host.name, setState)}
                                >
                                    Check Host
                                </Button>
                            </Col>
                            <Col span={18}>
                                Running: <Tag>{`${host.running}`}</Tag>
                            </Col>
                            <Col span={6}>
                                <Select
                                    onChange={(value: string) =>
                                        setManagerState((prev) => {
                                            const next = prev.clone();
                                            next.selectedDiskname = value;
                                            return next;
                                        })
                                    }
                                    options={host.diskNames.map((diskName) => ({
                                        label: diskName,
                                        value: diskName,
                                    }))}
                                    style={{ width: '100%' }}
                                    defaultValue={host?.diskNames?.sort?.()?.[0]}
                                ></Select>
                            </Col>
                            <Col span={6}>
                                <Button
                                    block
                                    icon={<CloudDownloadOutlined />}
                                    iconPosition="end"
                                    onClick={() =>
                                        fetchDiskInfo(
                                            host.name,
                                            managerState.selectedDiskname,
                                            setState
                                        )
                                    }
                                >
                                    Fetch
                                </Button>
                            </Col>
                            <Col span={6}>
                                <Button
                                    block
                                    icon={<CloudSyncOutlined />}
                                    iconPosition="end"
                                    onClick={() =>
                                        refreshDiskInfo(
                                            host.name,
                                            managerState.selectedDiskname,
                                            setState
                                        )
                                    }
                                >
                                    Refresh
                                </Button>
                            </Col>
                            <Col span={6}>
                                <Button
                                    block
                                    danger
                                    icon={<DeleteOutlined />}
                                    iconPosition="end"
                                    onClick={() =>
                                        setState((prev) => {
                                            const next = prev.clone();
                                            next.clearDisk(
                                                host.name,
                                                managerState.selectedDiskname
                                            );
                                            return next;
                                        })
                                    }
                                >
                                    Clear
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Divider />
                <DiskDetails disk={host.getDisk(managerState.selectedDiskname)} />
            </Card>
        </Col>
    );
}
