<template>
  <div class="space-y-6">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">数据缓存演示</h3>
      <p class="text-sm text-blue-800">学习不同的数据缓存策略和实现</p>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">用户数据缓存</h4>
      
      <div class="flex space-x-3">
        <button
          @click="loadUsersWithoutCache"
          class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          无缓存加载
        </button>
        
        <button
          @click="loadUsersWithCache"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          带缓存加载
        </button>
        
        <button
          @click="clearUserCache"
          class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          清除缓存
        </button>
      </div>

      <div class="p-3 bg-gray-50 rounded-md">
        <div class="text-sm text-gray-600 space-y-1">
          <p>加载状态: <span :class="loadingClass">{{ loadingStatus }}</span></p>
          <p>数据来源: <span :class="sourceClass">{{ dataSource }}</span></p>
          <p>加载时间: <span class="font-mono">{{ loadTime }}ms</span></p>
        </div>
      </div>

      <div v-if="users.length > 0" class="space-y-2">
        <div 
          v-for="user in users" 
          :key="user.id"
          class="p-3 bg-white border rounded-md"
        >
          <div class="flex items-center justify-between">
            <div>
              <h5 class="font-medium text-gray-900">{{ user.name }}</h5>
              <p class="text-sm text-gray-600">{{ user.email }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">年龄: {{ user.age }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">本地存储缓存</h4>
      
      <div class="flex space-x-3">
        <button
          @click="saveToLocalStorage"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          保存到本地存储
        </button>
        
        <button
          @click="loadFromLocalStorage"
          class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          从本地存储加载
        </button>
        
        <button
          @click="clearLocalStorage"
          class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          清除本地存储
        </button>
      </div>

      <div v-if="localStorageData" class="p-3 bg-blue-50 border border-blue-200 rounded-md">
        <h5 class="font-medium text-blue-900 mb-2">本地存储数据</h5>
        <pre class="text-sm text-blue-800">{{ JSON.stringify(localStorageData, null, 2) }}</pre>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">缓存统计</h4>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h5 class="font-medium text-green-900 mb-2">内存缓存</h5>
          <div class="text-sm text-green-800 space-y-1">
            <p>总条目: {{ cacheStats.total }}</p>
            <p>有效条目: {{ cacheStats.valid }}</p>
            <p>过期条目: {{ cacheStats.expired }}</p>
          </div>
        </div>

        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 class="font-medium text-blue-900 mb-2">本地存储缓存</h5>
          <div class="text-sm text-blue-800 space-y-1">
            <p>已使用: {{ localStorageUsed ? '是' : '否' }}</p>
            <p>数据大小: {{ localStorageSize }} 字符</p>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h4 class="font-medium text-yellow-900 mb-2">缓存策略说明</h4>
      <ul class="text-sm text-yellow-800 space-y-1">
        <li>• <strong>内存缓存:</strong> 快速访问，页面刷新后失效</li>
        <li>• <strong>本地存储缓存:</strong> 持久化存储，可跨会话使用</li>
        <li>• <strong>缓存TTL:</strong> 设置过期时间，自动清理过期数据</li>
        <li>• <strong>缓存标签:</strong> 批量失效相关缓存数据</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { cache, withCache, localStorageCache } from '@/utils/cache'
import { userApi } from '@/api/client'

interface User {
  id: number
  name: string
  email: string
  age: number
}

const users = ref<User[]>([])
const loading = ref(false)
const dataSource = ref('')
const loadTime = ref(0)
const localStorageData = ref<any>(null)

const cacheStats = computed(() => cache.getStats())
const localStorageUsed = computed(() => {
  try {
    return localStorage.length > 0
  } catch {
    return false
  }
})

const localStorageSize = computed(() => {
  try {
    return localStorage.length
  } catch {
    return 0
  }
})

const loadingClass = computed(() => ({
  'text-red-600': loading.value,
  'text-green-600': !loading.value
}))

const sourceClass = computed(() => ({
  'text-red-600': dataSource.value === 'API',
  'text-green-600': dataSource.value === '缓存'
}))

const loadUsersWithoutCache = async () => {
  loading.value = true
  const startTime = Date.now()
  
  try {
    // 强制清除缓存
    cache.clear()
    
    const response = await userApi.getUsers()
    users.value = response.users
    dataSource.value = 'API'
    loadTime.value = Date.now() - startTime
  } catch (error) {
    console.error('加载用户数据失败:', error)
  } finally {
    loading.value = false
  }
}

const loadUsersWithCache = async () => {
  loading.value = true
  const startTime = Date.now()
  
  try {
    const response = await withCache('users', () => userApi.getUsers(), 60000) // 1分钟缓存
    users.value = response.users
    dataSource.value = '缓存'
    loadTime.value = Date.now() - startTime
  } catch (error) {
    console.error('加载用户数据失败:', error)
  } finally {
    loading.value = false
  }
}

const clearUserCache = () => {
  cache.clear()
  users.value = []
  dataSource.value = ''
  loadTime.value = 0
}

const saveToLocalStorage = () => {
  const data = {
    timestamp: new Date().toISOString(),
    users: users.value,
    settings: {
      theme: 'light',
      language: 'zh-CN'
    }
  }
  
  localStorageCache.set('app-data', data, 24 * 60 * 60 * 1000) // 24小时
  alert('数据已保存到本地存储')
}

const loadFromLocalStorage = () => {
  const data = localStorageCache.get('app-data')
  if (data) {
    localStorageData.value = data
  } else {
    alert('本地存储中没有数据')
  }
}

const clearLocalStorage = () => {
  localStorageCache.clear()
  localStorageData.value = null
  alert('本地存储已清除')
}
</script>