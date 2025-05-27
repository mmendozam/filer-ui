import { Row } from 'antd';
import { Host } from '../models/Host';
import HostManager from './HostManager';
import { SetStateFn } from '../api/dataServices';

type ConfigDetailsProps = {
    hosts: Host[];
    setState: SetStateFn;
};

export default function ConfigDetails({ hosts, setState }: ConfigDetailsProps) {
    return (
        <Row gutter={[16, 16]}>
            {hosts.map((host) => (
                <HostManager key={host.name} host={host} setState={setState} />
            ))}
        </Row>
    );
}
