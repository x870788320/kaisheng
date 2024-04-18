
export const IFRAME_SERVE_ADDRESS = 'http://192.168.1.49:8088'
// export const IFRAME_SERVE_ADDRESS = 'http://192.168.1.49:8003'



export const SERVE_ADDRESS = 'https://222.173.243.142:7788/'
// console.log(location)

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
console.log(process.env.NODE_ENV )
export const baseURL = process.env.NODE_ENV ===  'production'? SERVE_ADDRESS: "/myapi/"
