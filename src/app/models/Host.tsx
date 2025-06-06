import { StatusResponse, Disk } from '../models';

export class Host {
    public name: string = '';
    public diskNames: string[] = [];
    public disksData: Disk[] = []; // TODO rename to disks
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

    public getDiskData(diskname: string): Disk | undefined {
        return this.disksData.find((diskData) => diskData.name == diskname);
    }

    public addDiskData(disk: Disk): void {
        const index = this.disksData.findIndex((d) => d.name === disk.name && d.host === disk.host);
        if (index !== -1) {
            this.disksData[index] = disk;
        } else {
            this.disksData.push(disk);
        }
    }

    public clearDisk(diskname: string): boolean {
        const index = this.disksData.findIndex((d) => d.name === diskname && d.host === this.name);
        if (index !== -1) {
            this.disksData.splice(index, 1);
            return true;
        } else {
            console.warn(`No disk found to clear: ${diskname}`);
            return false;
        }
    }
}
