// cookie、localStorage
import tool from '@/utils/tool'
import Cookies from 'js-cookie'
import Fingerprint2 from 'fingerprintjs2'
import { v1 as uuidv1 } from 'uuid';

export const KEYS = {
    uuid: 'uuid',
    uuidv1: 'uuidv1',
    HB_fp: 'HB_fp',
    lang: 'lang',
    cur: 'cur',
    token: 'token',
    risktip: 'risktip',
    HB_baseUrl: 'HB_baseUrl',
    HB_THEME: 'hb-theme',
    AREA_LIST: 'AREA_LIST',
    GET_AREA_LIST: 'GET_AREA_LIST',
    USER_INFO: 'USER_INFO',
    ENTER_CART_TO_ORDER: 'ENTER_CART_TO_ORDER',
    REHEARSAL_TIP: 'REHEARSAL_TIP',
    hasPurchased: 'hasPurchased',
    currencies_list: 'currencies_list',
    footer_group: 'footer_group',
    footer_list: 'footer_list',
    footer_infos: 'footer_infos',
    AFFCODE: 'AFFCODE',
    SEARCH_BASE64_IMAGE: 'SEARCH_BASE64_IMAGE',
    SEARCH_URL: 'SEARCH_URL',
    CHECK_AREE:"CHECK_AREE",
    AGREE_RISK:"AGREE_RISK",
    AGREECLAUSE:"AGREECLAUSE",
    SELECTEDITEMS:"SELECTEDITEMS",
    SALESRETURNTIPS:"SALESRETURNTIPS",
};

// 获取cookie
export function getCookie(name = KEYS.token) {
  return Cookies.get(name)
}

// 设置cookie-token
export function setCookie(name, token, expires = 400) {
  let domain = getDomain()
  return Cookies.set(name, token, { expires, domain })
}

// 清空cookie
export function removeCookie(name = KEYS.token, domain = getDomain()) {
  return Cookies.remove(name, { domain })
}

export function getLocalData(key) {
    if (key === KEYS.uuid) {
        //旧版用户存在旧版uuid
        key = KEYS.uuidv1;
    }
    //优先从本地存储获取
    let localData = localStorage.getItem(key);
    if (localData) {
        return localData;
    }
    //特殊参数特殊处理
    switch (key) {
        case KEYS.uuid:
        case KEYS.uuidv1:
            //同步生成并保存，且直接返回，v1版本可以反编译出时间
            const uuid = uuidv1();
            setLocalData(key, uuid)
            return uuid;
        case KEYS.HB_fp:
            //TODO 异步获取并保存，供后续从本地存储获取
            Fingerprint2.get((components) => {
                const values = components.map(component => component.value) // 配置的值的数组
                const fp = Fingerprint2.x64hash128(values.join(''), 31) // 生成浏览器指纹
                setLocalData(key, fp)
            })
            break;
    }
    //默认为空字符串
    return '';
}

// 保存本地数据
export function setLocalData(key, value) {
    //同时保存到 cookie 的参数 TODO 用于 cf 限流判断
    let cookieKeys = [KEYS.uuidv1];
    if (cookieKeys.includes(key)) {
        setCookie(key, value);
    }
    return localStorage.setItem(key, value)
}

// 清空本地数据
export function removeLocalData(key) {
  return localStorage.removeItem(key)
}

// 获取Session
export function getSessionData(key) {
  return sessionStorage.getItem(key)
}

// 保存Session
export function setSessionData(key, value) {
  return sessionStorage.setItem(key, value)
}

// 清空Session
export function removeSessionData(key) {
  return sessionStorage.removeItem(key)
}

// 当前顶级域名
function getDomain() {
  let domain = ''
  if (process.env.VUE_APP_HJ !== 'serve') {
    domain = document.domain.split('.').slice(-2).join('.')
  }
  return domain
}
