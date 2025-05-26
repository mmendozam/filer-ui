export class FilerFile {
    public directory: string = '';
    public extension: string = '';
    public name: string = '';
    public size: number = 0;

    constructor(initial?: Partial<FilerFile>) {
        if (initial) {
            Object.assign(this, initial);
        }
    }

    public isFolder(): boolean {
        return this.extension === '<folder>';
    }

    public isFile(): boolean {
        return this.extension !== '<folder>';
    }
}
