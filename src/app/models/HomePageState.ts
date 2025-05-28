import { Host } from './Host';
import { Disk } from './Disk';

export class HomePageState {
    public configMode: boolean = false;
    public loading: boolean = false;
    public hosts: Host[] = [];
    public selectedHost: string | undefined = undefined;
    public selectedDisk: string = '';
    public error: string | null = null;

    constructor(initial?: Partial<HomePageState>) {
        if (initial) {
            Object.assign(this, initial);
        }
    }

    public clone(): HomePageState {
        return new HomePageState({
            ...this,
            hosts: this.hosts.map((host) => host.clone()),
        });
    }

    public addHost(host: Host): void {
        const index = this.hosts.findIndex((h) => h.name === host.name);
        if (index !== -1) {
            // Recovering cached disks
            host.disks = this.hosts[index].disks;
            this.hosts[index] = host;
        } else {
            this.hosts.push(host);
        }
    }

    public getHost(hostname: string | null | undefined): Host | undefined {
        return this.hosts.find((host) => host.name === hostname);
    }

    public getSelectedHost(): Host | null {
        return this.getHost(this.selectedHost) || null;
    }

    public getSelectedDisk(): Disk | null {
        let disk = null;
        const host = this.getSelectedHost();
        if (host && this.selectedDisk) {
            disk = host.getDisk(this.selectedDisk) || null;
        }
        return disk;
    }

    public getDiskData(hostname: string, diskname: string): Disk | null {
        const host = this.getHost(hostname);
        return host?.getDisk?.(diskname) || null;
    }

    public addDiskData(disk: Disk): void {
        const host = this.getHost(disk.host);
        host?.addDisk(disk);
    }

    public clearDisk(hostname: string, diskname: string): void {
        const host = this.getHost(hostname);
        host?.clearDisk(diskname);
    }
}
