// 导入axios
import axios from "axios";
import qs from "qs"; //引入qs，axios在post参数时，要通过qs来格式化数据
// 导入NProgress
import NProgress from "nprogress";
import { axiosDefaults } from "./config";
import { Message } from "element-ui";
// 配置axios
axios.defaults.retry = axiosDefaults.retry || 1;
axios.defaults.retryDelay = axiosDefaults.retryDelay || 3000;
axios.interceptors.request.use(
  (config) => {
    NProgress.start();
    // qs来格式化数据
    if (
      config.headers["Content-Type"] == "application/x-www-form-urlencoded" &&
      config.method == "post"
    ) {
      config.data = qs.stringify(config.data);
    }
    // 必须return
    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);
// 在response拦截器中隐藏进度条和处理超时请求
function successRes(config) {
  NProgress.done();
  //  token失效在这里跳出登陆
  return config;
}
axios.interceptors.response.use(
  successRes,
  function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(err);

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;
    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      NProgress.done();
      Message.error(err.message);
      return Promise.reject(err);
    }

    // Increase the retry count
    config.__retryCount += 1;

    // Create new promise to handle exponential backoff
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, config.retryDelay || 1);
    });
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
      return axios(config);
    });
  }
);
// 导出axios
export const axiosConfig = axios;
