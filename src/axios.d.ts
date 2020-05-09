import axios from 'axios';

declare module axios {
  interface AxiosResponse {
    message: string
  }
}