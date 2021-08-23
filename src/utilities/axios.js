// 导入axios
import axios from "axios";
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
      switch (err.response.status) {
        case 400:
          Message.error("Bad Request");
          break;
        case 401:
          Message.error("Unauthorized");
          break;
        case 403:
          Message.error("Forbidden");
          break;
        case 404:
          Message.error("Not Found");
          break;
        case 405:
          Message.error("Method Not Allowed");
          break;
        case 500:
          Message.error("Internal Server Error");
          break;
        case 502:
          Message.error("	Bad Gateway");
          break;

        default:
          Message.error("Unknown error");
          break;
      }
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
