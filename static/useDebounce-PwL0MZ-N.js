import{i as s}from"./index-DlbEHA2w.js";import{h as l}from"./moment-BYTvHWBW.js";import{a as n,Y as d}from"./vue-utQA5pq8.js";const T=e=>s({url:"/api/users",method:"GET",params:e}),h=e=>s({url:"/api/users",method:"POST",data:e}),E=(e,o)=>s({url:`/api/users/${e}`,method:"PUT",data:o}),v=e=>s({url:`/api/users/${e}`,method:"DELETE"}),A=e=>s({url:"/api/users/deleteList",method:"GET",params:e}),D=e=>s({url:`/api/users/deleteList/${e}`,method:"DELETE"}),I=e=>s({url:`/api/users/restore/${e}`,method:"PUT"}),U=e=>l(e).format("YYYY-MM-DD HH:mm:ss")||"";function Y(e,o,a=!1){const t=n(null),u=(...r)=>{const m=()=>{t.value=null,a||e(...r)},i=a&&!t.value;t.value&&clearTimeout(t.value),t.value=setTimeout(m,o),i&&e(...r)};return d(()=>{t.value&&clearTimeout(t.value)}),u}export{U as a,h as b,E as c,v as d,A as e,D as f,T as g,I as r,Y as u};
