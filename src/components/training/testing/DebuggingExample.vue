<template>
  <div class="space-y-6">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">{{ $t('pages.testing.debugDemo.title') }}</h3>
      <p class="text-sm text-blue-800">{{ $t('pages.testing.debugDemo.desc') }}</p>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div class="bg-white border rounded-lg p-6 space-y-3">
        <h4 class="text-lg font-medium text-gray-900">{{ $t('pages.testing.debugDemo.title') }}</h4>
        <div class="flex flex-wrap gap-3">
          <button @click="logInfo" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">{{ $t('pages.testing.debugDemo.logInfo') }}</button>
          <button @click="logWarn" class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">{{ $t('pages.testing.debugDemo.logWarn') }}</button>
          <button @click="triggerError" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">{{ $t('pages.testing.debugDemo.triggerError') }}</button>
        </div>
        <div class="mt-3 text-sm text-gray-600">错误将通过父组件捕获并记录</div>
      </div>

      <div class="bg-white border rounded-lg p-6 space-y-3">
        <h4 class="text-lg font-medium text-gray-900">{{ $t('pages.testing.debugDemo.errorCaptureTitle') }}</h4>
        <ErrorChild @error-happened="onChildError" />
        <div class="text-sm text-gray-600">点击子组件内部按钮可抛出错误</div>
      </div>
    </div>

    <div class="bg-white border rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-3">{{ $t('pages.testing.debugDemo.logsTitle') }}</h4>
      <div v-if="logs.length === 0" class="text-gray-500 text-sm">{{ $t('pages.testing.debugDemo.noLogs') }}</div>
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
        <button @click="clear" class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700">{{ $t('pages.testing.debugDemo.clearLogs') }}</button>
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
      (typeof window !== 'undefined' ? (window as any).$t?.('pages.testing.debugDemo.childErrorButton') : 'Child Error')
    )
  }
})
</script>
