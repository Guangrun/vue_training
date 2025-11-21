import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/training',
      name: 'training',
      component: () => import('@/pages/Training.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login.vue')
    },
    {
      path: '/auth/callback',
      name: 'auth-callback',
      component: () => import('@/pages/AuthCallback.vue')
    },
    {
      path: '/training/components',
      name: 'component-training',
      component: () => import('@/pages/ComponentTraining.vue')
    },
    {
      path: '/training/state',
      name: 'state-training',
      component: () => import('@/pages/StateTraining.vue')
    },
    {
      path: '/training/routing',
      name: 'routing-training',
      component: () => import('@/pages/RoutingTraining.vue')
    },
    {
      path: '/training/api',
      name: 'api-training',
      component: () => import('@/pages/ApiTraining.vue')
    },
    {
      path: '/training/testing',
      name: 'testing-training',
      component: () => import('@/pages/TestingTraining.vue')
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import('@/pages/Tasks.vue')
    },
    // 动态路由示例
    {
      path: '/task/:id',
      name: 'task-detail',
      component: () => import('@/pages/TaskDetail.vue'),
      props: true
    },
    // 嵌套路由示例
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/pages/admin/AdminLayout.vue'),
      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: () => import('@/pages/admin/Dashboard.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('@/pages/admin/Users.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'settings',
          name: 'admin-settings',
          component: () => import('@/pages/admin/Settings.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    // 404页面
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFound.vue')
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  console.log(`导航: ${from.path} → ${to.path}`)
  
  // 检查是否需要认证（示例）
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  console.log(`导航完成: ${from.path} → ${to.path}`)
  
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - Vue.js 技能增强`
  } else {
    document.title = 'Vue.js 技能增强'
  }
})

function isAuthenticated(): boolean {
  const raw = localStorage.getItem('oidc_user')
  return !!raw
}

export default router
