import { StatusResponse, Disk } from '../models';

export class Host {
  public name: string = '';
  public diskNames: string[] = [];
  public disksData: Disk[] = [];
  public running: boolean = false;

  constructor(initial?: Partial<Host>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }

  public static of(response: StatusResponse): Host {
    return new Host({
      name: response.host,
      diskNames: response.disks,
      running: response.running
    });
  }

  public clone(): Host {
    return new Host(this);
  }

  public getDiskData(diskName: string): Disk | undefined {
    return this.disksData.find(diskData => diskData.name == diskName);
  }
}
