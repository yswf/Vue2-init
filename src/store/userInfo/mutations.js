import { ACTION_TYPE } from "./actionsTypes";

export default {
  [ACTION_TYPE.LOAD_SUCCESS](state, payload) {
    state.userInfo = { ...state.userInfo, ...payload };
    state.userInfo.token &&
      window.sessionStorage.setItem("token", state.userInfo.token);
    window.location.href = "#/index/info";
  },
  [ACTION_TYPE.LOAD_FAILURE]() {
    return;
  },
};
