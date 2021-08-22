import { SET_USER_INFO } from "./mutationsTypes.js";
export default {
  async set_user_info({ commit }, payload) {
    const { data: result } = await Window.vue.$http.post("/login", payload);
    if (result.meta.status !== 200) return Window.vue.error("登录失败");
    Window.vue.$message.success("登录成功");
    commit(SET_USER_INFO, result.data);
  },
};
