// 定义工具类
import Clipboard from "clipboard"
import { message } from "ant-design-vue"

// 生成随机key
function randomCharacter() {
  return 'xxxxxxxxxxxxxxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// 时间戳10位 转换时间
function formatDate(time) {
  let date = new Date(parseInt(time) * 1000)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month > 9 ? month : "0" + month
  let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
  let hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours()
  let minute = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()
  let second = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds()
  // 年月日 时分秒
  let html = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  return html
}

// 时间戳10位 转换时间--年月
function formatYMDate(time) {
  let date = new Date(parseInt(time) * 1000)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month > 9 ? month : "0" + month
  let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
  let html = `${year}-${month}-${day}`
  return html
}

// 时间戳10位 转换时间--年月
function formatMHMDate(time) {
  let date = new Date(parseInt(time) * 1000)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month > 9 ? month : "0" + month
  let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
  let hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours()
  let minute = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()
  let second = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds()
  // 月日 时分秒
  let html = `${month}-${day} ${hour}:${minute}:${second}`
  return html
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 */
function throttle(func, wait) {
  let timeout
  return function() {
    let context = this
    let args = arguments
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null
        func.apply(context, args)
      }, wait)
    }

  }
}

/**
 * @desc 货币格式转换 例(-￥50 (≈ -$7.43))
 * @param money 人民币
 * @param curMoney 当前货币额
 * @param curSym 当前货币
 * 
 */
function curMoneyTrans(money, sym, curMoney, curSym) {
  let result = ''

  // 人民币 ￥ 转换格式
  let moneyTrans = ''
  let moneyAbS = Math.abs(money)
  moneyTrans = sym + moneyAbS

  if (money < 0) {
    moneyTrans = '-' + sym + moneyAbS
  }

  // 当前货币额 curSym 格式转换
  let curMoneyTrans = ''
  let curMoneyAbs = Math.abs(curMoney)
  curMoneyTrans = '\r\n' + '≈ ' + curSym + curMoneyAbs

  if (curMoney < 0) {
    curMoneyTrans = '\r\n' + '≈ -' + curSym + curMoneyAbs
  }

  if (curSym === sym) {
    curMoneyTrans = ''
  }

  result = moneyTrans + curMoneyTrans
  return result
}

// 复制逻辑，处理兼容性
function copyValue(text, event) {
  //浏览器禁用了非安全域的 navigator.clipboard 对象
  //在线上环境会报错 TypeError: Cannot read properties of undefined (reading 'writeText')
  if (!navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text)
  } else {
    return new Promise((resolve, reject) =>{
      if (document.execCommand('copy')) {
        // 创建标签，并隐藏
        const textArea = document.createElement('textarea')
        textArea.style.position = 'fixed'
        textArea.style.top = textArea.style.left = '-100vh'
        textArea.style.opacity = '0'
        textArea.value = text
        document.body.appendChild(textArea)
        // 聚焦、复制
        // textArea.focus()
        textArea.select()
        document.execCommand('copy')
        resolve()
      } else {
        // 配置 Clipboard 兼顾ios
        // 目标元素
        let element = event.target
        
        element.setAttribute('data-clipboard-text', text)
        console.log(element, text);
        const clipboard = new Clipboard(element, {
          text: () => text
        })

        clipboard.on('success', function () {
          clipboard.destroy();
          resolve()
        });
        clipboard.on('error', function () {
          clipboard.destroy();
          reject()
        });
      }
    })
    // 判断是否支持拷贝
    if (!document.execCommand('copy')) return Promise.reject()
    // 创建标签，并隐藏
    const textArea = document.createElement('textarea')
    textArea.style.position = 'fixed'
    textArea.style.top = textArea.style.left = '-100vh'
    textArea.style.opacity = '0'
    textArea.value = text
    document.body.appendChild(textArea)
    // 聚焦、复制
    // textArea.focus()
    textArea.select()
    return new Promise((resolve, reject) => {
      // 不知为何，必须写这个三目，不然copy不上
      document.execCommand('copy') ? resolve() : reject()
      textArea.remove()
    })
  }
}

export default {
  randomCharacter,
  formatDate,
  formatYMDate,
  formatMHMDate,
  throttle,
  curMoneyTrans,
  copyValue
}
