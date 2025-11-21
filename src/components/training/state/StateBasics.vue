<template>
  <div class="space-y-6">
    <div class="text-center p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">计数器状态</h3>
      <div class="text-3xl font-bold text-blue-600">{{ counter.count }}</div>
      <div class="text-sm text-blue-700 mt-1">
        Double: {{ counter.doubleCount }} | Triple: {{ counter.tripleCount }}
      </div>
    </div>

    <div class="flex justify-center space-x-3">
      <button
        @click="counter.decrement"
        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        :disabled="counter.count <= 0"
        :class="{ 'opacity-50 cursor-not-allowed': counter.count <= 0 }"
      >
        -1
      </button>
      
      <button
        @click="counter.increment"
        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        +1
      </button>
      
      <button
        @click="counter.incrementBy(5)"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        +5
      </button>
      
      <button
        @click="counter.reset"
        class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
      >
        重置
      </button>
    </div>

    <div class="p-4 bg-gray-50 rounded-lg">
      <h4 class="font-medium text-gray-900 mb-2">状态信息</h4>
      <div class="text-sm text-gray-600 space-y-1">
        <p>Store名称: {{ counter.$id }}</p>
        <p>计数器名称: {{ counter.name }}</p>
        <p>当前值: {{ counter.count }}</p>
        <p>双倍值: {{ counter.doubleCount }}</p>
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
      <h4 class="font-medium text-purple-900">高级状态操作</h4>
      
      <div class="flex space-x-3">
        <input
          v-model.number="customAmount"
          type="number"
          placeholder="自定义数值"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
        <button
          @click="counter.incrementBy(customAmount)"
          class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          增加
        </button>
      </div>

      <div class="flex space-x-3">
        <input
          v-model="customName"
          type="text"
          placeholder="自定义名称"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
        <button
          @click="counter.name = customName"
          class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          更新名称
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '@/stores/training'

const counter = useCounterStore()
const showAdvanced = ref(false)
const customAmount = ref(10)
const customName = ref('')
</script>