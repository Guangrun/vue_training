<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('pages.taskDetail.title') }}</h1>
      <div class="flex items-center space-x-4">
        <button
          @click="goBack"
          class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          {{ $t('pages.taskDetail.back') }}
        </button>
        <router-link
          to="/tasks"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {{ $t('pages.taskDetail.list') }}
        </router-link>
      </div>
    </div>

    <div v-if="task" class="bg-white rounded-lg shadow-sm border p-6">
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-2xl font-bold text-gray-900">{{ task.title }}</h2>
          <span 
            class="px-3 py-1 text-sm font-medium rounded-full"
            :class="task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
          >
            {{ task.completed ? $t('pages.taskDetail.status.completed') : $t('pages.taskDetail.status.inProgress') }}
          </span>
        </div>
        
        <p class="text-gray-600 mb-4">{{ task.description }}</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span class="font-medium">{{ $t('pages.taskDetail.meta.createdAt') }}</span>
            {{ formatDate(task.createdAt) }}
          </div>
          <div v-if="task.dueDate">
            <span class="font-medium">{{ $t('pages.taskDetail.meta.dueDate') }}</span>
            {{ formatDate(task.dueDate) }}
          </div>
          <div>
            <span class="font-medium">{{ $t('pages.taskDetail.meta.id') }}</span>
            {{ task.id }}
          </div>
          <div>
            <span class="font-medium">{{ $t('pages.taskDetail.meta.status') }}</span>
            {{ task.completed ? '已完成' : '进行中' }}
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <button
          @click="toggleTask"
          class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {{ task.completed ? $t('pages.taskDetail.actions.markIncomplete') : $t('pages.taskDetail.actions.markComplete') }}
        </button>
        
        <button
          @click="deleteTask"
          class="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          {{ $t('pages.taskDetail.actions.delete') }}
        </button>
      </div>
    </div>

    <div v-else class="bg-white rounded-lg shadow-sm border p-6 text-center">
      <div class="text-gray-500 mb-4">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">{{ $t('pages.taskDetail.notFound.title') }}</h3>
        <p class="text-gray-600">{{ $t('pages.taskDetail.notFound.desc', { id: $route.params.id }) }}</p>
      </div>
      
      <router-link
        to="/tasks"
        class="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        {{ $t('pages.taskDetail.notFound.backToList') }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/tasks'

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  dueDate?: string
  createdAt: string
}

const router = useRouter()
const route = useRoute()
const taskStore = useTaskStore()

const task = computed(() => {
  const id = Number(route.params.id)
  return taskStore.tasks.find(t => t.id === id)
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const goBack = () => {
  router.back()
}

const toggleTask = () => {
  if (task.value) {
    taskStore.toggleTask(task.value.id)
  }
}

const deleteTask = () => {
  if (task.value) {
    if (confirm('确定要删除这个任务吗？')) {
      taskStore.deleteTask(task.value.id)
      router.push('/tasks')
    }
  }
}

onMounted(() => {
  console.log('任务详情页面加载，任务ID:', route.params.id)
})
</script>
