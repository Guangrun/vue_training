<template>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">基础输入框</label>
      <input
        v-model="basicInput"
        type="text"
        placeholder="请输入文本..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
      <p class="text-sm text-gray-600 mt-1">输入值: {{ basicInput }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">带验证的输入框</label>
      <input
        v-model="validatedInput"
        type="email"
        placeholder="请输入邮箱地址..."
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
        :class="emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
      >
      <p v-if="emailError" class="text-sm text-red-600 mt-1">{{ emailError }}</p>
      <p v-else-if="validatedInput" class="text-sm text-green-600 mt-1">邮箱格式正确</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">文本域</label>
      <textarea
        v-model="textareaInput"
        rows="3"
        placeholder="请输入多行文本..."
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
      <p class="text-sm text-gray-600 mt-1">字符数: {{ textareaInput.length }}</p>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">选择框</label>
      <select
        v-model="selectedOption"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">请选择...</option>
        <option value="option1">选项 1</option>
        <option value="option2">选项 2</option>
        <option value="option3">选项 3</option>
      </select>
      <p class="text-sm text-gray-600 mt-1">选中值: {{ selectedOption || '未选择' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const basicInput = ref('')
const validatedInput = ref('')
const textareaInput = ref('')
const selectedOption = ref('')

const emailError = computed(() => {
  if (!validatedInput.value) return ''
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(validatedInput.value) ? '' : '请输入有效的邮箱地址'
})
</script>