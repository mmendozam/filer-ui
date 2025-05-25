import { Card, Row, Col } from 'antd';
import { Disk } from '../models';

type DiskDetailsProps = {
    disk: Disk;
};

export default function DiskDetails({ disk }: DiskDetailsProps) {
    return (
        <Card>
            <Row gutter={[16, 16]}>
                <Col span={6}>Disk name:</Col>
                <Col span={18}>{disk.name}</Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={6}>Path:</Col>
                <Col span={18}>{disk.path}</Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={6}>Scan date:</Col>
                <Col span={18}>{disk.date}</Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={6}>Directories:</Col>
                <Col span={18}>{disk.content.filter((c) => c.isFolder()).length}</Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={6}>Files:</Col>
                <Col span={18}>{disk.content.filter((c) => c.isFile()).length}</Col>
            </Row>
        </Card>
    );
}
