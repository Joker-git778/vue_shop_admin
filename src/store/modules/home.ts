import { Commit } from "vuex";
import { RECEIVE_MENUS } from "./mutations-type";
import { reqMenus } from "../../api/home";
import { Message } from "element-ui";
interface State {
  menus?: Array<object>
}

const state: State = {
  menus: []
}

const mutations: any = {
  [RECEIVE_MENUS](state: State, { menus }: { menus: Array<object> }) {
    state.menus = menus;
  }
}

const actions: any = {
  async getMenus({commit}: { commit: Commit }) {
    const res: any = await reqMenus();
    if (res.meta.status === 200) {
      const menus: Array<object> = res.data;
      commit(RECEIVE_MENUS, { menus });
    } else {
      return Message.error(res.meta.msg);
    }
  }
}

export default {
  namespaced: true, // namespaced为false的时候，state,mutations,actions全局可以调用，为true，生成作用域，引用时要声明模块名称
  state,
  mutations,
  actions
};