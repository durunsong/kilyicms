import{d as S,_ as D,l as N,C as k,m as O,h as U,f as A}from"./index-B-sGP41S.js";import{m as v,ai as p,p as c,q as b,V as w,u as a,a as h,f as C,M as m,O as f,T as W,U as L,a8 as P,F as H,e as $,Y as z,aG as F,R as G,S as Q}from"./vue-utQA5pq8.js";import"./element-DFbVGgsZ.js";const Y={class:"app-container center"},q=v({__name:"Admin",setup(l){const{t:o}=S();return(n,r)=>{const i=p("el-empty");return c(),b("div",Y,[w(i,{description:a(o)("hello_admin_page",{admin:"admin"})},null,8,["description"])])}}}),J=D(q,[["__scopeId","data-v-39a6079a"]]),K={class:"app-container center"},R=v({__name:"User",setup(l){const{t:o}=S();return(n,r)=>{const i=p("el-empty");return c(),b("div",K,[w(i,{description:a(o)("hello_editor_page",{user:"user"})},null,8,["description"])])}}}),j=D(R,[["__scopeId","data-v-ef274ee7"]]),X=v({__name:"index",props:["data"],emits:["change","prev","next","skip","update:modelValue"],setup(l,{emit:o}){const{t:n}=S(),r=l,i=o,e=h(0),_=h(!1),d=C(()=>{let s="";return e.value===0?s=n("tour_start"):e.value===r.data.length-1?s=n("tour_complete"):s=n("tour_nextStep",{currentStep:e.value+1,totalSteps:r.data.length}),s}),g=s=>{s!==e.value&&(e.value=s,i("change",s))},V=()=>{e.value=0,_.value=!1,i("update:modelValue",!1),i("skip"),N(k.IS_SHOW_Tour_Visible,!0)},M=()=>{e.value>0&&(e.value-=1,i("prev",e.value))},y=()=>{e.value<r.data.length-1?(e.value+=1,i("next",e.value)):V()};return(s,x)=>{const B=p("el-tour-step"),I=p("el-button"),T=p("el-tour");return c(),m(T,{modelValue:_.value,"onUpdate:modelValue":x[0]||(x[0]=u=>_.value=u),"show-close":!1,onChange:g},{indicators:f(()=>[w(I,{size:"small",onClick:V},{default:f(()=>[W(L(a(n)("tour_skip")),1)]),_:1})]),default:f(()=>[(c(!0),b(H,null,P(r.data,(u,E)=>(c(),m(B,{key:E,target:u.target,title:u.title?u.title:a(n)("tour_step",{currentStep:e.value+1}),description:u.description,"prev-button-props":{children:a(n)("tour_prev"),onClick:M},"next-button-props":{children:d.value,onClick:y},placement:u.placement},null,8,["target","title","description","prev-button-props","next-button-props","placement"]))),128))]),_:1},8,["modelValue"])}}}),{t}=O.global,Z=[{title:t("tour_welcomeTitle"),description:t("tour_welcomeDescription")},{target:"#el_tour_visible_1",title:"",description:t("tour_menuDescription"),placement:"right"},{target:"#el_tour_visible_2",title:"",description:t("tour_toggleButtonDescription"),placement:"bottom"},{target:"#el_tour_visible_3",title:"",description:t("tour_breadcrumbDescription"),placement:"bottom"},{target:"#el_tour_visible_4",title:"",description:t("tour_tabNavigationDescription"),placement:"bottom"},{target:"#el_tour_visible_5",title:"",description:t("tour_menuSearchDescription"),placement:"bottom"},{target:"#el_tour_visible_6",title:"",description:t("tour_fullscreenDescription"),placement:"bottom"},{target:"#el_tour_visible_7",title:"",description:t("tour_themeSwitchDescription"),placement:"bottom"},{target:"#el_tour_visible_8",title:t("tour_languageSwitchTitle"),description:t("tour_languageSwitchDescription"),placement:"bottom"},{target:"#el_tour_visible_9",title:"",description:t("tour_notificationDescription"),placement:"bottom"},{target:"#el_tour_visible_10",title:"",description:t("tour_userSettingsDescription"),placement:"bottom"},{target:"#el_tour_visible_11",title:t("tour_customSettingsTitle"),description:t("tour_customSettingsDescription"),placement:"left"}];function ee(){const l=h(!1),o=()=>{l.value=window.innerWidth<=768||!!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/)};return $(()=>{o(),window.addEventListener("resize",o)}),z(()=>{window.removeEventListener("resize",o)}),C(()=>l.value)}const ie=v({__name:"index",props:{modelValue:{default:!0},modelModifiers:{}},emits:["update:modelValue"],setup(l){const o=U(k.IS_SHOW_Tour_Visible),n=ee(),r=F(l,"modelValue"),e=A().roles.includes("admin");return(_,d)=>(c(),b("div",null,[(c(),m(G(a(e)?J:j))),!a(n)&&!a(o)?(c(),m(X,{key:0,modelValue:r.value,"onUpdate:modelValue":d[0]||(d[0]=g=>r.value=g),data:a(Z)},null,8,["modelValue","data"])):Q("",!0)]))}});export{ie as default};