import { Card, Row, Col } from 'antd';
import { Host } from '../models/Host';

type ConfigDetailsProps = {
  hosts: Host[]
};

export default function ConfigDetails({ hosts }: ConfigDetailsProps) {
  console.log('[ConfigDetails]');
  console.log(hosts);

  return <Row gutter={[16, 16]}>
    {
      hosts.map(host => (
        <Col key={host.name} span={6}>
          <Card title={host.name}>
            {host.disksData.map(disk => (
              <Row>
                <Col span={12}>Disk name:</Col>
                <Col span={12}>{disk.name}</Col>
              </Row>
            ))}
          </Card>
        </Col>
      ))}
  </Row>;
}
