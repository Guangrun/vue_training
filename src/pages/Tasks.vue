<template>
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('pages.tasks.title') }}</h1>
      <p class="text-gray-600">{{ $t('pages.tasks.subtitle') }}</p>
    </div>

    <div class="grid lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">{{ $t('pages.tasks.metrics.total') }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.total }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">{{ $t('pages.tasks.metrics.inProgress') }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.inProgress }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">{{ $t('pages.tasks.metrics.completed') }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.completed }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm border">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">{{ $t('pages.tasks.metrics.overdue') }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats.overdue }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm border">
      <div class="p-6 border-b">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">{{ $t('pages.tasks.list.title') }}</h2>
          <button 
            @click="showAddTask = true"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            {{ $t('pages.tasks.list.add') }}
          </button>
        </div>
      </div>

      <div class="p-6">
        <div v-if="tasks.length === 0" class="text-center py-12">
          <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          <p class="text-gray-500">{{ $t('pages.tasks.list.empty') }}</p>
        </div>

        <div v-else class="space-y-4">
          <TaskItem
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @toggle="toggleTask"
            @delete="deleteTask"
          />
        </div>
      </div>
    </div>

    <!-- 添加任务模态框 -->
    <div v-if="showAddTask" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ $t('pages.tasks.modal.addTitle') }}</h3>
        <form @submit.prevent="addTask">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('pages.tasks.modal.titleLabel') }}</label>
            <input
              v-model="newTask.title"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('pages.tasks.modal.descLabel') }}</label>
            <textarea
              v-model="newTask.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">{{ $t('pages.tasks.modal.dueLabel') }}</label>
            <input
              v-model="newTask.dueDate"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showAddTask = false"
              class="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              {{ $t('pages.tasks.modal.cancel') }}
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {{ $t('pages.tasks.modal.confirm') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import TaskItem from '@/components/tasks/TaskItem.vue'

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  dueDate?: string
  createdAt: string
}

const tasks = ref<Task[]>([
  {
    id: 1,
    title: '学习Vue 3 Composition API',
    description: '掌握ref、reactive、computed等核心概念',
    completed: true,
    dueDate: '2024-01-15',
    createdAt: '2024-01-10'
  },
  {
    id: 2,
    title: '实现任务管理功能',
    description: '创建一个完整的任务管理系统',
    completed: false,
    dueDate: '2024-01-20',
    createdAt: '2024-01-12'
  },
  {
    id: 3,
    title: '学习Pinia状态管理',
    description: '使用Pinia管理应用状态',
    completed: false,
    dueDate: '2024-01-25',
    createdAt: '2024-01-14'
  }
])

const showAddTask = ref(false)
const newTask = ref({
  title: '',
  description: '',
  dueDate: ''
})

const stats = computed(() => {
  const total = tasks.value.length
  const completed = tasks.value.filter(task => task.completed).length
  const inProgress = total - completed
  const overdue = tasks.value.filter(task => {
    if (!task.dueDate || task.completed) return false
    return new Date(task.dueDate) < new Date()
  }).length

  return {
    total,
    completed,
    inProgress,
    overdue
  }
})

const addTask = () => {
  if (!newTask.value.title.trim()) return

  const task: Task = {
    id: Date.now(),
    title: newTask.value.title,
    description: newTask.value.description,
    completed: false,
    dueDate: newTask.value.dueDate || undefined,
    createdAt: new Date().toISOString().split('T')[0]
  }

  tasks.value.push(task)
  
  // 重置表单
  newTask.value = {
    title: '',
    description: '',
    dueDate: ''
  }
  showAddTask.value = false
}

const toggleTask = (id: number) => {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.completed = !task.completed
  }
}

const deleteTask = (id: number) => {
  tasks.value = tasks.value.filter(task => task.id !== id)
}
</script>
