/*
ajax 请求函数模块
*/
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
axios.defaults.timeout = 5000;

const ajax = (url = '', data = {}, methods='GET') => {
  return new Promise((resolve, reject) => {
    let promise: any;
    if (methods === 'GET') {
      promise = axios.get(url, {
        params: data
      })
    } else {
      promise = axios.post(url, data);
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