import { Host } from './Host';
import { Disk } from './Disk';

export class HomePageState {
  public configMode: boolean;
  public loading: boolean;
  public hosts: Host[];
  public selectedHost: string | null;
  public selectedDisk: string | null;
  public error: string | null;

  constructor() {
    this.configMode = false;
    this.loading = false;
    this.hosts = [];
    this.selectedHost = null;
    this.selectedDisk = null;
    this.error = null;
  }

  public clone(): HomePageState {
    const clone = new HomePageState();
    clone.configMode = this.configMode;
    clone.loading = this.loading;
    clone.hosts = this.hosts.map(host => host.clone());
    clone.selectedHost = this.selectedHost;
    clone.selectedDisk = this.selectedDisk;
    clone.error = this.error;
    return clone;
  }

  public addHost(host: Host): void {
    const index = this.hosts.findIndex(h => h.name === host.name);
    if (index !== -1) {
      this.hosts[index] = host;
    } else {
      this.hosts.push(host);
    }
  }

  public getHost(hostname: string | null): Host | undefined {
    return this.hosts.find(host => host.name === hostname);
  }

  public getSelectedHost(): Host | null {
    return this.getHost(this.selectedHost) || null;
  }

  public getSelectedDisk(): Disk | null {
    let disk = null;
    const host = this.getSelectedHost();
    if (host && this.selectedDisk) {
      disk = host.getDiskData(this.selectedDisk) || null;
    }
    return disk;
  }
}
