import{m as ee,a as v,Z as G,e as ue,A as ce,p as V,q as B,t as y,I as O,S as Q,J as j,U as P,aJ as de,aK as me,ai as T,V as i,u as m,aD as fe,O as g,T as F,M as W,W as _e,aa as le}from"./vue-BQgErKdm.js";import{L as pe,_ as ve}from"./index-CekJFYKV.js";import{d as ae,_ as re,f as ge,k as he}from"./index-CbEXVRfY.js";import{p as we,u as oe,q as J,a as be}from"./element-OgKPM7dr.js";const ye="/kilyicms/static/logo-text-2-BAee3GBA.png",q=Math.PI;function te(e,l){return e+l}function ke(e){return e*e}function ne(e,l,t,s,n,f){e.beginPath(),e.moveTo(l,t),e.arc(l+s/2,t-n+2,n,.72*q,2.26*q),e.lineTo(l+s,t),e.arc(l+s+n-2,t+s/2,n,1.21*q,2.78*q),e.lineTo(l+s,t+s),e.lineTo(l,t+s),e.arc(l+n-2,t+s/2,n+.4,2.76*q,1.24*q,!0),e.lineTo(l,t),e.lineWidth=2,e.fillStyle="rgba(255, 255, 255, 0.7)",e.strokeStyle="rgba(255, 255, 255, 0.7)",e.stroke(),e[f](),e.globalCompositeOperation="destination-over"}function Ce(e,l){const t=document.createElement("img");return t.crossOrigin="Anonymous",t.onload=l,t.onerror=()=>{t.src=H(e)},t.src=H(e),t}function Z(e,l){return Math.round(Math.random()*(l-e)+e)}function H(e){const l=e.length;return l>0?e[Z(0,l-1)]:"https://source.unsplash.com/300x150/?book,library"}function Te(e,l,t={leading:!0,trailing:!0}){const{leading:s,trailing:n,resultCallback:f}=t;let o=0,p=null;const C=function(...u){return new Promise((_,w)=>{const c=new Date().getTime();!o&&!s&&(o=c);const d=l-(c-o);if(d<=0){p&&(clearTimeout(p),p=null);const h=e.apply(this,u);f&&f(h),_(h),o=c;return}n&&!p&&(p=setTimeout(()=>{p=null,o=s?new Date().getTime():0;const h=e.apply(this,u);f&&f(h),_(h)},d))})};return C.cancel=function(){p&&clearTimeout(p),p=null,o=0},C}function Ve(){const e=G({x:0,y:0}),l=v(!1),t=v(!1),s=v(0),n=v([]);return{origin:e,success:l,isMouseDown:t,timestamp:s,trail:n,start:u=>{l.value||(u instanceof MouseEvent?(e.x=u.clientX,e.y=u.clientY):(e.x=u.changedTouches[0].pageX,e.y=u.changedTouches[0].pageY),t.value=!0,s.value=Date.now())},move:(u,_,w)=>{if(!t.value)return!1;let c=0,d=0;if(_ instanceof MouseEvent?(c=_.clientX-e.x,d=_.clientY-e.y):(c=_.changedTouches[0].pageX-e.x,d=_.changedTouches[0].pageY-e.y),c<0||c+38>=u)return!1;w(c),n.value.push(d)},end:(u,_)=>{if(!t.value||(t.value=!1,(u instanceof MouseEvent?u.clientX:u.changedTouches[0].pageX)===e.x))return!1;s.value=Date.now()-s.value,_(s.value)},verify:(u,_,w)=>{const c=n.value,d=c.reduce(te)/c.length,h=c.map($=>$-d),S=Math.sqrt(h.map(ke).reduce(te)/c.length),E=parseInt(u);return w=w<=1?1:w>10?10:w,{spliced:Math.abs(E-_)<=w,TuringTest:d!==S}}}}var Se=(e,l)=>{const t=e.__vccOpts||e;for(const[s,n]of l)t[s]=n;return t};const Ie=ee({name:"SlideVerify",props:{l:{type:Number,default:42},r:{type:Number,default:10},w:{type:Number,default:310},h:{type:Number,default:155},sliderText:{type:String,default:"Slide filled right"},accuracy:{type:Number,default:5},show:{type:Boolean,default:!0},imgs:{type:Array,default:()=>[]},interval:{type:Number,default:50}},emits:["success","again","fail","refresh"],setup(e,{emit:l}){const{imgs:t,l:s,r:n,w:f,h:o,accuracy:p,interval:C}=e,u=v(!0),_=v(0),w=v(0),c=G({containerActive:!1,containerSuccess:!1,containerFail:!1}),d=G({iconCls:"arrow-right",width:"0",left:"0"}),h=v(),S=v(),E=v(),$=v();let M;const{success:b,start:a,move:R,end:K,verify:x}=Ve(),k=()=>{var r,I;b.value=!1,c.containerActive=!1,c.containerSuccess=!1,c.containerFail=!1,d.iconCls="arrow-right",d.left="0",d.width="0",h.value.style.left="0",(r=$.value)==null||r.clearRect(0,0,f,o),(I=S.value)==null||I.clearRect(0,0,f,o),h.value.width=f,M.src=H(t)},A=()=>{k(),l("refresh")};function X(r){d.left=r+"px";let I=(f-40-20)/(f-40)*r;h.value.style.left=I+"px",c.containerActive=!0,d.width=r+"px"}function Y(r){const{spliced:I,TuringTest:D}=x(h.value.style.left,_.value,p);if(I){if(p===-1){c.containerSuccess=!0,d.iconCls="success",b.value=!0,l("success",r);return}D?(c.containerSuccess=!0,d.iconCls="success",b.value=!0,l("success",r)):(c.containerFail=!0,d.iconCls="fail",l("again"))}else c.containerFail=!0,d.iconCls="fail",l("fail"),setTimeout(()=>{k()},1e3)}const L=Te(r=>{R(f,r,X)},C),z=r=>{K(r,Y)};return ue(()=>{var r,I;const D=(r=E.value)==null?void 0:r.getContext("2d"),N=(I=h.value)==null?void 0:I.getContext("2d");$.value=D,S.value=N,M=Ce(t,()=>{u.value=!1;const U=s+n*2+3;if(_.value=Z(U+10,f-(U+10)),w.value=Z(10+n*2,o-(U+10)),D&&N){ne(D,_.value,w.value,s,n,"fill"),ne(N,_.value,w.value,s,n,"clip"),D.drawImage(M,0,0,f,o),N.drawImage(M,0,0,f,o);const se=w.value-n*2-1,ie=N.getImageData(_.value,se,U,U);h.value.width=U,N.putImageData(ie,0,se)}}),document.addEventListener("mousemove",L),document.addEventListener("mouseup",z)}),ce(()=>{document.removeEventListener("mousemove",L),document.removeEventListener("mouseup",z)}),{block:h,canvas:E,loadBlock:u,containerCls:c,sliderBox:d,refresh:A,sliderDown:a,touchStartEvent:a,touchMoveEvent:L,touchEndEvent:z}}}),Ee=e=>(de("data-v-f61c42f2"),e=e(),me(),e),Pe=["width","height"],Me=Ee(()=>y("i",{class:"iconfont icon-refresh"},null,-1)),xe=[Me],Be=["width","height"],$e={class:"slide-verify-slider-text"};function Re(e,l,t,s,n,f){return V(),B("div",{id:"slideVerify",class:"slide-verify",style:j({width:e.w+"px"}),onselectstart:"return false;"},[y("div",{class:O({"slider-verify-loading":e.loadBlock})},null,2),y("canvas",{ref:"canvas",width:e.w,height:e.h},null,8,Pe),e.show?(V(),B("div",{key:0,class:"slide-verify-refresh-icon",onClick:l[0]||(l[0]=(...o)=>e.refresh&&e.refresh(...o))},xe)):Q("",!0),y("canvas",{ref:"block",width:e.w,height:e.h,class:"slide-verify-block"},null,8,Be),y("div",{class:O(["slide-verify-slider",{"container-active":e.containerCls.containerActive,"container-success":e.containerCls.containerSuccess,"container-fail":e.containerCls.containerFail}])},[y("div",{class:"slide-verify-slider-mask",style:j({width:e.sliderBox.width})},[y("div",{class:"slide-verify-slider-mask-item",style:j({left:e.sliderBox.left}),onMousedown:l[1]||(l[1]=(...o)=>e.sliderDown&&e.sliderDown(...o)),onTouchstart:l[2]||(l[2]=(...o)=>e.touchStartEvent&&e.touchStartEvent(...o)),onTouchmove:l[3]||(l[3]=(...o)=>e.touchMoveEvent&&e.touchMoveEvent(...o)),onTouchend:l[4]||(l[4]=(...o)=>e.touchEndEvent&&e.touchEndEvent(...o))},[y("i",{class:O(["slide-verify-slider-mask-item-icon","iconfont",`icon-${e.sliderBox.iconCls}`])},null,2)],36)],4),y("span",$e,P(e.sliderText),1)],2)],4)}var Ae=Se(Ie,[["render",Re],["__scopeId","data-v-f61c42f2"]]);const De="/kilyicms/static/slideimg-1--qdnIjPW.png",Ne="/kilyicms/static/slideimg-2-DwQUL8ig.png",Ue="/kilyicms/static/slideimg-3-BzV2SpF7.png",qe="/kilyicms/static/slideimg-4-BN6kYQr-.png",Le="/kilyicms/static/slideimg-5-BnLnt_Rw.png",ze="/kilyicms/static/slideimg-6-Cwx9GuW1.png",Fe={class:"slide_box1"},Xe={class:"slide_inner_box"},Ye=ee({__name:"index",emits:["again","success","fail","refresh","close"],setup(e,{emit:l}){const{t}=ae(),s=v(""),n=v([De,Ne,Ue,qe,Le,ze]),f=v(),o=l,p=v(""),C=()=>{var d;s.value=t("non_human_operation_detected"),p.value="red",(d=f.value)==null||d.refresh()},u=d=>{s.value=t("successful_which_takes")+(d/1e3).toFixed(1)+t("seconds"),p.value="green",o("success")},_=()=>{s.value="",o("close")},w=()=>{s.value=t("Verification_failed"),p.value="red",setTimeout(()=>{s.value=""},1e3)},c=()=>{s.value=""};return(d,h)=>{const S=T("el-button");return V(),B("div",Fe,[i(S,{icon:m(we),size:"small",class:"slider_close_btn",circle:"",onClick:_},null,8,["icon"]),y("div",Xe,[i(m(Ae),{class:"slide_box",ref_key:"block",ref:f,"slider-text":m(t)("swipe_right"),accuracy:1,onAgain:C,onSuccess:u,onFail:w,onRefresh:c,imgs:n.value},null,8,["slider-text","imgs"]),y("div",{class:"msg_box",style:j("color:"+p.value)},P(s.value),5)])])}}}),Oe=re(Ye,[["__scopeId","data-v-dffbe238"]]),je={class:"login_container"},Ge={class:"theme-switch-container"},Ke={key:0},We={key:1},Je={key:0,class:"slide_verify_right"},Qe={class:"button_side"},Ze={class:"toggle-form button_login_side"},He={class:"button_side"},es={class:"toggle-form button_register_side"},ss=ee({__name:"index",setup(e){const l=v(!1),t=v(!1),{t:s}=ae(),n=v(!1),f=fe(),o=G({user_name:"admin",password:"123456",confirmPassword:void 0,roles:void 0}),p=v("admin"),C=v(null),u=v(!1),_={user_name:[{required:!0,message:s("Please_enter_your_username"),trigger:"blur"}],password:[{required:!0,message:s("Please_enter_your_password"),trigger:"blur"}]},w={user_name:[{required:!0,message:s("Please_enter_your_username"),trigger:"blur"}],password:[{required:!0,message:s("Please_enter_your_password"),trigger:"blur"}],confirmPassword:[{required:!0,message:s("Please_confirm_the_password"),trigger:"blur"}],roles:[{required:!0,message:s("Please_select_your_role"),trigger:"blur"}]},c=b=>{b==="admin"?Object.assign(o,{user_name:"admin",password:"123456",confirmPassword:void 0,roles:void 0}):Object.assign(o,{user_name:"user",password:"123456",confirmPassword:void 0,roles:void 0})},d=()=>{setTimeout(()=>{t.value=!0,l.value=!1,h()},1e3)},h=()=>{n.value=!0;const b=o;ge().login(b).then(()=>{const a=f.currentRoute.value.query.redirect||"/";f.push(decodeURIComponent(a))}).finally(()=>{n.value=!1})},S=()=>{var b;(b=C.value)==null||b.validate(a=>{a?t.value?h():l.value=!0:n.value=!1})},E=()=>{u.value=!u.value,t.value=!1},$=()=>{n.value=!0;const b=o;b.roles=[b.roles],he(b).then(a=>{a.status===200&&(be({message:a.message,type:"success"}),E())}).finally(()=>{n.value=!1})},M=()=>{var a;const b=o;Array.isArray(b.roles)&&(b.roles=void 0),(a=C.value)==null||a.validate(R=>{R&&$()})};return(b,a)=>{const R=T("el-radio-button"),K=T("el-radio-group"),x=T("el-input"),k=T("el-form-item"),A=T("el-button"),X=T("el-form"),Y=T("el-option"),L=T("el-select"),z=T("el-card");return V(),B("div",je,[y("div",Ge,[i(pe),i(ve,{class:"theme-switch"})]),i(z,{class:O(["box_login_card",u.value?"box_card_style":""])},{default:g(()=>[a[8]||(a[8]=y("div",{class:"title"},[y("img",{src:ye})],-1)),u.value?(V(),B("h3",We,P(m(s)("user_register")),1)):(V(),B("h3",Ke,[F(P(m(s)("user_login"))+" ",1),u.value?Q("",!0):(V(),W(K,{key:0,modelValue:p.value,"onUpdate:modelValue":a[0]||(a[0]=r=>p.value=r),onChange:c},{default:g(()=>[i(R,{label:"admin",value:"admin"}),i(R,{label:"user",value:"user"})]),_:1},8,["modelValue"]))])),i(_e,{name:"el-fade-in-linear"},{default:g(()=>[u.value?(V(),W(X,{key:1,model:o,rules:w,class:"register_form",ref_key:"ref_form",ref:C,onKeyup:le(M,["enter"])},{default:g(()=>[i(k,{prop:"user_name",label:m(s)("user_name"),"label-width":"100px"},{default:g(()=>[i(x,{modelValue:o.user_name,"onUpdate:modelValue":a[4]||(a[4]=r=>o.user_name=r),modelModifiers:{trim:!0},placeholder:m(s)("Please_enter_your_username"),size:"large","prefix-icon":m(oe)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["label"]),i(k,{prop:"password",label:m(s)("password"),"label-width":"100px"},{default:g(()=>[i(x,{size:"large",modelValue:o.password,"onUpdate:modelValue":a[5]||(a[5]=r=>o.password=r),modelModifiers:{trim:!0},"show-password":"",placeholder:m(s)("Please_confirm_the_password"),"prefix-icon":m(J)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["label"]),i(k,{prop:"confirmPassword",label:m(s)("confirm_password"),"label-width":"100px"},{default:g(()=>[i(x,{size:"large",modelValue:o.confirmPassword,"onUpdate:modelValue":a[6]||(a[6]=r=>o.confirmPassword=r),modelModifiers:{trim:!0},"show-password":"",placeholder:m(s)("Please_confirm_the_password"),"prefix-icon":m(J)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["label"]),i(k,{"label-width":"100px",prop:"roles",label:m(s)("character")},{default:g(()=>[i(L,{modelValue:o.roles,"onUpdate:modelValue":a[7]||(a[7]=r=>o.roles=r),placeholder:m(s)("Selecting_a_Character")},{default:g(()=>[i(Y,{size:"large",label:"Admin",value:"admin"}),i(Y,{size:"large",label:"User",value:"user"})]),_:1},8,["modelValue","placeholder"])]),_:1},8,["label"]),i(k,null,{default:g(()=>[y("div",He,[i(A,{class:"submit_but",type:"primary",onClick:M,loading:n.value},{default:g(()=>[F(P(m(s)("router_register")),1)]),_:1},8,["loading"])])]),_:1}),i(k,null,{default:g(()=>[y("div",es,[i(A,{class:"side_btn",link:"",onClick:E},{default:g(()=>[F(P(m(s)("Go_and_log_in")),1)]),_:1})])]),_:1})]),_:1},8,["model"])):(V(),W(X,{key:0,model:o,rules:_,class:"login_form",ref_key:"ref_form",ref:C,onKeyup:le(S,["enter"])},{default:g(()=>[i(k,{prop:"user_name",label:m(s)("user_name"),"label-width":"100px"},{default:g(()=>[i(x,{modelValue:o.user_name,"onUpdate:modelValue":a[1]||(a[1]=r=>o.user_name=r),modelModifiers:{trim:!0},placeholder:m(s)("Please_enter_your_username"),size:"large","prefix-icon":m(oe)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["label"]),i(k,{prop:"password",label:m(s)("password"),"label-width":"100px"},{default:g(()=>[i(x,{size:"large",modelValue:o.password,"onUpdate:modelValue":a[2]||(a[2]=r=>o.password=r),modelModifiers:{trim:!0},"show-password":"",placeholder:m(s)("Please_enter_your_password"),"prefix-icon":m(J)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["label"]),l.value?(V(),B("div",Je,[i(Oe,{onSuccess:d,onClose:a[3]||(a[3]=r=>l.value=!1)})])):Q("",!0),i(k,null,{default:g(()=>[y("div",Qe,[i(A,{class:"submit_but",type:"primary",onClick:S,loading:n.value},{default:g(()=>[F(P(m(s)("login")),1)]),_:1},8,["loading"])])]),_:1}),i(k,null,{default:g(()=>[y("div",Ze,[i(A,{class:"side_btn",link:"",onClick:E},{default:g(()=>[F(P(m(s)("Go_to_Register")),1)]),_:1})])]),_:1})]),_:1},8,["model"]))]),_:1})]),_:1},8,["class"])])}}}),as=re(ss,[["__scopeId","data-v-6ac6ab94"]]);export{as as default};