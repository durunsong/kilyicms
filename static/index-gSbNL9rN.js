import{m as ee,a as v,Z as G,e as ue,A as ce,p as V,q as B,t as y,I as O,S as J,J as j,U as P,aK as de,aL as me,ai as T,V as r,u as m,aD as fe,O as g,T as F,M as W,W as _e,aa as oe}from"./vue-utQA5pq8.js";import{L as pe,_ as ve}from"./index-Bp8DYgjV.js";import{d as ae,_ as re,f as ge,k as he}from"./index-B-sGP41S.js";import{p as we,u as le,q as Q,a as be}from"./element-DFbVGgsZ.js";const ye="/static/logo-text-2-BAee3GBA.png",U=Math.PI;function te(e,o){return e+o}function ke(e){return e*e}function ne(e,o,t,s,n,f){e.beginPath(),e.moveTo(o,t),e.arc(o+s/2,t-n+2,n,.72*U,2.26*U),e.lineTo(o+s,t),e.arc(o+s+n-2,t+s/2,n,1.21*U,2.78*U),e.lineTo(o+s,t+s),e.lineTo(o,t+s),e.arc(o+n-2,t+s/2,n+.4,2.76*U,1.24*U,!0),e.lineTo(o,t),e.lineWidth=2,e.fillStyle="rgba(255, 255, 255, 0.7)",e.strokeStyle="rgba(255, 255, 255, 0.7)",e.stroke(),e[f](),e.globalCompositeOperation="destination-over"}function Ce(e,o){const t=document.createElement("img");return t.crossOrigin="Anonymous",t.onload=o,t.onerror=()=>{t.src=H(e)},t.src=H(e),t}function Z(e,o){return Math.round(Math.random()*(o-e)+e)}function H(e){const o=e.length;return o>0?e[Z(0,o-1)]:"https://source.unsplash.com/300x150/?book,library"}function Te(e,o,t={leading:!0,trailing:!0}){const{leading:s,trailing:n,resultCallback:f}=t;let l=0,p=null;const C=function(...u){return new Promise((_,w)=>{const c=new Date().getTime();!l&&!s&&(l=c);const d=o-(c-l);if(d<=0){p&&(clearTimeout(p),p=null);const h=e.apply(this,u);f&&f(h),_(h),l=c;return}n&&!p&&(p=setTimeout(()=>{p=null,l=s?new Date().getTime():0;const h=e.apply(this,u);f&&f(h),_(h)},d))})};return C.cancel=function(){p&&clearTimeout(p),p=null,l=0},C}function Ve(){const e=G({x:0,y:0}),o=v(!1),t=v(!1),s=v(0),n=v([]);return{origin:e,success:o,isMouseDown:t,timestamp:s,trail:n,start:u=>{o.value||(u instanceof MouseEvent?(e.x=u.clientX,e.y=u.clientY):(e.x=u.changedTouches[0].pageX,e.y=u.changedTouches[0].pageY),t.value=!0,s.value=Date.now())},move:(u,_,w)=>{if(!t.value)return!1;let c=0,d=0;if(_ instanceof MouseEvent?(c=_.clientX-e.x,d=_.clientY-e.y):(c=_.changedTouches[0].pageX-e.x,d=_.changedTouches[0].pageY-e.y),c<0||c+38>=u)return!1;w(c),n.value.push(d)},end:(u,_)=>{if(!t.value||(t.value=!1,(u instanceof MouseEvent?u.clientX:u.changedTouches[0].pageX)===e.x))return!1;s.value=Date.now()-s.value,_(s.value)},verify:(u,_,w)=>{const c=n.value,d=c.reduce(te)/c.length,h=c.map($=>$-d),S=Math.sqrt(h.map(ke).reduce(te)/c.length),I=parseInt(u);return w=w<=1?1:w>10?10:w,{spliced:Math.abs(I-_)<=w,TuringTest:d!==S}}}}var Se=(e,o)=>{const t=e.__vccOpts||e;for(const[s,n]of o)t[s]=n;return t};const Ee=ee({name:"SlideVerify",props:{l:{type:Number,default:42},r:{type:Number,default:10},w:{type:Number,default:310},h:{type:Number,default:155},sliderText:{type:String,default:"Slide filled right"},accuracy:{type:Number,default:5},show:{type:Boolean,default:!0},imgs:{type:Array,default:()=>[]},interval:{type:Number,default:50}},emits:["success","again","fail","refresh"],setup(e,{emit:o}){const{imgs:t,l:s,r:n,w:f,h:l,accuracy:p,interval:C}=e,u=v(!0),_=v(0),w=v(0),c=G({containerActive:!1,containerSuccess:!1,containerFail:!1}),d=G({iconCls:"arrow-right",width:"0",left:"0"}),h=v(),S=v(),I=v(),$=v();let M;const{success:b,start:i,move:A,end:K,verify:x}=Ve(),k=()=>{var a,E;b.value=!1,c.containerActive=!1,c.containerSuccess=!1,c.containerFail=!1,d.iconCls="arrow-right",d.left="0",d.width="0",h.value.style.left="0",(a=$.value)==null||a.clearRect(0,0,f,l),(E=S.value)==null||E.clearRect(0,0,f,l),h.value.width=f,M.src=H(t)},R=()=>{k(),o("refresh")};function X(a){d.left=a+"px";let E=(f-40-20)/(f-40)*a;h.value.style.left=E+"px",c.containerActive=!0,d.width=a+"px"}function Y(a){const{spliced:E,TuringTest:D}=x(h.value.style.left,_.value,p);if(E){if(p===-1){c.containerSuccess=!0,d.iconCls="success",b.value=!0,o("success",a);return}D?(c.containerSuccess=!0,d.iconCls="success",b.value=!0,o("success",a)):(c.containerFail=!0,d.iconCls="fail",o("again"))}else c.containerFail=!0,d.iconCls="fail",o("fail"),setTimeout(()=>{k()},1e3)}const q=Te(a=>{A(f,a,X)},C),z=a=>{K(a,Y)};return ue(()=>{var a,E;const D=(a=I.value)==null?void 0:a.getContext("2d"),N=(E=h.value)==null?void 0:E.getContext("2d");$.value=D,S.value=N,M=Ce(t,()=>{u.value=!1;const L=s+n*2+3;if(_.value=Z(L+10,f-(L+10)),w.value=Z(10+n*2,l-(L+10)),D&&N){ne(D,_.value,w.value,s,n,"fill"),ne(N,_.value,w.value,s,n,"clip"),D.drawImage(M,0,0,f,l),N.drawImage(M,0,0,f,l);const se=w.value-n*2-1,ie=N.getImageData(_.value,se,L,L);h.value.width=L,N.putImageData(ie,0,se)}}),document.addEventListener("mousemove",q),document.addEventListener("mouseup",z)}),ce(()=>{document.removeEventListener("mousemove",q),document.removeEventListener("mouseup",z)}),{block:h,canvas:I,loadBlock:u,containerCls:c,sliderBox:d,refresh:R,sliderDown:i,touchStartEvent:i,touchMoveEvent:q,touchEndEvent:z}}}),Ie=e=>(de("data-v-f61c42f2"),e=e(),me(),e),Pe=["width","height"],Me=Ie(()=>y("i",{class:"iconfont icon-refresh"},null,-1)),xe=[Me],Be=["width","height"],$e={class:"slide-verify-slider-text"};function Ae(e,o,t,s,n,f){return V(),B("div",{id:"slideVerify",class:"slide-verify",style:j({width:e.w+"px"}),onselectstart:"return false;"},[y("div",{class:O({"slider-verify-loading":e.loadBlock})},null,2),y("canvas",{ref:"canvas",width:e.w,height:e.h},null,8,Pe),e.show?(V(),B("div",{key:0,class:"slide-verify-refresh-icon",onClick:o[0]||(o[0]=(...l)=>e.refresh&&e.refresh(...l))},xe)):J("",!0),y("canvas",{ref:"block",width:e.w,height:e.h,class:"slide-verify-block"},null,8,Be),y("div",{class:O(["slide-verify-slider",{"container-active":e.containerCls.containerActive,"container-success":e.containerCls.containerSuccess,"container-fail":e.containerCls.containerFail}])},[y("div",{class:"slide-verify-slider-mask",style:j({width:e.sliderBox.width})},[y("div",{class:"slide-verify-slider-mask-item",style:j({left:e.sliderBox.left}),onMousedown:o[1]||(o[1]=(...l)=>e.sliderDown&&e.sliderDown(...l)),onTouchstart:o[2]||(o[2]=(...l)=>e.touchStartEvent&&e.touchStartEvent(...l)),onTouchmove:o[3]||(o[3]=(...l)=>e.touchMoveEvent&&e.touchMoveEvent(...l)),onTouchend:o[4]||(o[4]=(...l)=>e.touchEndEvent&&e.touchEndEvent(...l))},[y("i",{class:O(["slide-verify-slider-mask-item-icon","iconfont",`icon-${e.sliderBox.iconCls}`])},null,2)],36)],4),y("span",$e,P(e.sliderText),1)],2)],4)}var Re=Se(Ee,[["render",Ae],["__scopeId","data-v-f61c42f2"]]);const De="/static/slideimg-1--qdnIjPW.png",Ne="/static/slideimg-2-DwQUL8ig.png",Le="/static/slideimg-3-BzV2SpF7.png",Ue="/static/slideimg-4-BN6kYQr-.png",qe="/static/slideimg-5-BnLnt_Rw.png",ze="/static/slideimg-6-Cwx9GuW1.png",Fe={class:"slide_box1"},Xe={class:"slide_inner_box"},Ye=ee({__name:"index",emits:["again","success","fail","refresh","close"],setup(e,{emit:o}){const{t}=ae(),s=v(""),n=v([De,Ne,Le,Ue,qe,ze]),f=v(),l=o,p=v(""),C=()=>{var d;s.value=t("non_human_operation_detected"),p.value="red",(d=f.value)==null||d.refresh()},u=d=>{s.value=t("successful_which_takes")+(d/1e3).toFixed(1)+t("seconds"),p.value="green",l("success")},_=()=>{s.value="",l("close")},w=()=>{s.value=t("Verification_failed"),p.value="red",setTimeout(()=>{s.value=""},1e3)},c=()=>{s.value=""};return(d,h)=>{const S=T("el-button");return V(),B("div",Fe,[r(S,{icon:m(we),size:"small",class:"slider_close_btn",circle:"",onClick:_},null,8,["icon"]),y("div",Xe,[r(m(Re),{class:"slide_box",ref_key:"block",ref:f,"slider-text":m(t)("swipe_right"),accuracy:1,onAgain:C,onSuccess:u,onFail:w,onRefresh:c,imgs:n.value},null,8,["slider-text","imgs"]),y("div",{class:"msg_box",style:j("color:"+p.value)},P(s.value),5)])])}}}),Oe=re(Ye,[["__scopeId","data-v-dffbe238"]]),je={class:"login_container"},Ge={class:"theme-switch-container"},Ke={key:0},We={key:1},Qe={key:0,class:"slide_verify_right"},Je={class:"button_side"},Ze={class:"toggle-form button_login_side"},He={class:"button_side"},es={class:"toggle-form button_register_side"},ss=ee({__name:"index",setup(e){const o=v(!1),t=v(!1),{t:s}=ae(),n=v(!1),f=fe(),l=G({user_name:"admin",password:"123456",confirmPassword:void 0,roles:void 0}),p=v("admin"),C=v(null),u=v(!1),_={user_name:[{required:!0,message:s("Please_enter_your_username"),trigger:"blur"}],password:[{required:!0,message:s("Please_enter_your_password"),trigger:"blur"}]},w={user_name:[{required:!0,message:s("Please_enter_your_username"),trigger:"blur"}],password:[{required:!0,message:s("Please_enter_your_password"),trigger:"blur"}],confirmPassword:[{required:!0,message:s("Please_confirm_the_password"),trigger:"blur"}],roles:[{required:!0,message:s("Please_select_your_role"),trigger:"blur"}]},c=b=>{b==="admin"?Object.assign(l,{user_name:"admin",password:"123456",confirmPassword:void 0,roles:void 0}):Object.assign(l,{user_name:"user",password:"123456",confirmPassword:void 0,roles:void 0})},d=()=>{setTimeout(()=>{t.value=!0,o.value=!1,h()},1e3)},h=()=>{n.value=!0;const b=l;ge().login(b).then(()=>{f.push({path:"/"})}).finally(()=>{n.value=!1})},S=()=>{var b;(b=C.value)==null||b.validate(i=>{i?t.value?h():o.value=!0:n.value=!1})},I=()=>{u.value=!u.value,t.value=!1},$=()=>{n.value=!0;const b=l;b.roles=[b.roles],he(b).then(i=>{i.status===200&&(be({message:i.message,type:"success"}),I())}).finally(()=>{n.value=!1})},M=()=>{var i;const b=l;Array.isArray(b.roles)&&(b.roles=void 0),(i=C.value)==null||i.validate(A=>{A&&$()})};return(b,i)=>{const A=T("el-radio-button"),K=T("el-radio-group"),x=T("el-input"),k=T("el-form-item"),R=T("el-button"),X=T("el-form"),Y=T("el-option"),q=T("el-select"),z=T("el-card");return V(),B("div",je,[y("div",Ge,[r(pe),r(ve,{class:"theme-switch"})]),r(z,{class:O(["box_login_card",u.value?"box_card_style":""])},{default:g(()=>[i[8]||(i[8]=y("div",{class:"title"},[y("img",{src:ye})],-1)),u.value?(V(),B("h3",We,P(m(s)("user_register")),1)):(V(),B("h3",Ke,[F(P(m(s)("user_login"))+" ",1),u.value?J("",!0):(V(),W(K,{key:0,modelValue:p.value,"onUpdate:modelValue":i[0]||(i[0]=a=>p.value=a),onChange:c},{default:g(()=>[r(A,{label:"admin",value:"admin"}),r(A,{label:"user",value:"user"})]),_:1},8,["modelValue"]))])),r(_e,{name:"el-fade-in-linear"},{default:g(()=>[u.value?(V(),W(X,{key:1,model:l,rules:w,class:"register_form",ref_key:"ref_form",ref:C,onKeyup:oe(M,["enter"])},{default:g(()=>[r(k,{prop:"user_name",label:m(s)("user_name"),"label-width":"100px"},{default:g(()=>[r(x,{modelValue:l.user_name,"onUpdate:modelValue":i[4]||(i[4]=a=>l.user_name=a),modelModifiers:{trim:!0},placeholder:m(s)("Please_enter_your_username"),size:"large","prefix-icon":m(le)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["label"]),r(k,{prop:"password",label:m(s)("password"),"label-width":"100px"},{default:g(()=>[r(x,{size:"large",modelValue:l.password,"onUpdate:modelValue":i[5]||(i[5]=a=>l.password=a),modelModifiers:{trim:!0},"show-password":"",placeholder:m(s)("Please_confirm_the_password"),"prefix-icon":m(Q)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["label"]),r(k,{prop:"confirmPassword",label:m(s)("confirm_password"),"label-width":"100px"},{default:g(()=>[r(x,{size:"large",modelValue:l.confirmPassword,"onUpdate:modelValue":i[6]||(i[6]=a=>l.confirmPassword=a),modelModifiers:{trim:!0},"show-password":"",placeholder:m(s)("Please_confirm_the_password"),"prefix-icon":m(Q)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["label"]),r(k,{"label-width":"100px",prop:"roles",label:m(s)("character")},{default:g(()=>[r(q,{modelValue:l.roles,"onUpdate:modelValue":i[7]||(i[7]=a=>l.roles=a),placeholder:m(s)("Selecting_a_Character")},{default:g(()=>[r(Y,{size:"large",label:"Admin",value:"admin"}),r(Y,{size:"large",label:"User",value:"user"})]),_:1},8,["modelValue","placeholder"])]),_:1},8,["label"]),r(k,null,{default:g(()=>[y("div",He,[r(R,{class:"submit_but",type:"primary",onClick:M,loading:n.value},{default:g(()=>[F(P(m(s)("router_register")),1)]),_:1},8,["loading"])])]),_:1}),r(k,null,{default:g(()=>[y("div",es,[r(R,{class:"side_btn",link:"",onClick:I},{default:g(()=>[F(P(m(s)("Go_and_log_in")),1)]),_:1})])]),_:1})]),_:1},8,["model"])):(V(),W(X,{key:0,model:l,rules:_,class:"login_form",ref_key:"ref_form",ref:C,onKeyup:oe(S,["enter"])},{default:g(()=>[r(k,{prop:"user_name",label:m(s)("user_name"),"label-width":"100px"},{default:g(()=>[r(x,{modelValue:l.user_name,"onUpdate:modelValue":i[1]||(i[1]=a=>l.user_name=a),modelModifiers:{trim:!0},placeholder:m(s)("Please_enter_your_username"),size:"large","prefix-icon":m(le)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["label"]),r(k,{prop:"password",label:m(s)("password"),"label-width":"100px"},{default:g(()=>[r(x,{size:"large",modelValue:l.password,"onUpdate:modelValue":i[2]||(i[2]=a=>l.password=a),modelModifiers:{trim:!0},"show-password":"",placeholder:m(s)("Please_enter_your_password"),"prefix-icon":m(Q)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["label"]),o.value?(V(),B("div",Qe,[r(Oe,{onSuccess:d,onClose:i[3]||(i[3]=a=>o.value=!1)})])):J("",!0),r(k,null,{default:g(()=>[y("div",Je,[r(R,{class:"submit_but",type:"primary",onClick:S,loading:n.value},{default:g(()=>[F(P(m(s)("login")),1)]),_:1},8,["loading"])])]),_:1}),r(k,null,{default:g(()=>[y("div",Ze,[r(R,{class:"side_btn",link:"",onClick:I},{default:g(()=>[F(P(m(s)("Go_to_Register")),1)]),_:1})])]),_:1})]),_:1},8,["model"]))]),_:1})]),_:1},8,["class"])])}}}),as=re(ss,[["__scopeId","data-v-d0532195"]]);export{as as default};
