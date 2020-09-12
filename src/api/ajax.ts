/*
ajax 请求函数模块
*/
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
axios.defaults.timeout = 5000;

// 请求拦截
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config; // 必须return config
}, error => {
  // Do something with request error
  return Promise.reject(error);
});

const ajax = (url = '', data = {}, methods = 'GET') => {
  return new Promise((resolve, reject) => {
    let promise: any;
    switch (methods) {
      case 'GET':
        promise = axios.get(url, {
          params: data
        })
        break;
      case 'POST':
        promise = axios.post(url, data);
        break;
      case 'PUT':
        promise = axios.put(url, data);
      default:
        break;
    }
    promise.then((response: any) => {
      // 成功回调resolve()
      resolve(response.data)
    })
      .catch((error: any) => {
        // 失败回调reject()
        reject(error)
      })
  })

}

export default ajax;