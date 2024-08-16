// 创建webview验证码, 仅在APP-PLUS环境下有效

const htmlPath = 'http://dev-img.dressin.com/html/safeCode.html'

class CreateTurnstile {
 constructor(uniScope) {
  this.$scope = uniScope
  this.wv = this.create()
 }

 create() {
  const wv = plus.webview.create('', this.createId(), {
   background: 'transparent',
   popGesture: 'none',
   scrollIndicator: 'none',
   scrollBounce: 'none',
   bounce: 'none',
   bounceBackground: '#ffffff',
   top: '0px',
   bottom: '0px',
   left: '0px',
   right: '0px',
   // zindex: 9999
  })
  wv.loadURL(htmlPath)
  const currentWebview = this.$scope.$getAppWebview()
  currentWebview.append(wv)
  return wv
 }

 show() {
  this.wv.show()
 }
 hide() {
  this.wv.hide()
 }
 destroy() {
  this.wv.removeFromParent()
  this.wv.close()
  this.wv = null
 }
 createId() {
  return `safeCode_${Date.now()}`
 }
}

export default CreateTurnstile