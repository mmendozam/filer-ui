import { useState } from 'react';
import { Card, Row, Col, Button, Select, Divider } from 'antd';
import { fetchDiskInfo, refreshDiskInfo, SetStateFn } from '../api/dataServices';
import { Host } from '../models';
import DiskDetails from './DiskDetails';

type DiskDetailsProps = {
    host: Host;
    setState: SetStateFn;
};

export default function HostManager({ host, setState }: DiskDetailsProps) {
    const [selectedDiskname, setSelectedDisk] = useState(host?.diskNames?.sort?.()?.[0] || '');

    return (
        <Col key={host.name} xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <Card title={host.name}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Select
                                    onChange={(value: string) => setSelectedDisk(value)}
                                    options={host.diskNames.map((diskName) => ({
                                        label: diskName,
                                        value: diskName,
                                    }))}
                                    style={{ width: '100%' }}
                                    defaultValue={host?.diskNames?.sort?.()?.[0]}
                                ></Select>
                            </Col>
                            <Col span={12} />
                            <Col span={6}>
                                <Button
                                    block
                                    onClick={() => fetchDiskInfo(host.name, selectedDiskname, setState)}
                                >
                                    Fetch
                                </Button>
                            </Col>
                            <Col span={6}>
                                <Button
                                    block
                                    onClick={() =>
                                        refreshDiskInfo(host.name, selectedDiskname, setState)
                                    }
                                >
                                    Refresh
                                </Button>
                            </Col>
                            <Col span={6}>
                                <Button
                                    block
                                    danger
                                    onClick={() =>
                                        setState((prev) => {
                                            const next = prev.clone();
                                            next.clearDisk(host.name, selectedDiskname);
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
                <DiskDetails disk={host.getDiskData(selectedDiskname)} />
            </Card>
        </Col>
    );
}
