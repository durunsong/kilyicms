import{m as p,d as f}from"./index-p1n-EO1n.js";import{b as y,c as i}from"./element-Z4L7BiFU.js";import{x as h,y as S,A as k,Q as l,O as r,u as n,I as u,al as w,M as _,z as x}from"./vue-upKi_HIV.js";const{t:C}=p.global,E={lock:!0,text:C("message_loading")},d=(s,e={})=>{let t;return async(...a)=>{try{return t=y.service({...E,...e}),await s(...a)}finally{t==null||t.close()}}},{t:m}=p.global,b={code:0,data:{list:[]},message:m("Get_Success")};function A(s){return new Promise(e=>{setTimeout(()=>{e({...b,data:{list:s}})},1e3)})}function v(){return new Promise((s,e)=>{setTimeout(()=>{e(new Error(m("error_occurs")))},1e3)})}const q={class:"app-container"},B=`
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`,V=h({__name:"use-fullscreen-loading",setup(s){const{t:e}=f(),t={text:e("error_about_occur"),background:"#F56C6C20",svg:B,svgViewBox:"-10, -10, 50, 50"},a=async()=>{const o=await d(A)([2,3,3]);i.success(`${o.message}，${e("pass_argument_as")} ${o.data.list.toString()}`)},g=async()=>{try{await d(v,t)()}catch(o){i.error(o.message)}};return(o,L)=>{const c=w("el-button");return x(),S("div",q,[k("h4",null,r(n(e)("loading_demo_description",{hook:"hook",loading:"loading"})),1),l(c,{type:"primary",onClick:a},{default:u(()=>[_(r(n(e)("query_success")),1)]),_:1}),l(c,{type:"danger",onClick:g},{default:u(()=>[_(r(n(e)("query_failed")),1)]),_:1})])}}});export{V as default};
