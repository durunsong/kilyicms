import{m as p,d as f}from"./index-CbEXVRfY.js";import{b as y,d as i}from"./element-OgKPM7dr.js";import{m as h,ai as S,p as k,q as w,t as C,U as r,u as n,V as l,O as u,T as d}from"./vue-BQgErKdm.js";const{t:E}=p.global,b={lock:!0,text:E("message_loading")},_=(s,e={})=>{let t;return async(...a)=>{try{return t=y.service({...b,...e}),await s(...a)}finally{t==null||t.close()}}},{t:m}=p.global,x={code:0,data:{list:[]},message:m("Get_Success")};function v(s){return new Promise(e=>{setTimeout(()=>{e({...x,data:{list:s}})},1e3)})}function A(){return new Promise((s,e)=>{setTimeout(()=>{e(new Error(m("error_occurs")))},1e3)})}const q={class:"app-container"},T=`
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`,$=h({__name:"use-fullscreen-loading",setup(s){const{t:e}=f(),t={text:e("error_about_occur"),background:"#F56C6C20",svg:T,svgViewBox:"-10, -10, 50, 50"},a=async()=>{const o=await _(v)([2,3,3]);i.success(`${o.message}，${e("pass_argument_as")} ${o.data.list.toString()}`)},g=async()=>{try{await _(A,t)()}catch(o){i.error(o.message)}};return(o,V)=>{const c=S("el-button");return k(),w("div",q,[C("h4",null,r(n(e)("loading_demo_description",{hook:"hook",loading:"loading"})),1),l(c,{type:"primary",onClick:a},{default:u(()=>[d(r(n(e)("query_success")),1)]),_:1}),l(c,{type:"danger",onClick:g},{default:u(()=>[d(r(n(e)("query_failed")),1)]),_:1})])}}});export{$ as default};
