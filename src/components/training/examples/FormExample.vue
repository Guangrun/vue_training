<template>
  <div class="space-y-4">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
        <input
          v-model="form.username"
          type="text"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
          :class="errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
        >
        <p v-if="errors.username" class="text-sm text-red-600 mt-1">{{ errors.username }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
        <input
          v-model="form.email"
          type="email"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
          :class="errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
        >
        <p v-if="errors.email" class="text-sm text-red-600 mt-1">{{ errors.email }}</p>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">年龄</label>
        <input
          v-model.number="form.age"
          type="number"
          min="1"
          max="120"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
          :class="errors.age ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
        >
        <p v-if="errors.age" class="text-sm text-red-600 mt-1">{{ errors.age }}</p>
      </div>

      <div class="flex space-x-3">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? '提交中...' : '提交' }}
        </button>
        <button
          type="button"
          @click="resetForm"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          重置
        </button>
      </div>
    </form>

    <div v-if="submittedData" class="p-4 bg-green-50 border border-green-200 rounded-md">
      <h4 class="font-medium text-green-900 mb-2">提交的数据:</h4>
      <pre class="text-sm text-green-800">{{ JSON.stringify(submittedData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useForm } from '@/composables/training'

interface FormData {
  username: string
  email: string
  age: number
}

const submittedData = ref<FormData | null>(null)

const { form, errors, isSubmitting, validate, reset } = useForm<FormData>({
  username: '',
  email: '',
  age: 18
})

const validators = {
  username: (value: string) => {
    if (!value.trim()) return '用户名不能为空'
    if (value.length < 3) return '用户名至少需要3个字符'
    return ''
  },
  email: (value: string) => {
    if (!value.trim()) return '邮箱不能为空'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return '请输入有效的邮箱地址'
    return ''
  },
  age: (value: number) => {
    if (!value) return '年龄不能为空'
    if (value < 1 || value > 120) return '年龄必须在1-120之间'
    return ''
  }
}

const handleSubmit = () => {
  if (!validate(validators)) return

  isSubmitting.value = true
  
  // 模拟API提交
  setTimeout(() => {
    submittedData.value = { ...form }
    isSubmitting.value = false
    alert('表单提交成功！')
  }, 1000)
}

const resetForm = () => {
  reset()
  submittedData.value = null
}
</script>