import{d as k,_ as x,l as O,C,h as $,f as A}from"./index-CK77dANC.js";import{m as v,ai as u,p as s,q as b,V as h,u as r,a as g,f as S,M as m,O as f,T as N,a8 as T,F as U,e as W,Y as L,aG as P,R as D,S as H}from"./vue-utQA5pq8.js";import"./element-DFbVGgsZ.js";const z={class:"app-container center"},F=v({__name:"Admin",setup(l){const{t}=k();return(a,o)=>{const e=u("el-empty");return s(),b("div",z,[h(e,{description:r(t)("hello_admin_page",{admin:"admin"})},null,8,["description"])])}}}),G=x(F,[["__scopeId","data-v-39a6079a"]]),Q={class:"app-container center"},Y=v({__name:"User",setup(l){const{t}=k();return(a,o)=>{const e=u("el-empty");return s(),b("div",Q,[h(e,{description:r(t)("hello_editor_page",{user:"user"})},null,8,["description"])])}}}),q=x(Y,[["__scopeId","data-v-ef274ee7"]]),J=v({__name:"index",props:["data"],emits:["change","prev","next","skip","update:modelValue"],setup(l,{emit:t}){const a=l,o=t,e=g(0),c=g(!1),V=S(()=>{let n="";return e.value===0?n="开始":e.value===a.data.length-1?n="完成":n=`下一步（${e.value+1} / ${a.data.length}）`,n}),p=n=>{n!==e.value&&(e.value=n,o("change",n))},d=()=>{e.value=0,c.value=!1,o("update:modelValue",!1),o("skip"),O(C.IS_SHOW_Tour_Visible,!0)},w=()=>{e.value>0&&(e.value-=1,o("prev",e.value))},M=()=>{e.value<a.data.length-1?(e.value+=1,o("next",e.value)):d()};return(n,_)=>{const y=u("el-tour-step"),B=u("el-button"),I=u("el-tour");return s(),m(I,{modelValue:c.value,"onUpdate:modelValue":_[0]||(_[0]=i=>c.value=i),"show-close":!1,onChange:p},{indicators:f(()=>[h(B,{size:"small",onClick:d},{default:f(()=>_[1]||(_[1]=[N("跳过")])),_:1})]),default:f(()=>[(s(!0),b(U,null,T(a.data,(i,E)=>(s(),m(y,{key:E,target:i.target,title:i.title?i.title:`第${e.value+1}步`,description:i.description,"prev-button-props":{children:"上一步",onClick:w},"next-button-props":{children:V.value,onClick:M},placement:i.placement},null,8,["target","title","description","prev-button-props","next-button-props","placement"]))),128))]),_:1},8,["modelValue"])}}}),K=[{title:"欢迎来到kilyicms",description:"点击继续开始介绍"},{target:"#el_tour_visible_1",title:"",description:"左边菜单栏",placement:"right"},{target:"#el_tour_visible_2",title:"",description:"展开折叠按钮",placement:"bottom"},{target:"#el_tour_visible_3",title:"",description:"面包屑导航",placement:"bottom"},{target:"#el_tour_visible_4",title:"",description:"标签页导航",placement:"bottom"},{target:"#el_tour_visible_5",title:"",description:"菜单搜索",placement:"bottom"},{target:"#el_tour_visible_6",title:"",description:"全屏切换",placement:"bottom"},{target:"#el_tour_visible_7",title:"",description:"主题切换",placement:"bottom"},{target:"#el_tour_visible_8",title:"国际化",description:"多语言切换",placement:"bottom"},{target:"#el_tour_visible_9",title:"",description:"消息通知",placement:"bottom"},{target:"#el_tour_visible_10",title:"",description:"个人设置",placement:"bottom"},{target:"#el_tour_visible_11",title:"自定义设置",description:"系统设置",placement:"left"}];function R(){const l=g(!1),t=()=>{l.value=window.innerWidth<=768||!!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/)};return W(()=>{t(),window.addEventListener("resize",t)}),L(()=>{window.removeEventListener("resize",t)}),S(()=>l.value)}const ee=v({__name:"index",props:{modelValue:{default:!0},modelModifiers:{}},emits:["update:modelValue"],setup(l){const t=$(C.IS_SHOW_Tour_Visible),a=R(),o=P(l,"modelValue"),c=A().roles.includes("admin");return(V,p)=>(s(),b("div",null,[(s(),m(D(r(c)?G:q))),!r(a)&&!r(t)?(s(),m(J,{key:0,modelValue:o.value,"onUpdate:modelValue":p[0]||(p[0]=d=>o.value=d),data:r(K)},null,8,["modelValue","data"])):H("",!0)]))}});export{ee as default};
