import axios from 'axios'
import { getLocalStorage, clearLocalStorage } from "@/utils/localStorage";
import { Message } from 'element-ui'
import router from '@/router';
import baseURL from '@/config/masterUrl';
import { formatMessage } from '@/utils/utils';


const service = axios.create({
  // baseURL:'http://api-open.haioupai.com/'
  baseURL
  // timeout: 20000 
});

//请求拦截器
service.interceptors.request.use(config => {
  return config;
}, error => {
  Message.error({
    message: JSON.stringify(error),
    type: "error"
  })
  return Promise.reject(error)
})
// 添加响应拦截器
service.interceptors.response.use(
  response => {
    let res = response.data
    if (res.code == 200) {
      if (res.error == 4022 || res.error == 4004) {
        //账号密码错误
        Message.error({
          message: res.message,
          type: "error"
        })
        return Promise.reject(formatMessage(res.message))
      } else if (res.error == 0) {
        return response.data.data;
      } else if (res.error == 1001) {
        clearLocalStorage()
        Message.error({
          message: "登陆过期，重新登录",
          type: "error"
        })
        router.push('/login')
        return Promise.reject(formatMessage(res.message))
      }
    } else {      //出错
      if (process.env.NODE_ENV === "development") {
        Message.error({
          message: `服务端错误：${JSON.stringify(res)}`,
          type: "error"
        })
      } else {
        Message.error({
          message: `服务器异常`,
          type: "error"
        })
      }

    }
  },
  error => {
    // Message.error({
    //   message:`服务端错误：${JSON.stringify(error)}`,
    //   type:"error"
    // })
    return Promise.reject(error)
  }
)

export default service;
