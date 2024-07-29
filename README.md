# kilyicms 项目

## 简介

kilyicms 项目是一个使用 Vue3 和 vite 构建的应用程序，用于 kilyimall 商城管理后台。该项目使用了 Element Plus 组件库，以及其他一些常用的 Vue 生态工具和库。

#### 🎈标记为已经完成的功能，其他为待完成的功能
###### 完成方式：hooks 组件  指令 配置 
```
1. 全局 svg组件封装 可用性 (vite配置) 🎈
2. 项目light和dark主题切换 配合所依赖的ui组件库
3. 三个环境配置(开发、测试、生产) 🎈
4. 按钮时效(按钮防抖)🎈
5. 避免多次无效请求(添加节流校验) 🎈
6. 全屏切换 🎈
7.是否让用户启用调试功能----封装hooks--- 🎈
8.后台权限,路由权限，按钮权限
9.后台标签页管理优化
10.后台页面加载动画全局封装，骨架屏，进度条，请求loading封装，
11.必要组件全局挂载 🎈
12.多语言管理，多语言切换组件，批量翻译程序编写 🎈
13.公用方法hooks封装 🎈
14.路由分离
15.自定义指令全局封装
```

## 项目安装

确保你已经安装了 Node.js 和 npm（或者使用 pnpm/yarn）。然后运行以下命令安装项目的依赖项：

## 环境准备

Node 20+

### 使用[阿里云 NPM 镜像](https://www.npmmirror.com/)

```
npm config set registry https://registry.npmmirror.com
```

### 获取项目代码

```
git clone https://github.com/durunsong/kilyicms.git
cd kilyicms (前端项目)
cd server (后端项目)
```

### 安装 pnpm

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

```
cd server (后端项目)
pnpm install
pnpm run start
```

###  部署配置  eg：vercel部署 (project.json)
##### 命令
vercel --cwd ./kilyicms/

``` json
{
  "projectId": "prj_rQGnnAhMevC2sjiwCCppvCu48nny",
  "orgId": "team_j4xDsAAIpUmffVZAX8ry8btS",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ]
}

````

### 技术栈

```
Vue3
Vite5
Pinia
TypeScript
Element-Plus
Axios
Vue-Router
Vue-I18n
Vue-Clipboard3
```

### 自动化翻译程序
##### 准备：百度翻译api---------> appid appkey
##### 代码仓库 (具体看百度翻译api文档)
```
https://github.com/durunsong/Baidu-trans.git

```
