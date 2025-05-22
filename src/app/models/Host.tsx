import { StatusResponse } from '../models/StatusResponse';

export class Host {
  public name: string;
  public disks: string[];
  public running: boolean;

  constructor(name: string, disks: string[], running: boolean) {
    this.name = name;
    this.disks = disks;
    this.running = running;
  }

  public static of(response: StatusResponse): Host {
    return new Host(response.host, response.disks, response.running);
  }

  public clone(): Host {
    return new Host(this.name, this.disks, this.running);
  }
}
