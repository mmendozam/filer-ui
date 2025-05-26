import { Card, Row, Col, Divider } from 'antd';
import { SetStateFn } from '../api/dataServices';
import { Host } from '../models/Host';
import HostManager from './HostManager';
import DiskDetails from './DiskDetails';

type ConfigDetailsProps = {
    hosts: Host[];
    setState: SetStateFn;
};

export default function ConfigDetails({ hosts, setState }: ConfigDetailsProps) {
    return (
        <Row gutter={[16, 16]}>
            {hosts.map((host) => (
                <Col key={host.name} span={12}>
                    <Card title={host.name}>
                        <HostManager host={host} setState={setState} />
                        <Divider />
                        {host.disksData.map((disk) => (
                            <DiskDetails key={`${host.name}-${disk.name}`} disk={disk} />
                        ))}
                    </Card>
                </Col>
            ))}
        </Row>
    );
}
