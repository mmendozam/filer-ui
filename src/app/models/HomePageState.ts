import { Host } from './Host';

export class HomePageState {
  public loading: boolean;
  public hosts: Host[];
  public selectedHost: string | null;
  public error: string | null;

  constructor() {
    this.loading = false;
    this.hosts = [];
    this.selectedHost = null;
    this.error = null;
  }

  public clone(): HomePageState {
    const clone = new HomePageState();
    clone.loading = this.loading;
    clone.hosts = this.hosts.map(host => host.clone());
    clone.selectedHost = this.selectedHost;
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

  public getSelectedHost(): Host | undefined {
    return this.getHost(this.selectedHost);
  }
}
