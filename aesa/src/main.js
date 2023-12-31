import "./public-path"; // 注意需要引入public-path，qiankun.js固定的内容
import registerMainStore from "../../parent-system/src/globalStore/register";
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./theme/theme.less";
import "./utils/antd_lazy";

Vue.config.productionTip = false;

// Vue实例
let vueApp = null;

// render方法，处理new Vue
const render = (props = {}, Vue) => {
  const { qiankunPush, container, theme } = props;
  if (qiankunPush) {
    Vue.prototype.$qiankunPush = qiankunPush;
  }
  vueApp = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector("#app") : "#app"); // 如果是在基座中运行，需要在基座的container内找到#app
  if (theme) {
    if (container) {
      container.querySelector("#app").setAttribute("class", theme);
    } else {
      document.getElementById("app").setAttribute("class", theme);
    }
    localStorage.setItem("themeColor", theme);
  } else {
    if (container) {
      container.querySelector("#app").setAttribute("class", "theme-dark");
    } else {
      // 默认dark
      let defaultTheme = localStorage.getItem("themeColor") || "theme-dark";
      document.getElementById("app").setAttribute("class", defaultTheme);
      localStorage.setItem("themeColor", defaultTheme);
    }
  }
};

// 不是微服务启动
if (!window.__POWERED_BY_QIANKUN__) {
  render({}, Vue);
}

function storeTest(props) {
  if (props.onGlobalStateChange) {
    props.onGlobalStateChange((value, prev) => {
      store.dispatch("reloadCashsTabs", value.tabList);
      // 在挂载子应用之前，监听主题信息的变化
      if (value.theme !== prev.theme) {
        props.theme = value.theme;
        render(props, Vue);
      }
      console.log(`[子应用aesa接受数据成功 - ${props.name}]:`, value, prev);
    }, true);
  }
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
        messages: "llllll",
        developer: props.developer
      }
    });
}

export async function bootstrap(props) {
  console.log("aesa子应用bootstrap启动成功");
  registerMainStore(store, props);
}

/**
 * 微应用启动钩子函数 加载
 * @param {object} props 基座传入的参数
 */
export async function mount(props) {
  console.log("aesa子应用mount了一下:", props);
  storeTest(props);
  render(props, Vue);
  registerMainStore(store, props);
}

/**
 * 微应用启动钩子函数 卸载
 */
export async function unmount() {
  console.log("aesa子应用unmount了一下");
  vueApp.$destroy();
  vueApp.$el.innerHTML = "";
  vueApp = null;
}
