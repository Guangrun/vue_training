<template>
  <div class="space-y-6">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">错误处理演示</h3>
      <p class="text-sm text-blue-800">模拟各种API错误情况</p>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">触发不同类型的错误</h4>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          @click="triggerNetworkError"
          class="p-3 bg-white border rounded-md hover:bg-gray-50 text-left transition-colors"
        >
          <div class="font-medium text-gray-900">网络错误</div>
          <div class="text-sm text-gray-600">模拟网络连接失败</div>
        </button>

        <button
          @click="triggerTimeoutError"
          class="p-3 bg-white border rounded-md hover:bg-gray-50 text-left transition-colors"
        >
          <div class="font-medium text-gray-900">超时错误</div>
          <div class="text-sm text-gray-600">模拟请求超时</div>
        </button>

        <button
          @click="triggerServerError"
          class="p-3 bg-white border rounded-md hover:bg-gray-50 text-left transition-colors"
        >
          <div class="font-medium text-gray-900">服务器错误</div>
          <div class="text-sm text-gray-600">模拟500错误</div>
        </button>

        <button
          @click="triggerNotFoundError"
          class="p-3 bg-white border rounded-md hover:bg-gray-50 text-left transition-colors"
        >
          <div class="font-medium text-gray-900">404错误</div>
          <div class="text-sm text-gray-600">模拟资源未找到</div>
        </button>

        <button
          @click="triggerValidationError"
          class="p-3 bg-white border rounded-md hover:bg-gray-50 text-left transition-colors"
        >
          <div class="font-medium text-gray-900">验证错误</div>
          <div class="text-sm text-gray-600">模拟表单验证失败</div>
        </button>

        <button
          @click="triggerUnauthorizedError"
          class="p-3 bg-white border rounded-md hover:bg-gray-50 text-left transition-colors"
        >
          <div class="font-medium text-gray-900">未授权错误</div>
          <div class="text-sm text-gray-600">模拟401错误</div>
        </button>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">错误处理结果</h4>
      
      <div v-if="currentError" class="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h5 class="font-medium text-red-900 mb-2">错误信息</h5>
        <div class="text-sm text-red-800 space-y-1">
          <p><strong>类型:</strong> {{ currentError.type }}</p>
          <p><strong>消息:</strong> {{ currentError.message }}</p>
          <p v-if="currentError.details"><strong>详情:</strong> {{ currentError.details }}</p>
        </div>
        
        <div class="mt-3 flex space-x-2">
          <button
            @click="retryOperation"
            class="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          >
            重试
          </button>
          <button
            @click="clearError"
            class="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
          >
            清除
          </button>
        </div>
      </div>

      <div v-else-if="successMessage" class="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h5 class="font-medium text-green-900 mb-2">操作成功</h5>
        <p class="text-sm text-green-800">{{ successMessage }}</p>
      </div>

      <div v-else class="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center text-gray-600">
        <p>点击上面的按钮来触发不同类型的错误</p>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">错误处理策略</h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 class="font-medium text-blue-900 mb-2">重试机制</h5>
          <ul class="text-sm text-blue-800 space-y-1">
            <li>• 网络错误自动重试3次</li>
            <li>• 指数退避策略</li>
            <li>• 用户可选择手动重试</li>
          </ul>
        </div>

        <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h5 class="font-medium text-yellow-900 mb-2">用户友好的错误信息</h5>
          <ul class="text-sm text-yellow-800 space-y-1">
            <li>• 避免显示技术细节</li>
            <li>• 提供解决方案建议</li>
            <li>• 显示适当的操作选项</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h4 class="font-medium text-purple-900 mb-2">错误处理最佳实践</h4>
      <ul class="text-sm text-purple-800 space-y-1">
        <li>• 统一错误处理，避免重复代码</li>
        <li>• 区分不同类型的错误，采取不同的处理策略</li>
        <li>• 记录错误日志，便于调试和分析</li>
        <li>• 提供用户友好的错误提示信息</li>
        <li>• 实现适当的重试机制</li>
      </ul>
    </div>

    <div class="p-4 bg-gray-100 rounded-lg">
      <h4 class="font-medium text-gray-900 mb-2">错误统计</h4>
      <div class="text-sm text-gray-700 space-y-1">
        <p>总错误数: {{ errorStats.total }}</p>
        <p>网络错误: {{ errorStats.network }}</p>
        <p>超时错误: {{ errorStats.timeout }}</p>
        <p>服务器错误: {{ errorStats.server }}</p>
        <p>客户端错误: {{ errorStats.client }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface ErrorInfo {
  type: string
  message: string
  details?: string
  timestamp: Date
}

const currentError = ref<ErrorInfo | null>(null)
const successMessage = ref('')

const errorStats = reactive({
  total: 0,
  network: 0,
  timeout: 0,
  server: 0,
  client: 0
})

const addError = (type: string, message: string, details?: string) => {
  currentError.value = {
    type,
    message,
    details,
    timestamp: new Date()
  }
  
  errorStats.total++
  
  switch (type) {
    case 'Network Error':
      errorStats.network++
      break
    case 'Timeout Error':
      errorStats.timeout++
      break
    case 'Server Error':
      errorStats.server++
      break
    case 'Not Found':
    case 'Validation Error':
    case 'Unauthorized':
      errorStats.client++
      break
  }
}

const clearError = () => {
  currentError.value = null
  successMessage.value = ''
}

const retryOperation = () => {
  successMessage = '重试操作成功完成！'
  setTimeout(() => {
    successMessage = ''
  }, 3000)
}

// 模拟不同类型的错误
const triggerNetworkError = async () => {
  try {
    // 模拟网络错误
    await fetch('https://invalid-url-that-does-not-exist.com')
  } catch (error) {
    addError('Network Error', '网络连接失败，请检查您的网络连接', '无法连接到服务器')
  }
}

const triggerTimeoutError = () => {
  // 模拟超时错误
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('请求超时')), 100)
  })
  
  timeoutPromise.catch(() => {
    addError('Timeout Error', '请求超时，请稍后重试', '服务器响应时间过长')
  })
}

const triggerServerError = () => {
  // 模拟服务器错误
  addError('Server Error', '服务器内部错误，请稍后重试', 'HTTP 500 Internal Server Error')
}

const triggerNotFoundError = () => {
  // 模拟404错误
  addError('Not Found', '请求的资源不存在', 'HTTP 404 Not Found')
}

const triggerValidationError = () => {
  // 模拟验证错误
  const errors = [
    '邮箱格式不正确',
    '密码长度不能少于6位',
    '用户名只能包含字母和数字'
  ]
  
  const randomError = errors[Math.floor(Math.random() * errors.length)]
  addError('Validation Error', '表单验证失败', randomError)
}

const triggerUnauthorizedError = () => {
  // 模拟未授权错误
  addError('Unauthorized', '您没有权限执行此操作', '请先登录或联系管理员')
}
</script>