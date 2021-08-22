import { SET_USER_INFO } from "./mutationsTypes.js";

export default {
  [SET_USER_INFO](state, payload) {
    state.userInfo = payload;
    state.userInfo.token &&
      window.sessionStorage.setItem("token", state.userInfo.token);
  },
};
