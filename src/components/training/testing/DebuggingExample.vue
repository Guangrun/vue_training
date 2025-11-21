<template>
  <div class="space-y-6">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">调试技巧演示</h3>
      <p class="text-sm text-blue-800">演示日志、错误捕获与断点思路</p>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white border rounded-lg p-6 space-y-3">
        <h4 class="text-lg font-medium text-gray-900">日志与错误</h4>
        <div class="flex flex-wrap gap-3">
          <button @click="logInfo" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">打印信息</button>
          <button @click="logWarn" class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">打印警告</button>
          <button @click="triggerError" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">触发错误</button>
        </div>
        <div class="mt-3 text-sm text-gray-600">错误将通过父组件捕获并记录</div>
      </div>

      <div class="bg-white border rounded-lg p-6 space-y-3">
        <h4 class="text-lg font-medium text-gray-900">错误捕获演示</h4>
        <ErrorChild @error-happened="onChildError" />
        <div class="text-sm text-gray-600">点击子组件内部按钮可抛出错误</div>
      </div>
    </div>

    <div class="bg-white border rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-3">调试日志</h4>
      <div v-if="logs.length === 0" class="text-gray-500 text-sm">暂无日志</div>
      <div v-else class="space-y-1 max-h-60 overflow-y-auto">
        <div v-for="(l, i) in logs" :key="i" class="text-sm">
          <span class="font-mono text-gray-500">{{ l.time }}</span>
          <span class="mx-2">•</span>
          <span :class="typeClass(l.type)" class="font-medium">{{ l.type }}</span>
          <span class="mx-2">—</span>
          <span class="text-gray-800">{{ l.message }}</span>
        </div>
      </div>
      <div class="mt-3">
        <button @click="clear" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">清除日志</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onErrorCaptured, ref, h } from 'vue'

const logs = ref<Array<{ time: string; type: 'info' | 'warn' | 'error' | 'capture'; message: string }>>([])

const push = (type: 'info' | 'warn' | 'error' | 'capture', message: string) => {
  logs.value.unshift({ time: new Date().toLocaleTimeString(), type, message })
}

const logInfo = () => {
  console.info('[INFO] 这是一条信息日志')
  push('info', '打印信息')
}

const logWarn = () => {
  console.warn('[WARN] 这是一条警告日志')
  push('warn', '打印警告')
}

const triggerError = () => {
  try {
    throw new Error('人为触发的错误')
  } catch (e) {
    console.error(e)
    push('error', (e as Error).message)
  }
}

const clear = () => {
  logs.value = []
}

const typeClass = (t: string) => {
  if (t === 'info') return 'text-blue-700'
  if (t === 'warn') return 'text-yellow-700'
  if (t === 'error') return 'text-red-700'
  return 'text-purple-700'
}

const onChildError = (msg: string) => {
  push('capture', msg)
}

onErrorCaptured((err) => {
  push('capture', (err as Error).message)
  return false
})

const ErrorChild = defineComponent({
  name: 'ErrorChild',
  emits: ['error-happened'],
  setup(_, { emit }) {
    const raise = () => {
      try {
        throw new Error('子组件抛出的错误')
      } catch (e) {
        emit('error-happened', (e as Error).message)
        throw e
      }
    }
    return () => h(
      'button',
      {
        class: 'px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700',
        onClick: raise
      },
      '子组件触发错误'
    )
  }
})
</script>
