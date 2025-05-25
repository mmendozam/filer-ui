import { FilerFile } from '../models';

export interface DiskResponse {
    date: string;
    disk_name: string;
    host: string;
    path: string;
    content: FilerFile[];
}
