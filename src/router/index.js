import Vue from "vue";
import VueRouter from "vue-router";

// 配置路由懒加载
// home相关页面需要依赖统一打包名home.js
const Home = () => import(/* webpackChunkName: "home" */ "../views/Home.vue");
// Info
const Info = () =>
  import(/* webpackChunkName: "Info" */ "../views/info/Info.vue");
//ManufactureFwInfo
const ManufactureFwInfo = () =>
  import(
    /* webpackChunkName: "ManufactureFwInfo" */ "../views/manufactureFwInfo/ManufactureFwInfo.vue"
  );
//Sign
const Sign = () =>
  import(/* webpackChunkName: "Sign" */ "../views/sign/Sign.vue");
//Manage
const Manage = () =>
  import(/* webpackChunkName: "Manage" */ "../views/manage/manage.vue");
Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/index/info" },
  {
    path: "/index",
    component: Home,
    children: [
      { path: "/index/info", component: Info },
      { path: "/index/manufactureFwInfo", component: ManufactureFwInfo },
      { path: "/index/sign", component: Sign },
      { path: "/index/manage", component: Manage },
    ],
  },
];

const router = new VueRouter({
  routes,
});

// 挂载路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const tokenStr = window.sessionStorage.getItem('token')
//   if (!tokenStr) return next('/login')
//   next()
// })

export default router;
