<template>
  <div class="space-y-6">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">HTTP客户端演示</h3>
      <p class="text-sm text-blue-800">使用封装的API客户端进行HTTP请求</p>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">用户列表</h4>
      
      <div class="flex space-x-3">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索用户..."
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <button
          @click="loadUsers"
          :disabled="loading"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? '加载中...' : '加载用户' }}
        </button>
      </div>

      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="text-gray-600 mt-2">正在加载用户数据...</p>
      </div>

      <div v-else-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h5 class="font-medium text-red-900 mb-2">错误信息</h5>
        <p class="text-sm text-red-800">{{ error }}</p>
        <button
          @click="loadUsers"
          class="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          重试
        </button>
      </div>

      <div v-else-if="users.length > 0" class="space-y-2">
        <div 
          v-for="user in filteredUsers" 
          :key="user.id"
          class="p-3 bg-white border rounded-md hover:bg-gray-50"
        >
          <div class="flex items-center justify-between">
            <div>
              <h5 class="font-medium text-gray-900">{{ user.name }}</h5>
              <p class="text-sm text-gray-600">{{ user.email }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-500">年龄: {{ user.age }}</p>
              <button
                @click="loadUserDetail(user.id)"
                class="text-blue-600 hover:text-blue-800 text-sm"
              >
                查看详情
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-8 text-gray-500">
        <p>暂无用户数据</p>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">创建新用户</h4>
      
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <input
          v-model="newUser.name"
          type="text"
          placeholder="姓名"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
        <input
          v-model="newUser.email"
          type="email"
          placeholder="邮箱"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
        <input
          v-model.number="newUser.age"
          type="number"
          placeholder="年龄"
          min="1"
          max="120"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
      </div>
      
      <button
        @click="createUser"
        :disabled="!isValidNewUser || creating"
        class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ creating ? '创建中...' : '创建用户' }}
      </button>
    </div>

    <div v-if="selectedUser" class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h4 class="font-medium text-yellow-900 mb-2">用户详情</h4>
      <div class="text-sm text-yellow-800 space-y-1">
        <p><strong>ID:</strong> {{ selectedUser.id }}</p>
        <p><strong>姓名:</strong> {{ selectedUser.name }}</p>
        <p><strong>邮箱:</strong> {{ selectedUser.email }}</p>
        <p><strong>年龄:</strong> {{ selectedUser.age }}</p>
      </div>
    </div>

    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="font-medium text-green-900 mb-2">HTTP客户端说明</h4>
      <ul class="text-sm text-green-800 space-y-1">
        <li>• 封装了fetch API，提供统一的错误处理</li>
        <li>• 支持请求超时和取消功能</li>
        <li>• 自动处理JSON数据的序列化和反序列化</li>
        <li>• 提供类型安全的API调用</li>
      </ul>
    </div>

    <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h4 class="font-medium text-purple-900 mb-2">API调用统计</h4>
      <div class="text-sm text-purple-800 space-y-1">
        <p>总请求数: {{ apiStats.total }}</p>
        <p>成功请求: {{ apiStats.success }}</p>
        <p>失败请求: {{ apiStats.error }}</p>
        <p>平均响应时间: {{ apiStats.avgTime }}ms</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { userApi } from '@/api/client'

interface User {
  id: number
  name: string
  email: string
  age: number
}

interface ApiStats {
  total: number
  success: number
  error: number
  avgTime: number
}

const users = ref<User[]>([])
const selectedUser = ref<User | null>(null)
const loading = ref(false)
const creating = ref(false)
const error = ref('')
const searchQuery = ref('')

const newUser = ref({
  name: '',
  email: '',
  age: 18
})

const apiStats = ref<ApiStats>({
  total: 0,
  success: 0,
  error: 0,
  avgTime: 0
})

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  
  return users.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const isValidNewUser = computed(() => {
  return newUser.value.name.trim() &&
         newUser.value.email.trim() &&
         newUser.value.age >= 1 &&
         newUser.value.age <= 120
})

const loadUsers = async () => {
  loading.value = true
  error.value = ''
  
  const startTime = Date.now()
  
  try {
    const response = await userApi.getUsers({
      search: searchQuery.value || undefined
    })
    
    users.value = response.users
    apiStats.value.success++
    
    console.log('用户数据加载成功:', response)
  } catch (err) {
    error.value = err instanceof Error ? err.message : '加载用户数据失败'
    apiStats.value.error++
    console.error('加载用户数据失败:', err)
  } finally {
    loading.value = false
    apiStats.value.total++
    
    const responseTime = Date.now() - startTime
    apiStats.value.avgTime = Math.round(
      (apiStats.value.avgTime * (apiStats.value.total - 1) + responseTime) / apiStats.value.total
    )
  }
}

const loadUserDetail = async (id: number) => {
  try {
    const user = await userApi.getUser(id)
    selectedUser.value = user
  } catch (err) {
    alert(`加载用户详情失败: ${err instanceof Error ? err.message : '未知错误'}`)
  }
}

const createUser = async () => {
  if (!isValidNewUser.value) return
  
  creating.value = true
  
  try {
    const user = await userApi.createUser({ ...newUser.value })
    users.value.push(user)
    
    // 重置表单
    newUser.value = { name: '', email: '', age: 18 }
    
    alert('用户创建成功！')
  } catch (err) {
    alert(`创建用户失败: ${err instanceof Error ? err.message : '未知错误'}`)
  } finally {
    creating.value = false
  }
}

onMounted(() => {
  loadUsers()
})
</script>