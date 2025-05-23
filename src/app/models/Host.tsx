import { StatusResponse } from '../models/StatusResponse';
import { Disk } from '../models/Disk'

export class Host {
  public name: string;
  public diskNames: string[];
  public disksData: Disk[];
  public running: boolean;

  constructor(name: string, disks: string[], running: boolean) {
    this.name = name;
    this.diskNames = disks;
    this.running = running;
    this.disksData = []
  }

  public static of(response: StatusResponse): Host {
    return new Host(response.host, response.disks, response.running);
  }

  public clone(): Host {
    return new Host(this.name, this.diskNames, this.running);
  }

  public getDiskData(diskName: string): Disk | undefined {
    return this.disksData.find(diskData => diskData.name == diskName);
  }
}
