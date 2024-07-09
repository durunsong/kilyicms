# kilyicms项目

## 简介
kilyicms项目是一个使用Vue3和vite构建的应用程序，用于kilyicms管理后台。该项目使用了Element Plus组件库，以及其他一些常用的Vue生态工具和库。

## 安装
确保你已经安装了Node.js和npm（或者使用yarn/pnpm）。然后运行以下命令安装项目的依赖项：

## 环境准备
Node 18+ 

### 使用[阿里云NPM镜像](https://www.npmmirror.com/)
``` 
npm config set registry https://registry.npmmirror.com
```

```bash
### 获取项目代码
git clone https://github.com/durunsong/kilyicms.git
cd kilyicms

## 安装依赖 
npm install
# 或者
yarn install

### 开发模式 eg: 在开发模式下运行项目
npm run dev
# 或者
yarn dev

### 生产构建   eg: 构建生产版本的项目
npm run build:prod
# 或者
yarn build:prod
 
### 预览 eg: 预览生产版本的项目
npm run preview
# 或者
yarn preview
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

```

###  技术栈
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

