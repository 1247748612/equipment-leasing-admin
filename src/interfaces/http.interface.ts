interface AxiosCustomResponse {
  state: string,
  data?: { // 接口返回数据
    [key: string]: any
  },
  errMessage?: string // 错误消息
  message?: string // 消息
  error?: string // 错误提示
  stack?: string // 错误
}
