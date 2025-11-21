<template>
  <div class="bg-white border rounded-lg p-4 hover:shadow-sm transition-shadow">
    <div class="flex items-start justify-between">
      <div class="flex items-start space-x-3">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="$emit('toggle', task.id)"
          class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        >
        <div class="flex-1">
          <h3 
            class="font-medium text-gray-900"
            :class="{ 'line-through text-gray-500': task.completed }"
          >
            {{ task.title }}
          </h3>
          <p 
            class="text-sm text-gray-600 mt-1"
            :class="{ 'line-through text-gray-400': task.completed }"
          >
            {{ task.description }}
          </p>
          <div class="flex items-center space-x-4 mt-2 text-xs text-gray-500">
            <span>创建于: {{ formatDate(task.createdAt) }}</span>
            <span v-if="task.dueDate" :class="{ 'text-red-600': isOverdue }">
              截止: {{ formatDate(task.dueDate) }}
            </span>
          </div>
        </div>
      </div>
      
      <button
        @click="$emit('delete', task.id)"
        class="text-gray-400 hover:text-red-600 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Task {
  id: number
  title: string
  description: string
  completed: boolean
  dueDate?: string
  createdAt: string
}

const props = defineProps<{
  task: Task
}>()

defineEmits<{
  toggle: [id: number]
  delete: [id: number]
}>()

const isOverdue = computed(() => {
  if (!props.task.dueDate || props.task.completed) return false
  return new Date(props.task.dueDate) < new Date()
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN')
}
</script>