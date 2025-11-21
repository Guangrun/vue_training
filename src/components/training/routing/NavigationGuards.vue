<template>
  <div class="space-y-6">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">导航守卫演示</h3>
      <p class="text-sm text-blue-800">观察控制台中的导航日志</p>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">需要认证的页面</h4>
      
      <div class="grid gap-2">
        <button
          @click="goToAdmin"
          class="p-3 bg-white border rounded-md hover:bg-gray-50 text-left transition-colors"
        >
          <div class="flex items-center justify-between">
            <div>
              <h5 class="font-medium text-gray-900">管理后台</h5>
              <p class="text-sm text-gray-600">需要登录才能访问</p>
            </div>
            <span 
              class="px-2 py-1 text-xs rounded-full"
              :class="isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
            >
              {{ isAuthenticated ? '已认证' : '未认证' }}
            </span>
          </div>
        </button>
      </div>

      <div class="flex space-x-3">
        <button
          v-if="!isAuthenticated"
          @click="login"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          模拟登录
        </button>
        
        <button
          v-if="isAuthenticated"
          @click="logout"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          退出登录
        </button>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">导航历史记录</h4>
      
      <div class="bg-gray-50 p-4 rounded-lg">
        <div class="space-y-2 max-h-40 overflow-y-auto">
          <div 
            v-for="(log, index) in navigationLogs" 
            :key="index"
            class="text-sm"
            :class="log.type === 'before' ? 'text-blue-600' : 'text-green-600'"
          >
            <span class="font-mono text-xs">{{ formatTime(log.timestamp) }}</span>
            {{ log.message }}
          </div>
        </div>
      </div>
      
      <button
        @click="clearLogs"
        class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
      >
        清除日志
      </button>
    </div>

    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h4 class="font-medium text-yellow-900 mb-2">导航守卫说明</h4>
      <ul class="text-sm text-yellow-800 space-y-1">
        <li>• <strong>全局前置守卫:</strong> 在导航触发前调用</li>
        <li>• <strong>路由独享守卫:</strong> 在路由配置中定义</li>
        <li>• <strong>组件内守卫:</strong> 在组件内部定义</li>
        <li>• <strong>全局后置钩子:</strong> 在导航完成后调用</li>
      </ul>
    </div>

    <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h4 class="font-medium text-purple-900 mb-2">当前导航信息</h4>
      <div class="text-sm text-purple-800 space-y-1">
        <p>来源路由: {{ $route.path }}</p>
        <p>认证状态: {{ isAuthenticated ? '已认证' : '未认证' }}</p>
        <p>日志数量: {{ navigationLogs.length }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

interface NavigationLog {
  timestamp: Date
  message: string
  type: 'before' | 'after'
}

const router = useRouter()
const navigationLogs = ref<NavigationLog[]>([])
const isAuthenticated = computed(() => localStorage.getItem('token') !== null)

// 添加导航日志
const addLog = (message: string, type: 'before' | 'after') => {
  navigationLogs.value.push({
    timestamp: new Date(),
    message,
    type
  })
  
  // 限制日志数量
  if (navigationLogs.value.length > 20) {
    navigationLogs.value.shift()
  }
}

// 导航守卫函数
const beforeEachGuard = (to: any, from: any, next: any) => {
  addLog(`导航守卫: ${from.path} → ${to.path}`, 'before')
  
  // 检查认证
  if (to.path.startsWith('/admin') && !isAuthenticated.value) {
    addLog(`导航被阻止: 需要认证`, 'before')
    alert('请先登录！')
    next(false)
  } else {
    next()
  }
}

const afterEachHook = (to: any, from: any) => {
  addLog(`导航完成: ${from.path} → ${to.path}`, 'after')
}

// 登录/登出功能
const login = () => {
  localStorage.setItem('token', 'demo-token')
  addLog('用户登录成功', 'after')
}

const logout = () => {
  localStorage.removeItem('token')
  addLog('用户退出登录', 'after')
}

const goToAdmin = () => {
  router.push('/admin')
}

const clearLogs = () => {
  navigationLogs.value = []
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('zh-CN', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

onMounted(() => {
  // 注册导航守卫
  router.beforeEach(beforeEachGuard)
  router.afterEach(afterEachHook)
  
  addLog('导航守卫组件已挂载', 'after')
})

onUnmounted(() => {
  // 清理导航守卫（可选）
  addLog('导航守卫组件已卸载', 'after')
})
</script>