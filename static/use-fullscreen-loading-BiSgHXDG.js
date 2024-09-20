import{i as m,d as g}from"./index-o-0RuYwl.js";import{t as f,a as i}from"./element-Cs03vSdE.js";import{m as y,ai as h,p as S,q as k,t as w,T as r,u as n,U as l,O as u,S as d}from"./vue-0By7UTot.js";const{t:C}=m.global,E={lock:!0,text:C("message_loading")},p=(s,e={})=>{let t;return async(...a)=>{try{return t=f.service({...E,...e}),await s(...a)}finally{t==null||t.close()}}},x={code:0,data:{list:[]},message:"获取成功"};function b(s){return new Promise(e=>{setTimeout(()=>{e({...x,data:{list:s}})},1e3)})}function v(){return new Promise((s,e)=>{setTimeout(()=>{e(new Error("发生错误"))},1e3)})}const A={class:"app-container"},q=`
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`,V=y({__name:"use-fullscreen-loading",setup(s){const{t:e}=g(),t={text:e("error_about_occur"),background:"#F56C6C20",svg:q,svgViewBox:"-10, -10, 50, 50"},a=async()=>{const o=await p(b)([2,3,3]);i.success(`${o.message}，${e("pass_argument_as")} ${o.data.list.toString()}`)},_=async()=>{try{await p(v,t)()}catch(o){i.error(o.message)}};return(o,T)=>{const c=h("el-button");return S(),k("div",A,[w("h4",null,r(n(e)("loading_demo_description",{hook:"hook",loading:"loading"})),1),l(c,{type:"primary",onClick:a},{default:u(()=>[d(r(n(e)("query_success")),1)]),_:1}),l(c,{type:"danger",onClick:_},{default:u(()=>[d(r(n(e)("query_failed")),1)]),_:1})])}}});export{V as default};
