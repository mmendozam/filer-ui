import { Card } from 'antd';
import { Host } from '../models/Host';

type ConfigDetailsProps = {
  hosts: Host[]
};

export default function ConfigDetails({ hosts }: ConfigDetailsProps) {
  return <>{hosts.map(host => (<Card></Card>))}</>;
}
