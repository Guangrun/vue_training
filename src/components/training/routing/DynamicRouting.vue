<template>
  <div class="space-y-6">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">{{ $t('pages.router.dynamic.title') }}</h3>
      <p class="text-sm text-blue-800">{{ $t('pages.router.dynamic.desc') }}</p>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">{{ $t('pages.router.dynamic.tasks.title') }}</h4>
      
      <div class="grid gap-2">
        <router-link 
          v-for="task in tasks" 
          :key="task.id"
          :to="`/task/${task.id}`"
          class="block p-4 bg-white border rounded-md hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div>
              <h5 class="font-medium text-gray-900">{{ task.title }}</h5>
              <p class="text-sm text-gray-600 mt-1">{{ task.description }}</p>
            </div>
            <div class="text-right">
              <span 
                class="px-2 py-1 text-xs rounded-full"
                :class="task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
              >
                {{ task.completed ? $t('pages.router.dynamic.tasks.status.completed') : $t('pages.router.dynamic.tasks.status.inProgress') }}
              </span>
              <div class="text-xs text-gray-500 mt-1">
                ID: {{ task.id }}
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div class="space-y-4">
      <h4 class="font-medium text-gray-900">{{ $t('pages.router.dynamic.tasks.manualTitle') }}</h4>
      
      <div class="flex space-x-3">
        <input
          v-model.number="manualTaskId"
          type="number"
            :placeholder="$t('pages.router.dynamic.tasks.inputPlaceholder')"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <button
          @click="goToTask"
          :disabled="!manualTaskId"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ $t('pages.router.dynamic.tasks.go') }}
        </button>
      </div>
    </div>

    <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 class="font-medium text-green-900 mb-2">{{ $t('pages.router.dynamic.help.title') }}</h4>
      <ul class="text-sm text-green-800 space-y-1">
        <li>• {{ $t('pages.router.dynamic.help.items.param') }}</li>
        <li>• {{ $t('pages.router.dynamic.help.items.getParam') }}</li>
        <li>• {{ $t('pages.router.dynamic.help.items.props') }}</li>
        <li>• {{ $t('pages.router.dynamic.help.items.multi') }}</li>
      </ul>
    </div>

    <div v-if="$route.params.id" class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h4 class="font-medium text-yellow-900 mb-2">{{ $t('pages.router.dynamic.info.title') }}</h4>
      <div class="text-sm text-yellow-800">
        <p>{{ $t('pages.router.dynamic.info.taskId') }} {{ $route.params.id }}</p>
        <p>{{ $t('pages.router.dynamic.info.fullPath') }} {{ $route.path }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

const router = useRouter()
const manualTaskId = ref<number | null>(null)

const tasks: Task[] = [
  {
    id: 1,
    title: '学习Vue 3 Composition API',
    description: '掌握ref、reactive、computed等核心概念',
    completed: true
  },
  {
    id: 2,
    title: '实现任务管理功能',
    description: '创建一个完整的任务管理系统',
    completed: false
  },
  {
    id: 3,
    title: '学习Pinia状态管理',
    description: '使用Pinia管理应用状态',
    completed: false
  },
  {
    id: 4,
    title: '掌握Vue Router',
    description: '学习路由配置和导航守卫',
    completed: true
  },
  {
    id: 5,
    title: '完成项目部署',
    description: '将应用部署到生产环境',
    completed: false
  }
]

const goToTask = () => {
  if (manualTaskId.value) {
    router.push(`/task/${manualTaskId.value}`)
  }
}
</script>
