enum ResponseState {
  Success = 'success',
  Error = 'error'
}
export interface AxiosSuccessData {
  state: string;
  message: string;
  data: {
    [key: string]: any
  };
  code?: number
}

export interface AxiosErrorData {
  state: string;
  errMessage: string;
  error?: string;
  debug?: any
  code?: number
}

export type AxiosResponseData = AxiosSuccessData & AxiosErrorData