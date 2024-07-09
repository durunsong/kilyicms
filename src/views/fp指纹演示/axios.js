/*
 * @Author: DESKTOP-00G5TUU\hago zjm
 * @Date: 2023-11-01 10:02:39
 * @LastEditors: DESKTOP-00G5TUU\hago zjm
 * @LastEditTime: 2023-11-07 17:04:45
 * @FilePath: \hagobuy_www\src\api\axios.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios';
import store from '../../store';
import {getLocalData, KEYS} from '@/utils/token'
import baseUrlConfig from '../utils/baseUrlConfig.js'
import { message } from 'ant-design-vue'

// let baseURLList = process.env.VUE_APP_BASEURL_LIST?.split(',') || [];
let urlConfig = new baseUrlConfig()

// 创建 axios 实例
let service = axios.create({
  timeout: 12000, // 请求超时时间
  // crossDomain: true, //设置cross跨域
  withCredentials: true, //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
})

// 拦截请求
service.interceptors.request.use(req => {
  // 设置头
  req.headers['lang'] = getLocalData(KEYS.lang) || 'en'
  req.baseURL = urlConfig.getCurrentUrl()

  // 文件上传进度条
  let percentCompleted = 0
  // 特殊数据类型（文件、照片）
  if (req.isFile) {
    req.headers["Content-Type"] = "multipart/form-data"
    req.onUploadProgress = function (progressEvent) {
      percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      store.commit('SET_STATE', { key: 'uploadProgress', value: percentCompleted})
    }

  }

  // 过滤后台可运行api
  if (!req.isInterfaceBgOperation) {
    req.cancelToken = new axios.CancelToken(cancel => {
      store.commit('add_AxiosPromiseArr', { cancel })
    })
  }

  // 查看请求信息
  // console.log('请求:', req)
  return req;
})

// 拦截响应
service.interceptors.response.use(async response => {
  const res = response.data

  // console.log('响应：', res)
  return res
}, err => {
  if (err.code !== "ERR_CANCELED") {
    message.error(err.message)
    // 切换请求地址
    urlConfig.getNextUrl()
    // 是否已经切换过域名
    if (err.config.baseURL !== urlConfig.getCurrentUrl()) {
      // 记录重试的api
      // urlConfig.rerequest(err.config.url)
      // 重新请求
      return service(err.config);
    }
  }
  return Promise.reject(err)
})

export {
  service
};
