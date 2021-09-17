import { ACTION_TYPE } from "./actionsTypes.js";
import { axiosConfig } from "../../utilities/axios";
import { Message } from "element-ui";
const Http = axiosConfig;
export default {
  async [ACTION_TYPE.LOAD_REQUEST]({ commit }, payload) {
    try {
      const { data: result } = await Http.post("/login", payload);
      if (result.meta.status !== 200) {
        return Message.error(result.meta.msg); //密码错误不能算请求失败
      }
      Message.success(result.meta.msg);
      commit(ACTION_TYPE.LOAD_SUCCESS, result.data);
    } catch (error) {
      commit(ACTION_TYPE.LOAD_FAILURE);
    }
  },
};
