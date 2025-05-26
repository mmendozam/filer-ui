import { Descriptions, Tag } from 'antd';
import { Host } from '../models/Host';

type HostDetailsProps = {
    host: Host;
    selectedDisk: string | null;
};

export default function HostDetails({ host, selectedDisk }: HostDetailsProps) {
    return (
        <Descriptions
            title={`${host.name} / ${selectedDisk}`}
            items={[
                {
                    key: '1',
                    label: 'Hostname',
                    children: host.name,
                },
                {
                    key: '2',
                    label: 'Running',
                    children: String(host.running),
                },
                {
                    key: '3',
                    label: 'Disks',
                    children: host.diskNames?.map((disk) => <Tag key={disk}>{disk}</Tag>),
                },
            ]}
        />
    );
}
