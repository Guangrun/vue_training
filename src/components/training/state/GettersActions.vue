<template>
  <div class="space-y-6">
    <div class="grid grid-cols-2 gap-4">
      <div class="text-center p-4 bg-blue-50 rounded-lg">
        <h4 class="text-sm font-medium text-blue-900 mb-1">用户总数</h4>
        <div class="text-2xl font-bold text-blue-600">{{ userStore.userCount }}</div>
      </div>
      
      <div class="text-center p-4 bg-green-50 rounded-lg">
        <h4 class="text-sm font-medium text-green-900 mb-1">平均年龄</h4>
        <div class="text-2xl font-bold text-green-600">{{ userStore.averageAge }}</div>
      </div>
    </div>

    <div class="bg-gray-50 p-4 rounded-lg">
      <h4 class="font-medium text-gray-900 mb-3">当前用户</h4>
      <div v-if="userStore.currentUser" class="text-sm text-gray-600 space-y-1">
        <p>姓名: {{ userStore.currentUser.name }}</p>
        <p>邮箱: {{ userStore.currentUser.email }}</p>
        <p>年龄: {{ userStore.currentUser.age }}</p>
      </div>
    </div>

    <div class="space-y-4">
      <div class="flex space-x-3">
        <input
          v-model="newUser.name"
          type="text"
          placeholder="姓名"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <input
          v-model="newUser.email"
          type="email"
          placeholder="邮箱"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <input
          v-model.number="newUser.age"
          type="number"
          placeholder="年龄"
          min="1"
          max="120"
          class="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
      
      <button
        @click="addUser"
        :disabled="!isValidNewUser"
        class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        添加用户
      </button>
    </div>

    <div class="space-y-2">
      <h4 class="font-medium text-gray-900">用户列表</h4>
      <div class="space-y-2 max-h-60 overflow-y-auto">
        <div 
          v-for="user in userStore.users" 
          :key="user.id"
          class="flex items-center justify-between p-3 bg-white border rounded-md hover:bg-gray-50"
        >
          <div class="flex items-center space-x-3">
            <input
              type="radio"
              :id="`user-${user.id}`"
              :checked="userStore.currentUser?.id === user.id"
              @change="userStore.setCurrentUser(user.id)"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500"
            >
            <label :for="`user-${user.id}`" class="text-sm text-gray-700">
              {{ user.name }} ({{ user.age }}岁)
            </label>
          </div>
          
          <button
            @click="removeUser(user.id)"
            class="text-red-600 hover:text-red-800 text-sm"
          >
            删除
          </button>
        </div>
      </div>
    </div>

    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h4 class="font-medium text-yellow-900 mb-2">操作日志</h4>
      <div class="text-sm text-yellow-800 space-y-1">
        <p v-for="(log, index) in operationLogs" :key="index">
          {{ log }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/training'

const userStore = useUserStore()
const operationLogs = ref<string[]>([])

const newUser = ref({
  name: '',
  email: '',
  age: 18
})

const isValidNewUser = computed(() => {
  return newUser.value.name.trim() && 
         newUser.value.email.trim() && 
         newUser.value.age >= 1 && 
         newUser.value.age <= 120
})

const addUser = () => {
  if (!isValidNewUser.value) return
  
  userStore.addUser({ ...newUser.value })
  operationLogs.value.push(`添加用户: ${newUser.value.name}`)
  
  // 重置表单
  newUser.value = { name: '', email: '', age: 18 }
}

const removeUser = (id: number) => {
  const user = userStore.users.find(u => u.id === id)
  if (user) {
    userStore.removeUser(id)
    operationLogs.value.push(`删除用户: ${user.name}`)
  }
}
</script>