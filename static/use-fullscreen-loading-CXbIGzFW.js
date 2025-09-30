import{m as p,d as f}from"./index-n9fM5Zhe.js";import{b as y,c as i}from"./element-BaWQJB8U.js";import{y as h,z as S,B as k,R as l,P as r,u as n,J as u,al as w,O as d,A as C}from"./vue-CDBYdBif.js";const{t:E}=p.global,b={lock:!0,text:E("message_loading")},_=(t,e={})=>{let o;return async(...a)=>{try{return o=y.service({...b,...e}),await t(...a)}finally{o?.close()}}},{t:g}=p.global,x={code:0,data:{list:[]},message:g("Get_Success")};function A(t){return new Promise(e=>{setTimeout(()=>{e({...x,data:{list:t}})},1e3)})}function v(){return new Promise((t,e)=>{setTimeout(()=>{e(new Error(g("error_occurs")))},1e3)})}const B={class:"app-container"},q=`
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`,V=h({__name:"use-fullscreen-loading",setup(t){const{t:e}=f(),o={text:e("error_about_occur"),background:"#F56C6C20",svg:q,svgViewBox:"-10, -10, 50, 50"},a=async()=>{const s=await _(A)([2,3,3]);i.success(`${s.message}，${e("pass_argument_as")} ${s.data.list.toString()}`)},m=async()=>{try{await _(v,o)()}catch(s){i.error(s.message)}};return(s,L)=>{const c=w("el-button");return C(),S("div",B,[k("h4",null,r(n(e)("loading_demo_description",{hook:"hook",loading:"loading"})),1),l(c,{type:"primary",onClick:a},{default:u(()=>[d(r(n(e)("query_success")),1)]),_:1}),l(c,{type:"danger",onClick:m},{default:u(()=>[d(r(n(e)("query_failed")),1)]),_:1})])}}});export{V as default};
