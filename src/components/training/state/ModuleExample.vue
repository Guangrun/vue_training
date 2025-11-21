<template>
  <div class="space-y-6">
    <div class="grid grid-cols-2 gap-4">
      <div class="p-4 bg-blue-50 rounded-lg">
        <h4 class="text-sm font-medium text-blue-900 mb-2">计数器模块</h4>
        <div class="text-2xl font-bold text-blue-600">{{ counter.count }}</div>
        <div class="text-sm text-blue-700">{{ counter.doubleCount }}</div>
      </div>
      
      <div class="p-4 bg-green-50 rounded-lg">
        <h4 class="text-sm font-medium text-green-900 mb-2">用户模块</h4>
        <div class="text-2xl font-bold text-green-600">{{ userStore.userCount }}</div>
        <div class="text-sm text-green-700">{{ userStore.averageAge }}岁</div>
      </div>
    </div>

    <div class="bg-gray-50 p-4 rounded-lg">
      <h4 class="font-medium text-gray-900 mb-3">跨模块交互</h4>
      
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">计数器值影响用户数量</span>
          <span class="text-sm font-medium" :class="userCountBasedOnCounter > 0 ? 'text-green-600' : 'text-gray-400'">
            {{ userCountBasedOnCounter }} 个用户
          </span>
        </div>
        
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">用户平均年龄影响计数器</span>
          <span class="text-sm font-medium text-blue-600">
            +{{ counterBonus }}
          </span>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-3">
        <h5 class="font-medium text-gray-900">控制计数器</h5>
        <div class="flex space-x-2">
          <button
            @click="counter.increment"
            class="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            +1
          </button>
          <button
            @click="counter.decrement"
            class="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            -1
          </button>
          <button
            @click="counter.reset"
            class="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
          >
            重置
          </button>
        </div>
      </div>
      
      <div class="space-y-3">
        <h5 class="font-medium text-gray-900">控制用户</h5>
        <div class="flex space-x-2">
          <button
            @click="addRandomUser"
            class="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            添加用户
          </button>
          <button
            @click="removeLastUser"
            class="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            删除用户
          </button>
        </div>
      </div>
    </div>

    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h5 class="font-medium text-yellow-900 mb-2">模块间通信日志</h5>
      <div class="text-sm text-yellow-800 space-y-1 max-h-32 overflow-y-auto">
        <p v-for="(log, index) in communicationLogs" :key="index" class="text-xs">
          {{ log }}
        </p>
      </div>
    </div>

    <div class="text-center">
      <button
        @click="showAdvanced = !showAdvanced"
        class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
      >
        {{ showAdvanced ? '隐藏' : '显示' }}高级功能
      </button>
    </div>

    <div v-if="showAdvanced" class="p-4 bg-purple-50 rounded-lg space-y-4">
      <h5 class="font-medium text-purple-900">高级模块化功能</h5>
      
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">计数器增量</label>
          <div class="flex space-x-2">
            <input
              v-model.number="customIncrement"
              type="number"
              class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
            <button
              @click="counter.incrementBy(customIncrement)"
              class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
            >
              应用
            </button>
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">用户年龄</label>
          <div class="flex space-x-2">
            <input
              v-model.number="customAge"
              type="number"
              class="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
            <button
              @click="addUserWithAge"
              class="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700"
            >
              添加
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useCounterStore, useUserStore } from '@/stores/training'

const counter = useCounterStore()
const userStore = useUserStore()
const communicationLogs = ref<string[]>([])
const showAdvanced = ref(false)
const customIncrement = ref(5)
const customAge = ref(25)

// 计算属性：基于计数器的用户数量
const userCountBasedOnCounter = computed(() => {
  return Math.floor(counter.count / 10)
})

// 计算属性：基于用户平均年龄的计数器奖励
const counterBonus = computed(() => {
  const avgAge = userStore.averageAge
  return avgAge > 30 ? 2 : 0
})

// 监听计数器变化
watch(() => counter.count, (newCount, oldCount) => {
  communicationLogs.value.push(`计数器变化: ${oldCount} → ${newCount}`)
  
  // 每增加10个计数，添加一个用户
  if (newCount % 10 === 0 && newCount > oldCount) {
    const userNames = ['小明', '小红', '小刚', '小丽', '小华']
    const randomName = userNames[Math.floor(Math.random() * userNames.length)]
    userStore.addUser({
      name: randomName,
      email: `${randomName.toLowerCase()}@example.com`,
      age: 20 + Math.floor(Math.random() * 20)
    })
    communicationLogs.value.push(`自动添加用户: ${randomName}`)
  }
})

// 监听用户变化
watch(() => userStore.users.length, (newLength, oldLength) => {
  if (newLength !== oldLength) {
    communicationLogs.value.push(`用户数量变化: ${oldLength} → ${newLength}`)
  }
})

const addRandomUser = () => {
  const names = ['张三', '李四', '王五', '赵六', '钱七']
  const randomName = names[Math.floor(Math.random() * names.length)]
  userStore.addUser({
    name: randomName,
    email: `${randomName.toLowerCase()}@example.com`,
    age: 20 + Math.floor(Math.random() * 30)
  })
}

const removeLastUser = () => {
  if (userStore.users.length > 0) {
    const lastUser = userStore.users[userStore.users.length - 1]
    userStore.removeUser(lastUser.id)
  }
}

const addUserWithAge = () => {
  const names = ['新用户', '测试用户', '示例用户']
  const randomName = names[Math.floor(Math.random() * names.length)]
  userStore.addUser({
    name: randomName,
    email: `${randomName.toLowerCase()}@example.com`,
    age: customAge.value
  })
}
</script>