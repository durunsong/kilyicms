import{u as i}from"./useWatermark-BYaDQ1s9.js";import{d as w,_ as g}from"./index-CbEXVRfY.js";import{m as C,a as y,ai as k,p as v,q as W,t as p,U as o,u as e,V as r,O as l,T as s}from"./vue-BQgErKdm.js";import"./element-OgKPM7dr.js";const x={class:"app-container"},$=C({__name:"use-watermark",setup(V){const{t:a}=w(),c=y(null),{setWatermark:m,clearWatermark:u}=i(c),{setWatermark:d,clearWatermark:b}=i();return(B,t)=>{const n=k("el-button"),f=k("el-button-group");return v(),W("div",x,[p("h4",null,o(e(a)("demo_description",{hook:"hook"})),1),p("div",{ref_key:"localRef",ref:c,class:"local"},null,512),r(f,null,{default:l(()=>[r(n,{type:"primary",onClick:t[0]||(t[0]=_=>e(m)(e(a)("create_local_watermark"),{color:"#409eff"}))},{default:l(()=>[s(o(e(a)("create_local_watermark")),1)]),_:1}),r(n,{type:"warning",onClick:t[1]||(t[1]=_=>e(m)(e(a)("disable_defense_local_watermark"),{color:"#e6a23c",defense:!1}))},{default:l(()=>[s(o(e(a)("disable_defense_local_watermark")),1)]),_:1}),r(n,{type:"danger",onClick:e(u)},{default:l(()=>[s(o(e(a)("clear_local_watermark")),1)]),_:1},8,["onClick"])]),_:1}),r(f,null,{default:l(()=>[r(n,{type:"primary",onClick:t[2]||(t[2]=_=>e(d)(e(a)("create_global_watermark"),{color:"#409eff"}))},{default:l(()=>[s(o(e(a)("create_global_watermark")),1)]),_:1}),r(n,{type:"warning",onClick:t[3]||(t[3]=_=>e(d)(e(a)("disable_defense_global_watermark"),{color:"#e6a23c",defense:!1}))},{default:l(()=>[s(o(e(a)("disable_defense_global_watermark")),1)]),_:1}),r(n,{type:"danger",onClick:e(b)},{default:l(()=>[s(o(e(a)("clear_global_watermark")),1)]),_:1},8,["onClick"])]),_:1})])}}}),T=g($,[["__scopeId","data-v-d103cf44"]]);export{T as default};