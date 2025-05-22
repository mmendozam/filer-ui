'use client';

import { Table, Button } from 'antd';

const dataSource = [
  { key: '1', name: 'Host A', value: 'Data A' },
  { key: '2', name: 'Host B', value: 'Data B' },
];

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Value', dataIndex: 'value', key: 'value' },
];

export default function HomePage() {
  return (
    <div style={{ padding: 24 }}>
      <Button type="primary" style={{ marginBottom: 16 }}>
        Refresh
      </Button>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}
