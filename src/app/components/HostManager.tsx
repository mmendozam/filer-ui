import { Card, Row, Col, Button } from 'antd';
import { fetchDiskInfo, refreshDiskInfo, SetStateFn } from '../api/dataServices';
import { Host } from '../models';

type DiskDetailsProps = {
    host: Host;
    setState: SetStateFn;
};

export default function HostManager({ host, setState }: DiskDetailsProps) {
    return (
        <Card title="Mange host">
            {host.diskNames.map((diskname) => (
                <Row key={`${host.name}-${diskname}`} gutter={[16, 16]}>
                    <Col span={6}>{diskname}</Col>
                    <Col span={6}>
                        <Button block onClick={() => fetchDiskInfo(host.name, diskname, setState)}>
                            Fetch
                        </Button>
                    </Col>
                    <Col span={6}>
                        <Button
                            block
                            onClick={() => refreshDiskInfo(host.name, diskname, setState)}
                        >
                            Refresh
                        </Button>
                    </Col>
                    <Col span={6}>
                        <Button
                            block
                            danger
                            onClick={() => setState(prev => {
                                const next = prev.clone();
                                next.clearDisk(host.name, diskname)
                                return next;
                            })}
                        >
                            Clear
                        </Button>
                    </Col>
                </Row>
            ))}
        </Card>
    );
}
