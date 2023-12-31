import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cacheTabs: [], // 保存需要缓存的数组
    parentTabItem: [{}], // 父级tabs的同步数据
    theme: ""
  },
  getters: {
    getCacheTabs(state) {
      return state.cacheTabs;
    },
    getParentTabItem(state) {
      return state.parentTabItem;
    },
    getTheme(state) {
      return state.theme;
    }
  },
  mutations: {
    setCacheTabs(state, cacheTabs) {
      state.cacheTabs = cacheTabs;
    },
    setParentTabItem(state, parentTabItem) {
      state.parentTabItem = parentTabItem;
    },
    setTheme(state, theme) {
      state.theme = theme;
    }
  },
  actions: {
    reloadCashsTabs({ commit }, data) {
      console.log("invoke reloadCashsTabs:", data);
      const cacheTabs = data
        .filter(item => {
          return item.type === "aesa";
        })
        .map(item => {
          return item.path.replace("/aesa/", "");
        });
      commit("setCacheTabs", cacheTabs);
      commit("setParentTabItem", data);
    }
  }
});
