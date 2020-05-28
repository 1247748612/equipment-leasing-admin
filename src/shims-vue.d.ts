declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '@smallwei/avue'

declare namespace JSX {
  interface IntrinsicElements {
    [key: string]: any
  }
}
