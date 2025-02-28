import{m as p,d as f}from"./index-C3BKKuhD.js";import{b as y,c as i}from"./element-19ICOdZE.js";import{x as h,y as S,A as k,P as l,M as r,u as n,H as u,ag as w,L as _,z as x}from"./vue-CzfBvKis.js";const{t:C}=p.global,E={lock:!0,text:C("message_loading")},d=(s,e={})=>{let t;return async(...a)=>{try{return t=y.service({...E,...e}),await s(...a)}finally{t==null||t.close()}}},{t:g}=p.global,b={code:0,data:{list:[]},message:g("Get_Success")};function A(s){return new Promise(e=>{setTimeout(()=>{e({...b,data:{list:s}})},1e3)})}function v(){return new Promise((s,e)=>{setTimeout(()=>{e(new Error(g("error_occurs")))},1e3)})}const L={class:"app-container"},q=`
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`,T=h({__name:"use-fullscreen-loading",setup(s){const{t:e}=f(),t={text:e("error_about_occur"),background:"#F56C6C20",svg:q,svgViewBox:"-10, -10, 50, 50"},a=async()=>{const o=await d(A)([2,3,3]);i.success(`${o.message}，${e("pass_argument_as")} ${o.data.list.toString()}`)},m=async()=>{try{await d(v,t)()}catch(o){i.error(o.message)}};return(o,B)=>{const c=w("el-button");return x(),S("div",L,[k("h4",null,r(n(e)("loading_demo_description",{hook:"hook",loading:"loading"})),1),l(c,{type:"primary",onClick:a},{default:u(()=>[_(r(n(e)("query_success")),1)]),_:1}),l(c,{type:"danger",onClick:m},{default:u(()=>[_(r(n(e)("query_failed")),1)]),_:1})])}}});export{T as default};
