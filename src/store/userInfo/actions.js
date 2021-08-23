import { SET_USER_INFO } from "./mutationsTypes.js";
import { axiosConfig } from "../../utilities/axios";
import { axiosDefaults } from "../../utilities/config";
import { Message } from "element-ui";
axiosConfig.defaults.baseURL = axiosDefaults.developmentApi;
const Http = axiosConfig;
export default {
  async ["SET_USER_INFO"]({ commit }, payload) {
    const { data: result } = await Http.post("/login", payload);
    if (result.meta.status !== 200) return Window.vue.error("登录失败");
    Message.success("登录成功");
    commit(SET_USER_INFO, result.data);
  },
};
