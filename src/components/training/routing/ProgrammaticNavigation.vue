<template>
  <div class="space-y-6">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">{{ $t('pages.router.programmatic.title') }}</h3>
      <p class="text-sm text-blue-800">{{ $t('pages.router.programmatic.desc') }}</p>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">{{ $t('pages.router.programmatic.basic.title') }}</h4>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          @click="goHome"
          class="p-3 bg-white border rounded-md hover:bg-gray-50 text-left transition-colors"
        >
          <div class="font-medium text-gray-900">{{ $t('pages.router.programmatic.basic.toHome') }}</div>
          <div class="text-sm text-gray-600">router.push('/')</div>
        </button>

        <button
          @click="goTasks"
          class="p-3 bg-white border rounded-md hover:bg-gray-50 text-left transition-colors"
        >
          <div class="font-medium text-gray-900">{{ $t('pages.router.programmatic.basic.toTasks') }}</div>
          <div class="text-sm text-gray-600">router.push('/tasks')</div>
        </button>

        <button
          @click="goTraining"
          class="p-3 bg-white border rounded-md hover:bg-gray-50 text-left transition-colors"
        >
          <div class="font-medium text-gray-900">{{ $t('pages.router.programmatic.basic.toTraining') }}</div>
          <div class="text-sm text-gray-600">router.push('/training')</div>
        </button>

        <button
          @click="goBack"
          class="p-3 bg-white border rounded-md hover:bg-gray-50 text-left transition-colors"
        >
          <div class="font-medium text-gray-900">{{ $t('pages.router.programmatic.basic.back') }}</div>
          <div class="text-sm text-gray-600">router.back()</div>
        </button>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">{{ $t('pages.router.programmatic.params.title') }}</h4>
      
      <div class="space-y-3">
        <div class="flex space-x-3">
          <input
            v-model.number="taskId"
            type="number"
            :placeholder="$t('pages.router.programmatic.params.taskIdPlaceholder')"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <button
            @click="goToTask"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {{ $t('pages.router.programmatic.params.viewTask') }}
          </button>
        </div>

        <div class="flex space-x-3">
          <input
            v-model="queryParam"
            type="text"
            :placeholder="$t('pages.router.programmatic.params.queryPlaceholder')"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <button
            @click="goToSearch"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {{ $t('pages.router.programmatic.params.search') }}
          </button>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">{{ $t('pages.router.programmatic.advanced.title') }}</h4>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          @click="goWithReplace"
          class="p-3 bg-white border rounded-md hover:bg-gray-50 text-left transition-colors"
        >
          <div class="font-medium text-gray-900">{{ $t('pages.router.programmatic.advanced.replace') }}</div>
          <div class="text-sm text-gray-600">router.replace('/training')</div>
        </button>

        <button
          @click="goWithQuery"
          class="p-3 bg-white border rounded-md hover:bg-gray-50 text-left transition-colors"
        >
          <div class="font-medium text-gray-900">{{ $t('pages.router.programmatic.advanced.withQuery') }}</div>
          <div class="text-sm text-gray-600">router.push({ query: {...} })</div>
        </button>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">{{ $t('pages.router.programmatic.history.title') }}</h4>
      
      <div class="flex space-x-3">
        <button
          @click="goForward"
          class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          {{ $t('pages.router.programmatic.history.forward') }}
        </button>
        <button
          @click="goBack"
          class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          {{ $t('pages.router.programmatic.history.back') }}
        </button>
        <button
          @click="goHistory"
          class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
        >
          {{ $t('pages.router.programmatic.history.goToStep3') }}
        </button>
      </div>
    </div>

    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="font-medium text-green-900 mb-2">{{ $t('pages.router.programmatic.help.title') }}</h4>
      <ul class="text-sm text-green-800 space-y-1">
        <li>• <strong>push:</strong> {{ $t('pages.router.programmatic.help.items.push') }}</li>
        <li>• <strong>replace:</strong> {{ $t('pages.router.programmatic.help.items.replace') }}</li>
        <li>• <strong>back:</strong> {{ $t('pages.router.programmatic.help.items.back') }}</li>
        <li>• <strong>go:</strong> {{ $t('pages.router.programmatic.help.items.go') }}</li>
      </ul>
    </div>

    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h4 class="font-medium text-yellow-900 mb-2">{{ $t('pages.router.programmatic.info.title') }}</h4>
      <div class="text-sm text-yellow-800 space-y-1">
        <p>{{ $t('pages.router.programmatic.info.currentPath') }} {{ $route.path }}</p>
        <p>{{ $t('pages.router.programmatic.info.historyLength') }} {{ historyLength }}</p>
        <p>{{ $t('pages.router.programmatic.info.canBack') }} {{ canGoBack ? $t('common.yes') : $t('common.no') }}</p>
        <p>{{ $t('pages.router.programmatic.info.canForward') }} {{ canGoForward ? $t('common.yes') : $t('common.no') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const taskId = ref<number | null>(null)
const queryParam = ref('')

const historyLength = ref(window.history.length)
const canGoBack = computed(() => window.history.state?.position > 0)
const canGoForward = computed(() => {
  const currentPos = window.history.state?.position || 0
  return currentPos < historyLength.value - 1
})

// 基本导航
const goHome = () => {
  router.push('/')
}

const goTasks = () => {
  router.push('/tasks')
}

const goTraining = () => {
  router.push('/training')
}

const goBack = () => {
  router.back()
}

const goForward = () => {
  router.forward()
}

// 带参数的导航
const goToTask = () => {
  if (taskId.value) {
    router.push(`/task/${taskId.value}`)
  }
}

const goToSearch = () => {
  if (queryParam.value) {
    router.push({
      path: '/tasks',
      query: { search: queryParam.value }
    })
  }
}

// 高级导航
const goWithReplace = () => {
  router.replace('/training')
}

const goWithQuery = () => {
  router.push({
    path: '/tasks',
    query: {
      filter: 'completed',
      sort: 'date',
      page: '1'
    }
  })
}

const goHistory = () => {
  router.go(-3) // 后退3步
}
</script>
