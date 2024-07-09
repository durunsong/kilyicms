import Vue from "vue";
import { service } from "./axios.js";
import {getCookie, getLocalData, KEYS} from '@/utils/token'
import { message, Modal } from 'ant-design-vue'
import store from '@/store'
import router from '@/router'
import { initKeyIv, encrypt, decrypt } from "@/utils/encrypt";

// 接口公共参数
let baseParams = {
  versionCode: process.env.VUE_APP_versionCode,
  from: "1201", //1001=android，1101=ios，1201=webpc，1301=webmoblie
}

/**
 * 封装axios请求方法
 * @param url     接口url
 * @param params  参数
 * @isInterfaceBgOperation 是否后台运行
 */
export function request(url = '', params = {}, needToken = true, isInterfaceBgOperation = false) {
  // 开发环境 测试参数
  if (process.env.VUE_APP_HJ === 'test' || process.env.VUE_APP_HJ === 'serve') {
    // baseParams.debugSk = 'U8UFo2e1vElFv5Bc'
  }

  baseParams.fp = getLocalData(KEYS.HB_fp) // 浏览器指纹
  baseParams.referer = document.referrer || ''
  baseParams.uuid = getLocalData(KEYS.uuid)
  baseParams.cur = getLocalData(KEYS.cur) || 'USD'
  baseParams.token = getCookie()

  // 接口所需参数
  let dataParams = {
    ...baseParams,
    ...params
  }

  // 参数data  加密模式req_code
  let data = {
    data: '',
    req_code: process.env.VUE_APP_HJ === 'pro' ? 4 : 1
  }

  /**
   * 图片上传参数
   * @image 图片文件
   * 1、提取到req_code同级参数
   * 2、data参数中移除image
   */
  const { image } = params
  if (image) {
    data.image = image
    delete dataParams.image
  }

  /**
   * 加密相关
   * @key 加密key
   * @iv  加密iv
   * @encryptData 加密后数据 
   */
  let keyIv = initKeyIv()
  const { key, iv } = keyIv

  // reqcode = 3/4 加密
  if (data.req_code === 4) {
    const encryptData = encrypt(dataParams, key, iv)
    Object.assign(data, encryptData)
  } else {
    dataParams = JSON.stringify(dataParams)
    data.data = dataParams
  }

  /**
   * 接口请求参数
   * @method 请求方法(默认POST)
   * @url    请求地址
   * @data   请求参数
   * @isFile 是否是文件上传--修改接口数据类型"multipart/form-data"
   * @isInterfaceBgOperation 部分接口后台运行(跳转路由默认中断接口请求)
   */
  let serviceData = {
    method: "post",
    url,
    data,
    isFile: image ? true : false,
    isInterfaceBgOperation
  }

  /**
   * 接口请求
   * @serviceData 请求参数
   * 接口回调
   * @callback requestCallback
   * @param {Object} res 接口返回数据
   * @param {Object} res.data 数据
   * @param {string} res.msg 信息字段
   * @param {number} res.code 状态码
   *     200: 成功
   *     202：加密数据
   *     1002：toast消息提示
   *     1003：弹窗提示
   *     1005：登录过期
   */
  return new Promise((resolve, reject) => {
    service(serviceData).then(res => {
      if (res.code !== 200) {
        // 解密回调数据
        if (res.code === 202) {
          res.data = decrypt(res.data, key, iv)
          resolve(res)
        }

        // toast消息提示
        if (res.code === 1002 || res.code === 500) {
          reject(res);
          message.error(res.msg)
        }

        // 弹窗提示
        if (res.code === 1003) {
          Modal.error({
            centered: true,
            title: 'Error',
            // 解析html字符
            content: h => h('modal-content', { props: { msg: res.msg } }),
            // content: res.msg,
            okText: 'Confirm',
            okType: 'danger',
            autoFocusButton: null,
            closable: true,
            width: '500px'
          })
        }

        // 登录过期的情况
        if (res.code === 1005) {
          // 跳转到登录页
          message.warning(res.msg)
          store.dispatch('logout')

          let redirectUrl = ''
          redirectUrl = router.currentRoute.query.redirect || router.currentRoute.fullPath
          router.push({
            path: '/login',
            query: { redirect: redirectUrl }
          })

          reject(res);
          return false;
        }
        reject(res)
      } else {
        resolve(res);
      }
    }).catch(res => {
      if (res.code !== "ERR_CANCELED") {
        message.error(res.code)
      }
      reject(res);
    })
  })
}

// 创建并注册组件  解析html
Vue.component('modal-content', {
  props: ['msg'],
  render: function(h) {
    return h('div', { domProps: { innerHTML: this.msg } });
  }
})
