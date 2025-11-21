<template>
  <div class="bg-white border border-gray-200 p-4 rounded-lg">
    <h4 class="text-lg font-medium text-gray-900 mb-4">子组件</h4>
    
    <div class="space-y-4">
      <div class="text-sm text-gray-600">
        <p>从父组件接收的消息: {{ message }}</p>
        <p>从父组件接收的计数: {{ count }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">回复父组件</label>
        <input
          v-model="responseMessage"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
      </div>

      <div class="flex space-x-3">
        <button
          @click="sendResponse"
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          回复父组件
        </button>
        <button
          @click="updateCount"
          class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          更新计数
        </button>
      </div>

      <div class="text-sm text-gray-600">
        <p>本地状态 - 本地计数: {{ localCount }}</p>
      </div>

      <button
        @click="incrementLocal"
        class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
      >
        增加本地计数
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  message: string
  count: number
}

interface Emits {
  (e: 'response', message: string): void
  (e: 'count-update', count: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const responseMessage = ref('你好，父组件！')
const localCount = ref(0)

const sendResponse = () => {
  emit('response', responseMessage.value)
}

const updateCount = () => {
  const newCount = props.count + 1
  emit('count-update', newCount)
}

const incrementLocal = () => {
  localCount.value++
}
</script>