export class HostManagerState {
    public selectedDiskname: string = '';
    public loading: boolean = false;

    constructor(initial?: Partial<HostManagerState>) {
        if (initial) {
            Object.assign(this, initial);
        }
    }

    public clone(): HostManagerState {
        return new HostManagerState({
            ...this,
        });
    }
}
