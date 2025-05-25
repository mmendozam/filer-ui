import { Card, Row, Col, Button } from 'antd';
import { fetchDiskInfo, SetStateFn } from '../api/dataServices';
import { Host } from '../models';

type DiskDetailsProps = {
    host: Host;
    setState: SetStateFn;
};

export default function HostManager({ host, setState }: DiskDetailsProps) {
    return (
        <Card title={host.name}>
            {host.diskNames.map((diskname) => (
                <Row key={`${host.name}-${diskname}`} gutter={[16, 16]}>
                    <Col span={12}>
                        <Button
                            block
                            type="primary"
                            onClick={() => fetchDiskInfo(host.name, diskname, setState)}
                        >{`Fetch ${diskname}`}</Button>
                    </Col>
                </Row>
            ))}
        </Card>
    );
}
