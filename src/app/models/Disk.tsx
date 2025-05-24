import { DiskResponse, FilerFile } from '../models';

export class Disk {
  public host: string = '';
  public name: string = '';
  public path: string = '';
  public date: string = '';
  public content: FilerFile[] = [];

  constructor(initial?: Partial<Disk>) {
    if (initial) {
      Object.assign(this, initial);
    }
  }

  public static of(response: DiskResponse): Disk {
    return new Disk({
      host: response.host,
      name: response.disk_name,
      path: response.path,
      date: response.date,
      content: response.content
    });
  }
}
