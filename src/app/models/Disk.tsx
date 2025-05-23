import { FilerFile } from './FilerFile';

export class Disk {
  public host: string;
  public name: string;
  public path: string | null;
  public date: Date | null;
  public content: FilerFile[];

  constructor(host: string, disk_name: string) {
    this.host = host;
    this.name = disk_name;
    this.path = null;
    this.date = null;
    this.content = [];
  }
}
