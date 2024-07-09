// // 引入项目中全部的全局组件
// import SvgIcon from "./SvgIcon/index.vue";
// import Pagination from "./Pagination/index.vue";

// // 全局对象
// const allGloablComponent = {
//   SvgIcon,
//   Pagination,
// };
// // 对外暴露插件对象
// export default {
//   // 务必叫install方法
//   install(app: any) {
//     // console.log("99999--", app);
//     // 注册项目中全部的全局组件
//     Object.keys(allGloablComponent).forEach((key) => {
//       // 注册为全局组件
//       app.component(key, allGloablComponent[key]);
//     });
//   },
// };
