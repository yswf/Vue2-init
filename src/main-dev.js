import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import { axiosConfig } from "./utilities/axios";
import { axiosDefaults } from "./utilities/config";
// 导入全局样式表
import "./assets/css/global.css";
//引入nprogress样式
import "nprogress/nprogress.css";

// 使用axios
axiosConfig.defaults.baseURL = axiosDefaults.developmentApi;
Vue.prototype.$http = axiosConfig;

Vue.config.productionTip = false;

Window.vue = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
