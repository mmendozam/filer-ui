import { Descriptions, Tag, Divider, Breadcrumb, Card, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { Host, FilerFile } from '../models';

type HostDetailsProps = {
    host: Host;
    selectedDisk: string;
};

export default function HostDetails({ host, selectedDisk }: HostDetailsProps) {
    const columns: TableColumnsType<FilerFile> = [
        {
            title: 'Directory',
            dataIndex: 'directory',
            key: 'directory',
            sorter: (a, b) => a.directory.localeCompare(b.directory),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Extension',
            dataIndex: 'extension',
            key: 'extension',
            sorter: (a, b) => a.extension.localeCompare(b.extension),
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
            sorter: (a, b) => a.size - b.size,
        },
    ];

    return (
        <>
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
            <Divider />
            <Card>
                <Breadcrumb
                    items={[
                        { title: 'HOST' },
                        { title: 'DISK' },
                        { title: 'NNLK_HOME' },
                        { title: 'media' },
                        { title: 'videos' },
                        { title: 'youtube' },
                    ]}
                />
                <Divider />
                <Table size='small' columns={columns} dataSource={host?.getDisk?.(selectedDisk)?.content || []} />
            </Card>
        </>
    );
}
