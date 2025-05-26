import axios from 'axios';
import { Disk, Host, StatusResponse, DiskResponse, HomePageState } from '../models';

export type SetStateFn = React.Dispatch<React.SetStateAction<HomePageState>>;

const handleErrorResponse = (errorMsg: string, setState: SetStateFn) => {
    console.error(errorMsg);
    setState((prev) => {
        const next = prev.clone();
        next.error = errorMsg;
        return next;
    });
};

const setStateLoading = (loadig: boolean, setState: SetStateFn) =>
    setState((prev) => {
        const next = prev.clone();
        next.loading = loadig;
        return next;
    });

export const fetchHostInfo = async (hostname: string, setState: SetStateFn) => {
    console.log(`[fetchHostInfo] host: ${hostname}`);
    setStateLoading(true, setState);
    axios
        .get<StatusResponse>(`http://${hostname}.local:5000/status`)
        .then((response) => {
            const host = Host.of(response.data);
            setState((prev) => {
                const next = prev.clone();
                next.addHost(host);
                return next;
            });
        })
        .catch(() => handleErrorResponse(`Error fetching data for host: ${hostname}`, setState))
        .finally(() => setStateLoading(false, setState));
};

export const fetchDiskInfo = async (hostname: string, diskname: string, setState: SetStateFn) => {
    console.log(`[fetchDiskInfo] host/disk: ${hostname}/${diskname}`);
    setStateLoading(true, setState);
    axios
        .get<DiskResponse>(`http://${hostname}.local:5000/disk/${diskname}`)
        .then((response) => {
            setState((prev) => {
                const next = prev.clone();
                next.addDiskData(Disk.of(response.data));
                return next;
            });
        })
        .catch(() =>
            handleErrorResponse(
                `Error fetching data for host/disk: ${hostname}/${diskname}`,
                setState
            )
        )
        .finally(() => setStateLoading(false, setState));
};

export const refreshDiskInfo = async (hostname: string, diskname: string, setState: SetStateFn) => {
    console.log(`[refreshDiskInfo] host/disk: ${hostname}/${diskname}`);
    setStateLoading(true, setState);
    axios
        .get<DiskResponse>(`http://${hostname}.local:5000/scan/${diskname}`)
        .then((response) => {
            setState((prev) => {
                const next = prev.clone();
                next.addDiskData(Disk.of(response.data));
                return next;
            });
        })
        .catch(() =>
            handleErrorResponse(
                `Error fetching data for host/disk: ${hostname}/${diskname}`,
                setState
            )
        )
        .finally(() => setStateLoading(false, setState));
};
