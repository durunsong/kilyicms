"use strict";(()=>{var h="pluginWebUpdateNotice",f="web_version_by_plugin";var A="_pwun_",C="plugin_web_update_notice",m="plugin-web-update-notice-anchor",O="plugin-web-update-notice-refresh-btn",L="plugin-web-update-notice-dismiss-btn",w="web_update_check_dismiss_version_",x={topLeft:"top: 24px;left: 24px",topRight:"top: 24px;right: 24px",bottomLeft:"bottom: 24px;left: 24px",bottomRight:"bottom: 24px;right: 24px"};var B={zh_CN:{title:"\u53D1\u73B0\u65B0\u7248\u672C",description:"\u7F51\u9875\u66F4\u65B0\u5566\uFF01\u8BF7\u5237\u65B0\u9875\u9762\u540E\u4F7F\u7528\u3002",buttonText:"\u5237\u65B0",dismissButtonText:"\u5FFD\u7565"},zh_TW:{title:"\u767C\u73FE\u65B0\u7248\u672C",description:"\u7DB2\u9801\u66F4\u65B0\u5566\uFF01\u8ACB\u5237\u65B0\u9801\u9762\u5F8C\u4F7F\u7528\u3002",buttonText:"\u5237\u65B0",dismissButtonText:"\u5FFD\u7565"},en_US:{title:"Discover new version",description:"A new version is available! Please refresh the page.",buttonText:"Refresh",dismissButtonText:"Dismiss"}},T=B;var S=!1,I="",d="",g;function J(t,i){let n=!1;return function(...c){n||(n=!0,t.apply(this,c),setTimeout(()=>{n=!1},i))}}function E(t){return document.querySelector(t)}window.pluginWebUpdateNotice_={checkUpdate:()=>{},dismissUpdate:y,closeNotification:v,setLocale:t=>{window.pluginWebUpdateNotice_.locale=t,d=t}};function H(){let t=document.querySelector(`script[data-id="${A}"]`);if(!t)return"";let i=t.getAttribute("data-v");return i?(window.pluginWebUpdateNotice_version=i,i):""}function j(t){let{injectFileBase:i="",checkInterval:n=10*60*1e3,hiddenDefaultNotification:c,checkOnWindowFocus:a=!0,checkImmediately:e=!0,checkOnLoadFileError:u=!0}=t,l=()=>{let r=H();window.fetch(`${i}${h}/${f}.json?t=${Date.now()}`).then(o=>{if(!o.ok)throw new Error(`Failed to fetch ${f}.json`);return o.json()}).then(({version:o,silence:s})=>{if(!s&&(I=o,r!==o)){document.body.dispatchEvent(new CustomEvent(C,{detail:{options:t,version:o},bubbles:!0}));let _=localStorage.getItem(`${w}${o}`)==="true";!S&&!c&&!_&&P(t)}}).catch(o=>{console.error("[pluginWebUpdateNotice] Failed to check system update",o)})};e&&setTimeout(l);let N=()=>{n>0&&(g=setInterval(l,n))};N();let p=J(l,5e3);window.pluginWebUpdateNotice_.checkUpdate=p,window.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&(N(),a&&p()),document.visibilityState==="hidden"&&g&&clearInterval(g)}),window.addEventListener("focus",()=>{a&&p()}),u&&window.addEventListener("error",r=>{var s;let o=(s=r==null?void 0:r.target)==null?void 0:s.tagName;(o==="SCRIPT"||o==="LINK")&&l()},!0)}window.__checkUpdateSetup__=j;function v(){var t;S=!1,(t=E(`.${m} .plugin-web-update-notice`))==null||t.remove()}function y(){try{v(),localStorage.setItem(`${w}${I}`,"true")}catch(t){console.error(t)}}function V(){let t=E(`.${O}`);t==null||t.addEventListener("click",()=>{let{onClickRefresh:n}=window.pluginWebUpdateNotice_;if(n){n(I);return}window.location.reload()});let i=E(`.${L}`);i==null||i.addEventListener("click",()=>{let{onClickDismiss:n}=window.pluginWebUpdateNotice_;if(n){n(I);return}y()})}function b(t,i,n){var c,a,e,u;return(u=(e=(c=n[t])==null?void 0:c[i])!=null?e:(a=T[t])==null?void 0:a[i])!=null?u:T.zh_CN[i]}function P(t){var i,n,c,a;try{S=!0;let{notificationProps:e,notificationConfig:u,customNotificationHTML:l,hiddenDismissButton:N,locale:p="zh_CN",localeData:r}=t,o=Object.assign({},T,r);d||(d=p,window.pluginWebUpdateNotice_.locale=p);let s=document.createElement("div"),_="";if(l)_=l;else{let{placement:U="bottomRight",primaryColor:D,secondaryColor:M}=u||{},R=(i=e==null?void 0:e.title)!=null?i:b(d,"title",o),$=(n=e==null?void 0:e.description)!=null?n:b(d,"description",o),F=(c=e==null?void 0:e.buttonText)!=null?c:b(d,"buttonText",o),k=(a=e==null?void 0:e.dismissButtonText)!=null?a:b(d,"dismissButtonText",o),W=N?"":`<a class="plugin-web-update-notice-btn plugin-web-update-notice-dismiss-btn" style="color:${M}">${k}</a>`;s.classList.add("plugin-web-update-notice"),s.style.cssText=`${x[U]}`,_=`
    <div class="plugin-web-update-notice-content" data-cy="notification-content">
      <div class="plugin-web-update-notice-content-title">
        ${R}
      </div>
      <div class="plugin-web-update-notice-content-desc">
        ${$}
      </div>
      <div class="plugin-web-update-notice-tools">
        ${W}
        <a class="plugin-web-update-notice-btn plugin-web-update-notice-refresh-btn" style="color:${D}">
          ${F}
        </a>
      </div>
    </div>`}s.innerHTML=_,document.querySelector(`.${m}`).appendChild(s),V()}catch(e){console.error("[pluginWebUpdateNotice] Failed to show notification",e)}}})();

  window.__checkUpdateSetup__({"versionType":"build_timestamp","checkInterval":120000,"checkOnWindowFocus":true,"checkImmediately":true,"checkOnLoadFileError":true,"locale":"zh_CN","notificationConfig":{"primaryColor":"#1677ff","secondaryColor":"rgba(0,0,0,.25)","placement":"bottomRight"},"notificationProps":{"title":"🎉 发现新版本","description":"检测到系统已更新，刷新页面即可体验最新功能和优化","buttonText":"立即更新","dismissButtonText":"稍后再说"},"injectFileBase":"/kilyicms/"});
      ;const logFn = (version) => {
          const buildTime = new Date(parseInt(version)).toLocaleString("zh-CN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
          });
          console.log(`%c\u{1F680} \u5F53\u524D\u7248\u672C\u6784\u5EFA\u65F6\u95F4: ${buildTime}`, "color: #1677ff; font-weight: bold;");
        }
      ;logFn('1759214317911', 1759214317943)
    