<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <div class="header">
      <div class="toplogo"><img src='../assets/logo.png' @click="toggleTheme" />大气环境溯源分析</div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          <a-icon type="home" />
          <span>站点画像</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="environment" />
          <span>告警地图</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="bar-chart" />
          <span>污染传输</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="heat-map" />
          <span>污染特征分析</span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="line-chart" />
          <span>气象相关性分析</span>
        </a-menu-item>
        <a-menu-item key="6">
          <a-icon type="radar-chart" />
          <span>臭氧预测分析</span>
        </a-menu-item>
      </a-menu>
      <span class="user" v-if="getToken" @click="out">admin<a-icon type="down" /></span>
      <span class="user" v-else @click="login">登陆</span>
    </div>
    <a-layout>
        <a-layout-sider v-model="collapsed" style="background: #fff">
      <a-menu theme="light" :default-selected-keys="['1']" mode="inline">
        <template v-for="(item, index) in menu">
            <a-menu-item :key="'menu'+index" v-if="!item.children" @click="selecMenu(index)">
                <a-icon :type="item.icon" />
                <span>{{ item.name }}</span>
            </a-menu-item>
            <a-sub-menu :key="'menu' + index + ''" v-else>
                <span slot="title">
                    <a-icon :type="item.icon" />
                    <span>{{ item.name }}</span>
                </span>
                <a-menu-item :key="index + '_' + cIndex" v-for="(cItem, cIndex) in item.children" @click="selecMenu(index, cIndex)">
                    {{ cItem.name }}
                </a-menu-item>
            </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 3px 0">
          <my-tabs></my-tabs>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <div v-show="$route.path.startsWith('/main')">
            <keep-alive :include="getCacheTabs" v-if="getToken">
              <router-view></router-view>
            </keep-alive>
            <div v-if="!getToken" style="text-align: center; margin-top: 200px">暂未登录，请登录</div>
          </div>

          <div v-for="o in microApps" v-show="$route.path.startsWith(o.activeRule)" :key="o.name">
            <KeepAlive>
              <div :id="o.container.slice(1)"></div>
            </KeepAlive>
          </div>

        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        卡普瑞南山项目 2023/09/15
      </a-layout-footer>
    </a-layout>
    </a-layout>
    
  </a-layout>
</template>
<script>
import qiankun from './qiankun.js';
import globalStore from '../globalStore/index.js';
import { mapGetters } from 'vuex';
import myTabs from '@/components/myTabs.vue';

export default {
  mixins: [qiankun],
  name: 'layout',
  components: { myTabs },
  data() {
    return {
      collapsed: false,
      menu: [
        {
          name: '首页',
          path: '/main/index',
          icon: "global"
        },
        {
            name: '站点画像',
            path: '/aesa/overview',
            icon: 'home'
        },
        {
            name: '告警地图',
            path: '/aesa/alarmMap',
            icon: 'environment'
        },
        {
            name: '溯源分析',
            icon: 'bar-chart',
            children: [
                {
                    name: '污染分析',
                    path: '/aesa/panalysis',
                },
                {
                    name: '污染溯源',
                    path: '/aesa/psource'
                }
            ]
        },
        {
            name: '污染传输',
            icon: 'swap',
            children: [
                {
                    name: '前后向轨迹分析',
                    path: '/aesa/fbanalysis',
                },
                {
                    name: '气团轨迹聚类分析',
                    path: '/aesa/airanalysis'
                }
            ]
        },
        {
            name: '污染特征分析',
            icon: 'heat-map',
            path: '/aesa/pcanalysis'
        },
        {
            name: '气象相关性分析',
            icon: 'line-chart',
            path: '/aesa/wcanalysis'
        },
        {
            name: '臭氧预测分析',
            icon: 'radar-chart',
            path: '/aesa/o3analysis'
        },
      ],
    };
  },
  watch: {
    // $route() {
    //   this.resetRouter();
    // },
  },
  computed: {
    ...mapGetters(['getCacheTabs', 'getTabItems', 'getToken']),
    message() {
      return globalStore.getGlobalState('routerMessage');
    }
  },
  created() {
    console.log(`created成功`);
    this.resetRouter();
  },
  mounted() {
    console.log("getCacheTabs:", this.getCacheTabs)
  },
  methods: {
    selecMenu(index, cIndex = -1) {
        let path = '', name = '';
        if (cIndex === -1) {
            path = this.menu[index].path;
            name = this.menu[index].name;
        } else {
            path = this.menu[index].children[cIndex].path;
            name = this.menu[index].children[cIndex].name;
        }
      if (this.isQianKun()) {
        // 走qiankun路由
        const type = path.split('/')[1];
        this.$store.dispatch('setTabs', {
          name,
          path,
          componentName: path,
          type,
        });
      } else {
        // 走项目路由
        const componentName = this.$route.matched[1]['components']['default']['name'];
        // const path = this.$route.path; // 当前路由匹配到name
        // const name = this.$route.meta.title;
        this.$store.dispatch('setTabs', {
          name,
          path,
          componentName,
          type: 'main',
        });
      }
      this.$router.push({ path });
      this.isQianKun() && this.goQiankun(); // 走子项目路由
    },
    // 重新检查
    resetRouter() {
      // const path = this.$route.path; // 当前路由匹配到name
      // this.menu.forEach((item, index) => {
      //   item.children.forEach((cItem, cIndex) => {
      //     if (cItem.path === path) {
      //       this.selecMenu(index, cIndex);
      //     }
      //   });
      // });
      //重新设置一下tab
      this.isQianKun() && this.goQiankun(); // 走子项目路由
    },
    // 去登陆
    login() {
      this.$router.push('/main/login');
    },
    out() {
      this.$store.commit('setToken', '');
      this.$store.commit('clearTabs');
      window.location.reload();
    },
    toggleTheme() {
        let theme = localStorage.getItem("theme") || "theme-0";
        if (theme === "theme-0") {
            globalStore.setGlobalState({
                theme: "theme-1"
            });
            localStorage.setItem("theme", "theme-1")
        } else {
           globalStore.setGlobalState({
                theme: "theme-0"
            });
            localStorage.setItem("theme", "theme-0") 
        }
        
    }
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
  text-align: center;
  color: white;
  line-height: 32px;
}
.ant-tabs-bar {
  margin: 0 !important;
}
</style>

<style lang="less" scoped>
    #components-layout-demo-side {
        .header {
            position: relative;
            height: 64px;
            line-height: 64px;
            padding: 0 80px 0 50px;
            background: rgb(0, 170, 117);
            display: flex;
            flex-flow: row;
            justify-content: space-between;
            .toplogo {
                color: #fff;
                font-size: 24px;
                letter-spacing: 0.2em;
                img {
                    width: 56px;
                    height: 56px;
                }
            }
            .ant-menu-dark, .ant-menu-dark .ant-menu-sub {
                background: rgb(0, 170, 117);
            }
            .ant-menu.ant-menu-dark .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
                background: rgb(0, 141, 95);
            }
            .user {
                position: absolute;
                right: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: rgba(255, 255, 255, 0.65)
            }
        }
    }
    
</style>
