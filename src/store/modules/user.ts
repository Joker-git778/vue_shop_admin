import { Commit } from "vuex";
import { Message } from "element-ui";
import { 
  RECOVER_USER_LIST, 
  RECOVER_USER_STATE
} from "./mutations-type";
import { 
  reqUserList, 
  reqUserState
} from "../../api/user";

interface State {
  userList: object;
  userSatet: object;
}

const state: State = {
  userList: {},
  userSatet: {}
}

const mutations: any = {
  [RECOVER_USER_LIST](state: State, { userList }: { userList: object }) {
    state.userList = userList;
  },
  [RECOVER_USER_STATE](state: State, { userSatet }: { userSatet: object }) {
    state.userSatet = userSatet;
  }
}

const actions: any = {
  async getUserList({ commit }: { commit: Commit }, { query, pagenum, pagesize }: { query?: string, pagenum: number, pagesize: number }) {
    const res: any = await reqUserList({ query, pagenum, pagesize });
    console.log(res);
    if (res.meta.status === 200) {
      const userList: any = res.data;
      commit(RECOVER_USER_LIST, { userList });
    } else {
      return Message.error(res.meta.msg);
    }
  },

  async getUserState({ commit }: { commit: Commit }, { uId, type }: { uId: number, type: boolean }) {
    const res: any = await reqUserState({ uId, type });
    console.log(res);
    if (res.meta.status === 200) {
      const userSatet: any = res.data;
      commit(RECOVER_USER_STATE, { userSatet });
      Message({
        message: res.meta.msg,
        type: 'success'
      });
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