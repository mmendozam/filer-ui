import { StatusResponse, Disk } from '../models';

export class Host {
    public name: string = '';
    public diskNames: string[] = [];
    public disks: Disk[] = [];
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
            running: response.running,
        });
    }

    public clone(): Host {
        return new Host(this);
    }

    public getDisk(diskname: string): Disk | undefined {
        return this.disks.find((diskData) => diskData.name == diskname);
    }

    public addDisk(disk: Disk): void {
        const index = this.disks.findIndex((d) => d.name === disk.name && d.host === disk.host);
        if (index !== -1) {
            this.disks[index] = disk;
        } else {
            this.disks.push(disk);
        }
    }

    public clearDisk(diskname: string): boolean {
        const index = this.disks.findIndex((d) => d.name === diskname && d.host === this.name);
        if (index !== -1) {
            this.disks.splice(index, 1);
            return true;
        } else {
            console.warn(`No disk found to clear: ${diskname}`);
            return false;
        }
    }
}
