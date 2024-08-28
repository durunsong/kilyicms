### 简介

kilyicms 项目是一个使用 Vue3 和 vite 构建的管理后台应用程序。该项目使用了 Element Plus 组件库，支持16种语言切换，以及其他一些常用的 Vue 生态工具和库。

- 非开源，非商用，维权必究
- 如需版权完整代码，联系WX：DU2603948701

#### 🎈标记为已经完成的功能，其他为待完成的功能
###### 前端完成：hooks 组件  指令 配置 
1. 全局 svg组件封装 可用性 (vite配置) 🎈
2. 项目light和dark主题切换 配合所依赖的ui组件库
3. 三个环境配置(开发、测试、生产) 🎈
4. 按钮时效(按钮防抖)🎈
5. 避免多次无效请求(添加节流校验) 🎈
6. 全屏切换 🎈
7. 是否让用户启用调试功能----封装hooks--- 🎈
8. 后台权限,路由权限，按钮权限
9. 后台标签页管理优化
10. 后台页面加载动画全局封装，骨架屏，进度条，请求loading封装，
11. 必要组件全局挂载 🎈
12. 多语言管理，多语言切换组件，批量翻译程序编写 🎈
13. 公用方法hooks封装 🎈
14. 前端路由分离
15. 自定义指令全局封装
16. 前端代码自动化Jenkins部署或通过nodejs命令行部署
17. 三种验证码校验(前端组件方式、前端后端数字运算或图形验证码校验、前端后端cf浏览器指纹自动人机校验)
18. 大文件分片上传(单独上传、富文本上传)
19. 构建微前端架构，动态添加路由，动态添加子系统，处理好css沙箱

###### 后端完成方式 ：

1. 权限控制
2. 登录jwt验证 🎈
3. 两种验证码校验(前端后端数字运算或图形验证码校验、前端后端cf浏览器指纹自动人机校验)，一段时间自动推送消息给前端
4. 敏感信息加密(密码+地址... 参考RSA加密库) 
5. Redis限流处理
6. Jenkins自动化部署
7. docker
8. 后端多语言根据前端请求进行切换

#### 项目安装

确保你已经安装了 Node.js 和 npm（或者使用 pnpm/yarn）。然后运行以下命令安装项目的依赖项：

#### 环境准备

Node 20+

#### 使用[阿里云 NPM 镜像](https://www.npmmirror.com/)

```js
npm config set registry https://registry.npmmirror.com
```

#### 获取项目代码

```js
git clone https://github.com/durunsong/kilyicms.git
cd kilyicms (前端项目)
cd server (后端项目)
```

#### 安装 pnpm

```
npm install -g pnpm
```
```bash
## 安装依赖
pnpm install

# 或者
yarn install

### 开发模式 eg: 在开发模式下运行项目
pnpm run dev

# 或者
yarn dev

### 生产构建 eg: 构建生产版本的项目
pnpm run build:prod

# 或者
yarn build:prod

### 预览 eg: 预览生产版本的项目
pnpm run preview

# 或者
yarn preview
```

```js
cd server (后端项目)
pnpm install
pnpm run start
```

###  部署配置  eg：vercel部署 (project.json)
##### 命令
vercel --cwd ./kilyicms/

{
  "projectId": "prj_rQGnnAhMevC2sjiwCCppvCu48nny",
  "orgId": "team_j4xDsAAIpUmffVZAX8ry8btS",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ]
}


### 技术栈

- 前端部分：
  vue3
  vite5
  Pinia
  pinia-plugin-persistedstate
  typeScript
  element-Plus
  axios
  vue-Router
  vue-I18n
  vue-Clipboard3
  fingerprintjs
  moment
  @wangeditor
  screenfull
  sass
  terser
  uuid

  vue3-slide-verify

- 后端部分：
  body-parser
  cors
  express
  moment
  mysql2

  jsonwebtoken

  bcrypt


#### 国际化多语言自动化翻译程序
##### 准备：百度翻译api---------> appid appkey
##### 代码仓库 (具体看百度翻译api文档)

[点击这里访问我的另一个仓库](https://github.com/durunsong/Baidu-trans.git)


#### 该仓库代码提交git规范
```js
feat - 新功能 feature
fix - 修复 bug
docs - 文档注释
style - 代码格式(不影响代码运行的变动)
refactor - 重构、优化(既不增加新功能，也不是修复bug)
perf - 性能优化
test - 增加测试
chore - 构建过程或辅助工具的变动
revert - 回退
build - 打包
```
