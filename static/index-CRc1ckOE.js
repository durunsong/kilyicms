import{m as ee,a as _,Z as G,e as ue,A as ce,p as V,q as x,t as y,I as O,S as J,J as j,U as I,aK as de,aL as me,ai as T,V as r,u as m,aD as fe,O as g,T as z,M as W,W as pe,aa as le}from"./vue-utQA5pq8.js";import{L as ve,_ as _e}from"./index-Chiizp7C.js";import{d as ne,_ as re,f as ge,k as he}from"./index-ZFCyaeyC.js";import{p as we,u as te,q as Q,a as be}from"./element-CPMTcwlG.js";const ye="/kilyicms/static/logo-text-2-BAee3GBA.png",L=Math.PI;function oe(e,l){return e+l}function ke(e){return e*e}function ae(e,l,o,s,a,f){e.beginPath(),e.moveTo(l,o),e.arc(l+s/2,o-a+2,a,.72*L,2.26*L),e.lineTo(l+s,o),e.arc(l+s+a-2,o+s/2,a,1.21*L,2.78*L),e.lineTo(l+s,o+s),e.lineTo(l,o+s),e.arc(l+a-2,o+s/2,a+.4,2.76*L,1.24*L,!0),e.lineTo(l,o),e.lineWidth=2,e.fillStyle="rgba(255, 255, 255, 0.7)",e.strokeStyle="rgba(255, 255, 255, 0.7)",e.stroke(),e[f](),e.globalCompositeOperation="destination-over"}function Ce(e,l){const o=document.createElement("img");return o.crossOrigin="Anonymous",o.onload=l,o.onerror=()=>{o.src=H(e)},o.src=H(e),o}function Z(e,l){return Math.round(Math.random()*(l-e)+e)}function H(e){const l=e.length;return l>0?e[Z(0,l-1)]:"https://source.unsplash.com/300x150/?book,library"}function Te(e,l,o={leading:!0,trailing:!0}){const{leading:s,trailing:a,resultCallback:f}=o;let t=0,v=null;const C=function(...i){return new Promise((p,w)=>{const u=new Date().getTime();!t&&!s&&(t=u);const c=l-(u-t);if(c<=0){v&&(clearTimeout(v),v=null);const h=e.apply(this,i);f&&f(h),p(h),t=u;return}a&&!v&&(v=setTimeout(()=>{v=null,t=s?new Date().getTime():0;const h=e.apply(this,i);f&&f(h),p(h)},c))})};return C.cancel=function(){v&&clearTimeout(v),v=null,t=0},C}function Ve(){const e=G({x:0,y:0}),l=_(!1),o=_(!1),s=_(0),a=_([]);return{origin:e,success:l,isMouseDown:o,timestamp:s,trail:a,start:i=>{l.value||(i instanceof MouseEvent?(e.x=i.clientX,e.y=i.clientY):(e.x=i.changedTouches[0].pageX,e.y=i.changedTouches[0].pageY),o.value=!0,s.value=Date.now())},move:(i,p,w)=>{if(!o.value)return!1;let u=0,c=0;if(p instanceof MouseEvent?(u=p.clientX-e.x,c=p.clientY-e.y):(u=p.changedTouches[0].pageX-e.x,c=p.changedTouches[0].pageY-e.y),u<0||u+38>=i)return!1;w(u),a.value.push(c)},end:(i,p)=>{if(!o.value||(o.value=!1,(i instanceof MouseEvent?i.clientX:i.changedTouches[0].pageX)===e.x))return!1;s.value=Date.now()-s.value,p(s.value)},verify:(i,p,w)=>{const u=a.value,c=u.reduce(oe)/u.length,h=u.map(B=>B-c),S=Math.sqrt(h.map(ke).reduce(oe)/u.length),E=parseInt(i);return w=w<=1?1:w>10?10:w,{spliced:Math.abs(E-p)<=w,TuringTest:c!==S}}}}var Se=(e,l)=>{const o=e.__vccOpts||e;for(const[s,a]of l)o[s]=a;return o};const Ne=ee({name:"SlideVerify",props:{l:{type:Number,default:42},r:{type:Number,default:10},w:{type:Number,default:310},h:{type:Number,default:155},sliderText:{type:String,default:"Slide filled right"},accuracy:{type:Number,default:5},show:{type:Boolean,default:!0},imgs:{type:Array,default:()=>[]},interval:{type:Number,default:50}},emits:["success","again","fail","refresh"],setup(e,{emit:l}){const{imgs:o,l:s,r:a,w:f,h:t,accuracy:v,interval:C}=e,i=_(!0),p=_(0),w=_(0),u=G({containerActive:!1,containerSuccess:!1,containerFail:!1}),c=G({iconCls:"arrow-right",width:"0",left:"0"}),h=_(),S=_(),E=_(),B=_();let P;const{success:b,start:d,move:F,end:K,verify:M}=Ve(),k=()=>{var n,N;b.value=!1,u.containerActive=!1,u.containerSuccess=!1,u.containerFail=!1,c.iconCls="arrow-right",c.left="0",c.width="0",h.value.style.left="0",(n=B.value)==null||n.clearRect(0,0,f,t),(N=S.value)==null||N.clearRect(0,0,f,t),h.value.width=f,P.src=H(o)},$=()=>{k(),l("refresh")};function X(n){c.left=n+"px";let N=(f-40-20)/(f-40)*n;h.value.style.left=N+"px",u.containerActive=!0,c.width=n+"px"}function Y(n){const{spliced:N,TuringTest:R}=M(h.value.style.left,p.value,v);if(N){if(v===-1){u.containerSuccess=!0,c.iconCls="success",b.value=!0,l("success",n);return}R?(u.containerSuccess=!0,c.iconCls="success",b.value=!0,l("success",n)):(u.containerFail=!0,c.iconCls="fail",l("again"))}else u.containerFail=!0,c.iconCls="fail",l("fail"),setTimeout(()=>{k()},1e3)}const U=Te(n=>{F(f,n,X)},C),q=n=>{K(n,Y)};return ue(()=>{var n,N;const R=(n=E.value)==null?void 0:n.getContext("2d"),D=(N=h.value)==null?void 0:N.getContext("2d");B.value=R,S.value=D,P=Ce(o,()=>{i.value=!1;const A=s+a*2+3;if(p.value=Z(A+10,f-(A+10)),w.value=Z(10+a*2,t-(A+10)),R&&D){ae(R,p.value,w.value,s,a,"fill"),ae(D,p.value,w.value,s,a,"clip"),R.drawImage(P,0,0,f,t),D.drawImage(P,0,0,f,t);const se=w.value-a*2-1,ie=D.getImageData(p.value,se,A,A);h.value.width=A,D.putImageData(ie,0,se)}}),document.addEventListener("mousemove",U),document.addEventListener("mouseup",q)}),ce(()=>{document.removeEventListener("mousemove",U),document.removeEventListener("mouseup",q)}),{block:h,canvas:E,loadBlock:i,containerCls:u,sliderBox:c,refresh:$,sliderDown:d,touchStartEvent:d,touchMoveEvent:U,touchEndEvent:q}}}),Ee=e=>(de("data-v-f61c42f2"),e=e(),me(),e),Ie=["width","height"],Pe=Ee(()=>y("i",{class:"iconfont icon-refresh"},null,-1)),Me=[Pe],xe=["width","height"],Be={class:"slide-verify-slider-text"};function $e(e,l,o,s,a,f){return V(),x("div",{id:"slideVerify",class:"slide-verify",style:j({width:e.w+"px"}),onselectstart:"return false;"},[y("div",{class:O({"slider-verify-loading":e.loadBlock})},null,2),y("canvas",{ref:"canvas",width:e.w,height:e.h},null,8,Ie),e.show?(V(),x("div",{key:0,class:"slide-verify-refresh-icon",onClick:l[0]||(l[0]=(...t)=>e.refresh&&e.refresh(...t))},Me)):J("",!0),y("canvas",{ref:"block",width:e.w,height:e.h,class:"slide-verify-block"},null,8,xe),y("div",{class:O(["slide-verify-slider",{"container-active":e.containerCls.containerActive,"container-success":e.containerCls.containerSuccess,"container-fail":e.containerCls.containerFail}])},[y("div",{class:"slide-verify-slider-mask",style:j({width:e.sliderBox.width})},[y("div",{class:"slide-verify-slider-mask-item",style:j({left:e.sliderBox.left}),onMousedown:l[1]||(l[1]=(...t)=>e.sliderDown&&e.sliderDown(...t)),onTouchstart:l[2]||(l[2]=(...t)=>e.touchStartEvent&&e.touchStartEvent(...t)),onTouchmove:l[3]||(l[3]=(...t)=>e.touchMoveEvent&&e.touchMoveEvent(...t)),onTouchend:l[4]||(l[4]=(...t)=>e.touchEndEvent&&e.touchEndEvent(...t))},[y("i",{class:O(["slide-verify-slider-mask-item-icon","iconfont",`icon-${e.sliderBox.iconCls}`])},null,2)],36)],4),y("span",Be,I(e.sliderText),1)],2)],4)}var Re=Se(Ne,[["render",$e],["__scopeId","data-v-f61c42f2"]]);const De="/kilyicms/static/slideimg-1--qdnIjPW.png",Ae="/kilyicms/static/slideimg-2-DwQUL8ig.png",Le="/kilyicms/static/slideimg-3-BzV2SpF7.png",Ue="/kilyicms/static/slideimg-4-BN6kYQr-.png",qe="/kilyicms/static/slideimg-5-BnLnt_Rw.png",ze="/kilyicms/static/slideimg-6-Cwx9GuW1.png",Fe={class:"slide_box1"},Xe={class:"slide_inner_box"},Ye=ee({__name:"index",emits:["again","success","fail","refresh","close"],setup(e,{emit:l}){const{t:o}=ne(),s=_(""),a=_([De,Ae,Le,Ue,qe,ze]),f=_(),t=l,v=_(""),C=()=>{var c;s.value=o("non_human_operation_detected"),v.value="red",(c=f.value)==null||c.refresh()},i=c=>{s.value=o("successful_which_takes")+(c/1e3).toFixed(1)+o("seconds"),v.value="green",t("success")},p=()=>{s.value="",t("close")},w=()=>{s.value=o("Verification_failed"),v.value="red",setTimeout(()=>{s.value=""},1e3)},u=()=>{s.value=""};return(c,h)=>{const S=T("el-button");return V(),x("div",Fe,[r(S,{icon:m(we),size:"small",class:"slider_close_btn",circle:"",onClick:p},null,8,["icon"]),y("div",Xe,[r(m(Re),{class:"slide_box",ref_key:"block",ref:f,"slider-text":m(o)("swipe_right"),accuracy:1,onAgain:C,onSuccess:i,onFail:w,onRefresh:u,imgs:a.value},null,8,["slider-text","imgs"]),y("div",{class:"msg_box",style:j("color:"+v.value)},I(s.value),5)])])}}}),Oe=re(Ye,[["__scopeId","data-v-dffbe238"]]),je={class:"login_container"},Ge={class:"theme-switch-container"},Ke={key:0},We={key:1},Qe={key:0,class:"slide_verify_right"},Je={class:"button_side"},Ze={class:"toggle-form button_login_side"},He={class:"button_side"},es={class:"toggle-form button_register_side"},ss=ee({__name:"index",setup(e){const l=_(!1),o=_(!1),{t:s}=ne(),a=_(!1),f=fe(),t=G({userName:"admin",password:"123456",confirmPassword:void 0,roles:void 0}),v=_("admin"),C=_(null),i=_(!1),p={userName:[{required:!0,message:s("Please_enter_your_username"),trigger:"blur"}],password:[{required:!0,message:s("Please_enter_your_password"),trigger:"blur"}]},w={userName:[{required:!0,message:s("Please_enter_your_username"),trigger:"blur"}],password:[{required:!0,message:s("Please_enter_your_password"),trigger:"blur"}],confirmPassword:[{required:!0,message:s("Please_confirm_the_password"),trigger:"blur"}],roles:[{required:!0,message:s("Please_select_your_role"),trigger:"blur"}]},u=b=>{b==="admin"?Object.assign(t,{userName:"admin",password:"123456",confirmPassword:void 0}):Object.assign(t,{userName:"user",password:"123456",confirmPassword:void 0})},c=()=>{setTimeout(()=>{o.value=!0,l.value=!1,h()},1e3)},h=()=>{a.value=!0;const b=t;ge().login(b).then(()=>{f.push({path:"/"})}).finally(()=>{a.value=!1})},S=()=>{var b;(b=C.value)==null||b.validate(d=>{d?o.value?h():l.value=!0:a.value=!1})},E=()=>{i.value=!i.value,o.value=!1},B=()=>{a.value=!0;const b=t;b.roles=[b.roles],he(b).then(d=>{d.status===200&&(be({message:d.message,type:"success"}),E())}).finally(()=>{a.value=!1})},P=()=>{var b;(b=C.value)==null||b.validate(d=>{d&&B()})};return(b,d)=>{const F=T("el-radio-button"),K=T("el-radio-group"),M=T("el-input"),k=T("el-form-item"),$=T("el-button"),X=T("el-form"),Y=T("el-option"),U=T("el-select"),q=T("el-card");return V(),x("div",je,[y("div",Ge,[r(ve),r(_e,{class:"theme-switch"})]),r(q,{class:O(["box_login_card",i.value?"box_card_style":""])},{default:g(()=>[d[8]||(d[8]=y("div",{class:"title"},[y("img",{src:ye})],-1)),i.value?(V(),x("h3",We,I(m(s)("user_register")),1)):(V(),x("h3",Ke,[z(I(m(s)("user_login"))+" ",1),i.value?J("",!0):(V(),W(K,{key:0,modelValue:v.value,"onUpdate:modelValue":d[0]||(d[0]=n=>v.value=n),onChange:u},{default:g(()=>[r(F,{label:"admin",value:"admin"}),r(F,{label:"user",value:"user"})]),_:1},8,["modelValue"]))])),r(pe,{name:"el-fade-in-linear"},{default:g(()=>[i.value?(V(),W(X,{key:1,model:t,rules:w,class:"register_form",ref_key:"ref_form",ref:C,onKeyup:le(P,["enter"])},{default:g(()=>[r(k,{prop:"userName",label:m(s)("user_name"),"label-width":"100px"},{default:g(()=>[r(M,{modelValue:t.userName,"onUpdate:modelValue":d[4]||(d[4]=n=>t.userName=n),modelModifiers:{trim:!0},placeholder:m(s)("Please_enter_your_username"),size:"large","prefix-icon":m(te)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["label"]),r(k,{prop:"password",label:m(s)("password"),"label-width":"100px"},{default:g(()=>[r(M,{size:"large",modelValue:t.password,"onUpdate:modelValue":d[5]||(d[5]=n=>t.password=n),modelModifiers:{trim:!0},"show-password":"",placeholder:m(s)("Please_confirm_the_password"),"prefix-icon":m(Q)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["label"]),r(k,{prop:"confirmPassword",label:m(s)("confirm_password"),"label-width":"100px"},{default:g(()=>[r(M,{size:"large",modelValue:t.confirmPassword,"onUpdate:modelValue":d[6]||(d[6]=n=>t.confirmPassword=n),modelModifiers:{trim:!0},"show-password":"",placeholder:m(s)("Please_confirm_the_password"),"prefix-icon":m(Q)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["label"]),r(k,{"label-width":"100px",prop:"roles",label:m(s)("character")},{default:g(()=>[r(U,{modelValue:t.roles,"onUpdate:modelValue":d[7]||(d[7]=n=>t.roles=n),placeholder:m(s)("Selecting_a_Character")},{default:g(()=>[r(Y,{size:"large",label:"Admin",value:"admin"}),r(Y,{size:"large",label:"User",value:"user"})]),_:1},8,["modelValue","placeholder"])]),_:1},8,["label"]),r(k,null,{default:g(()=>[y("div",He,[r($,{class:"submit_but",type:"primary",onClick:P,loading:a.value},{default:g(()=>[z(I(m(s)("router_register")),1)]),_:1},8,["loading"])])]),_:1}),r(k,null,{default:g(()=>[y("div",es,[r($,{class:"side_btn",link:"",onClick:E},{default:g(()=>[z(I(m(s)("Go_and_log_in")),1)]),_:1})])]),_:1})]),_:1},8,["model"])):(V(),W(X,{key:0,model:t,rules:p,class:"login_form",ref_key:"ref_form",ref:C,onKeyup:le(S,["enter"])},{default:g(()=>[r(k,{prop:"userName",label:m(s)("user_name"),"label-width":"100px"},{default:g(()=>[r(M,{modelValue:t.userName,"onUpdate:modelValue":d[1]||(d[1]=n=>t.userName=n),modelModifiers:{trim:!0},placeholder:m(s)("Please_enter_your_username"),size:"large","prefix-icon":m(te)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["label"]),r(k,{prop:"password",label:m(s)("password"),"label-width":"100px"},{default:g(()=>[r(M,{size:"large",modelValue:t.password,"onUpdate:modelValue":d[2]||(d[2]=n=>t.password=n),modelModifiers:{trim:!0},"show-password":"",placeholder:m(s)("Please_enter_your_password"),"prefix-icon":m(Q)},null,8,["modelValue","placeholder","prefix-icon"])]),_:1},8,["label"]),l.value?(V(),x("div",Qe,[r(Oe,{onSuccess:c,onClose:d[3]||(d[3]=n=>l.value=!1)})])):J("",!0),r(k,null,{default:g(()=>[y("div",Je,[r($,{class:"submit_but",type:"primary",onClick:S,loading:a.value},{default:g(()=>[z(I(m(s)("login")),1)]),_:1},8,["loading"])])]),_:1}),r(k,null,{default:g(()=>[y("div",Ze,[r($,{class:"side_btn",link:"",onClick:E},{default:g(()=>[z(I(m(s)("Go_to_Register")),1)]),_:1})])]),_:1})]),_:1},8,["model"]))]),_:1})]),_:1},8,["class"])])}}}),ns=re(ss,[["__scopeId","data-v-3e78a31b"]]);export{ns as default};
