<template>
  <div class="space-y-6">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">表单处理和验证演示</h3>
      <p class="text-sm text-blue-800">学习表单验证、错误处理和提交状态管理</p>
    </div>

    <div class="bg-white border rounded-lg p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              用户名 *
            </label>
            <input
              v-model="form.username"
              type="text"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              :class="errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
              :disabled="submitting"
            >
            <p v-if="errors.username" class="text-sm text-red-600 mt-1">{{ errors.username }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              邮箱 *
            </label>
            <input
              v-model="form.email"
              type="email"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              :class="errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
              :disabled="submitting"
            >
            <p v-if="errors.email" class="text-sm text-red-600 mt-1">{{ errors.email }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              密码 *
            </label>
            <input
              v-model="form.password"
              type="password"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              :class="errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
              :disabled="submitting"
            >
            <p v-if="errors.password" class="text-sm text-red-600 mt-1">{{ errors.password }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              确认密码 *
            </label>
            <input
              v-model="form.confirmPassword"
              type="password"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              :class="errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
              :disabled="submitting"
            >
            <p v-if="errors.confirmPassword" class="text-sm text-red-600 mt-1">{{ errors.confirmPassword }}</p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            年龄
          </label>
          <input
            v-model.number="form.age"
            type="number"
            min="1"
            max="120"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="errors.age ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
            :disabled="submitting"
          >
          <p v-if="errors.age" class="text-sm text-red-600 mt-1">{{ errors.age }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            个人简介
          </label>
          <textarea
            v-model="form.bio"
            rows="4"
            class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
            :class="errors.bio ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'"
            :disabled="submitting"
            placeholder="请简单介绍一下自己..."
          ></textarea>
          <div class="flex justify-between items-center mt-1">
            <p v-if="errors.bio" class="text-sm text-red-600">{{ errors.bio }}</p>
            <p class="text-sm text-gray-500">{{ form.bio.length }}/200</p>
          </div>
        </div>

        <div>
          <label class="flex items-center">
            <input
              v-model="form.agreeToTerms"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              :disabled="submitting"
            >
            <span class="ml-2 text-sm text-gray-700">
              我同意
              <a href="#" class="text-blue-600 hover:text-blue-800">服务条款</a>
              和
              <a href="#" class="text-blue-600 hover:text-blue-800">隐私政策</a>
            </span>
          </label>
          <p v-if="errors.agreeToTerms" class="text-sm text-red-600 mt-1">{{ errors.agreeToTerms }}</p>
        </div>

        <div class="flex items-center justify-between">
          <button
            type="button"
            @click="resetForm"
            :disabled="submitting"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            重置
          </button>
          
          <button
            type="submit"
            :disabled="submitting || !hasChanges"
            class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ submitting ? '提交中...' : '提交表单' }}
          </button>
        </div>
      </form>
    </div>

    <div v-if="submitResult" class="bg-white border rounded-lg p-6">
      <h4 class="font-medium text-gray-900 mb-3">提交结果</h4>
      
      <div 
        class="p-4 rounded-lg"
        :class="submitResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'"
      >
        <h5 
          class="font-medium mb-2"
          :class="submitResult.success ? 'text-green-900' : 'text-red-900'"
        >
          {{ submitResult.success ? '提交成功！' : '提交失败！' }}
        </h5>
        <p 
          class="text-sm"
          :class="submitResult.success ? 'text-green-800' : 'text-red-800'"
        >
          {{ submitResult.message }}
        </p>
        
        <div v-if="submitResult.data" class="mt-3">
          <p class="text-sm font-medium text-gray-700 mb-2">提交的数据:</p>
          <pre class="text-xs bg-gray-100 p-2 rounded">{{ JSON.stringify(submitResult.data, null, 2) }}</pre>
        </div>
      </div>
      
      <button
        @click="submitResult = null"
        class="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
      >
        关闭
      </button>
    </div>

    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="font-medium text-green-900 mb-2">表单验证说明</h4>
      <ul class="text-sm text-green-800 space-y-1">
        <li>• 实时验证：输入时即时检查格式</li>
        <li>• 提交验证：提交时进行完整验证</li>
        <li>• 异步验证：支持服务器端验证</li>
        <li>• 自定义验证：支持复杂的业务规则</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'

interface FormData {
  username: string
  email: string
  password: string
  confirmPassword: string
  age: number | null
  bio: string
  agreeToTerms: boolean
}

interface FormErrors {
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
  age?: string
  bio?: string
  agreeToTerms?: string
}

interface SubmitResult {
  success: boolean
  message: string
  data?: any
}

const form = reactive<FormData>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  age: null,
  bio: '',
  agreeToTerms: false
})

const errors = reactive<FormErrors>({})
const submitting = ref(false)
const submitResult = ref<SubmitResult | null>(null)
const initialForm = JSON.parse(JSON.stringify(form))

const hasChanges = computed(() => {
  return JSON.stringify(form) !== JSON.stringify(initialForm)
})

// 验证函数
const validateUsername = (username: string): string | undefined => {
  if (!username.trim()) {
    return '用户名不能为空'
  }
  if (username.length < 3) {
    return '用户名至少需要3个字符'
  }
  if (username.length > 20) {
    return '用户名不能超过20个字符'
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return '用户名只能包含字母、数字和下划线'
  }
  return undefined
}

const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) {
    return '邮箱不能为空'
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return '请输入有效的邮箱地址'
  }
  return undefined
}

const validatePassword = (password: string): string | undefined => {
  if (!password) {
    return '密码不能为空'
  }
  if (password.length < 6) {
    return '密码至少需要6个字符'
  }
  if (password.length > 50) {
    return '密码不能超过50个字符'
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return '密码必须包含大小写字母和数字'
  }
  return undefined
}

const validateConfirmPassword = (confirmPassword: string): string | undefined => {
  if (!confirmPassword) {
    return '请确认密码'
  }
  if (confirmPassword !== form.password) {
    return '两次输入的密码不一致'
  }
  return undefined
}

const validateAge = (age: number | null): string | undefined => {
  if (age === null || age === undefined) {
    return undefined // 年龄是可选的
  }
  if (age < 1 || age > 120) {
    return '年龄必须在1-120之间'
  }
  return undefined
}

const validateBio = (bio: string): string | undefined => {
  if (bio.length > 200) {
    return '个人简介不能超过200个字符'
  }
  return undefined
}

// 实时验证
watch(() => form.username, (newValue) => {
  errors.username = validateUsername(newValue)
})

watch(() => form.email, (newValue) => {
  errors.email = validateEmail(newValue)
})

watch(() => form.password, (newValue) => {
  errors.password = validatePassword(newValue)
  // 同时验证确认密码
  if (form.confirmPassword) {
    errors.confirmPassword = validateConfirmPassword(form.confirmPassword)
  }
})

watch(() => form.confirmPassword, (newValue) => {
  errors.confirmPassword = validateConfirmPassword(newValue)
})

watch(() => form.age, (newValue) => {
  errors.age = validateAge(newValue)
})

watch(() => form.bio, (newValue) => {
  errors.bio = validateBio(newValue)
})

// 表单验证
const validateForm = (): boolean => {
  // 清除之前的错误
  Object.keys(errors).forEach(key => {
    delete errors[key as keyof FormErrors]
  })

  // 验证所有字段
  const usernameError = validateUsername(form.username)
  const emailError = validateEmail(form.email)
  const passwordError = validatePassword(form.password)
  const confirmPasswordError = validateConfirmPassword(form.confirmPassword)
  const ageError = validateAge(form.age)
  const bioError = validateBio(form.bio)

  if (usernameError) errors.username = usernameError
  if (emailError) errors.email = emailError
  if (passwordError) errors.password = passwordError
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError
  if (ageError) errors.age = ageError
  if (bioError) errors.bio = bioError
  if (!form.agreeToTerms) errors.agreeToTerms = '请同意服务条款和隐私政策'

  return Object.keys(errors).length === 0
}

// 提交表单
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  submitting.value = true

  try {
    // 模拟API提交
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 模拟随机成功/失败
    if (Math.random() > 0.1) { // 90%成功率
      submitResult.value = {
        success: true,
        message: '表单提交成功！您的账户已创建。',
        data: {
          username: form.username,
          email: form.email,
          age: form.age,
          bio: form.bio,
          submittedAt: new Date().toISOString()
        }
      }
      
      // 重置表单
      Object.assign(form, JSON.parse(JSON.stringify(initialForm)))
    } else {
      // 模拟服务器验证失败
      throw new Error('用户名已存在，请选择其他用户名')
    }
  } catch (error) {
    submitResult.value = {
      success: false,
      message: error instanceof Error ? error.message : '提交失败，请稍后重试'
    }
  } finally {
    submitting.value = false
  }
}

// 重置表单
const resetForm = () => {
  Object.assign(form, JSON.parse(JSON.stringify(initialForm)))
  Object.keys(errors).forEach(key => {
    delete errors[key as keyof FormErrors]
  })
  submitResult.value = null
}
</script>