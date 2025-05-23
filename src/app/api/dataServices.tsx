import axios from 'axios';
import { Host } from '../models/Host';
import { StatusResponse } from '../models/StatusResponse';
import { HomePageState } from '../models/HomePageState';

type SetStateFn = React.Dispatch<React.SetStateAction<HomePageState>>;

export const fetchHostInfo = async (hostname: string, setState: SetStateFn) => {
  console.log(`[fetchHostStatus] host: ${hostname}`);
  try {
    setState(prev => {
      const next = prev.clone();
      next.loading = true;
      return next;
    });

    const response = await axios.get<StatusResponse>(`http://${hostname}.local:5000/status`);
    const host = Host.of(response.data);

    setState(prev => {
      const next = prev.clone();
      next.addHost(host);
      return next;
    });
  } catch (error) {
    const errorMsg = `Error fetching data for host: ${hostname}`;
    console.error(`[fetchHostStatus] ${errorMsg}`);
    console.error(error);
    setState(prev => {
      const next = prev.clone();
      next.error = errorMsg;
      return next;
    });
  } finally {
    setState(prev => {
      const next = prev.clone();
      next.loading = false;
      return next;
    });
  }
};

export const fetchDiskInfo = async () => {

};
