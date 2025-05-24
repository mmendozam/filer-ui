import { Card, Row, Col, Button } from 'antd';
import { fetchDiskInfo, SetStateFn } from '../api/dataServices';
import { Host } from '../models/Host';
import DiskDetails from './DiskDetails';

type ConfigDetailsProps = {
  hosts: Host[]
  setState: SetStateFn
};

export default function ConfigDetails({ hosts, setState }: ConfigDetailsProps) {
  return <Row gutter={[16, 16]}>
    {
      hosts.map(host => (
        <Col key={host.name} span={12}>
          <Card title={host.name}>
            {host.diskNames.map(diskname => (
              <Row key={`${host.name}-${diskname}`} gutter={[16, 16]}>
                <Col span={12}>
                  <Button block type="primary" onClick={() => {
                    fetchDiskInfo(host.name, diskname, setState);
                  }}>{`Fetch ${diskname}`}</Button>
                </Col>
              </Row>))}

            {host.disksData.map(disk => (<DiskDetails key={`${host.name}-${disk.name}`} disk={disk} />))}
          </Card>
        </Col>
      ))}
  </Row>;
}
