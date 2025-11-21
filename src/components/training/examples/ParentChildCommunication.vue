<template>
  <div class="space-y-6">
    <div class="bg-gray-50 p-4 rounded-lg">
      <h3 class="text-lg font-medium text-gray-900 mb-4">父组件</h3>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">向子组件发送消息</label>
          <input
            v-model="parentMessage"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div class="text-sm text-gray-600">
          <p>从子组件接收的消息: {{ childMessage || '暂无' }}</p>
          <p>子组件计数: {{ childCount }}</p>
        </div>

        <button
          @click="sendToChild"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          发送消息给子组件
        </button>
      </div>
    </div>

    <ChildComponent
      :message="parentMessage"
      :count="parentCount"
      @response="handleChildResponse"
      @count-update="handleCountUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChildComponent from './ChildComponent.vue'

const parentMessage = ref('你好，子组件！')
const parentCount = ref(0)
const childMessage = ref('')
const childCount = ref(0)

const sendToChild = () => {
  parentCount.value++
}

const handleChildResponse = (message: string) => {
  childMessage.value = message
}

const handleCountUpdate = (count: number) => {
  childCount.value = count
}
</script>