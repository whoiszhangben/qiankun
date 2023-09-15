import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'aesa',
    redirect: '/overview',
    component: {
      render: h => h('router-view')
    },
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: () => import('@/views/overview.vue')
      },
      {
        path: 'alarmMap',
        name: 'alarmMap',
        component: () => import('@/views/alarmMap.vue')
      },
      {
        path: 'panalysis',
        name: 'panalysis',
        component: () => import('@/views/panalysis.vue')
      },
      {
        path: 'psource',
        name: 'psource',
        component: () => import('@/views/psource.vue')
      },
      {
        path: 'fbanalysis',
        name: 'fbanalysis',
        component: () => import('@/views/fbanalysis.vue')
      },
      {
        path: 'airanalysis',
        name: 'airanalysis',
        component: () => import('@/views/airanalysis.vue')
      },
      {
        path: 'pcanalysis',
        name: 'pcanalysis',
        component: () => import('@/views/pcanalysis.vue')
      },
      {
        path: 'wcanalysis',
        name: 'wcanalysis',
        component: () => import('@/views/wcanalysis.vue')
      },
      {
        path: 'o3analysis',
        name: 'o3analysis',
        component: () => import('@/views/o3analysis.vue')
      },
    ]
  }
]

const router = new VueRouter({
  base: window.__POWERED_BY_QIANKUN__ ? '/aesa/' : '/',
  mode: 'history',
  routes
})

export default router