<template>
  <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between mb-4">
        <div class="flex items-center">
          <span class="text-2xl mr-3">{{ module.icon }}</span>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">{{ $t(`training.modules.${module.id}.title`) }}</h3>
            <p class="text-sm text-gray-500">{{ $t(`training.modules.${module.id}.duration`) }}</p>
          </div>
        </div>
      <DifficultyBadge :level="module.difficulty" />
    </div>
    
    <p class="text-gray-600 mb-6">{{ $t(`training.modules.${module.id}.desc`) }}</p>
    
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div 
          class="w-2 h-2 rounded-full mr-2"
          :class="module.completed ? 'bg-green-500' : 'bg-gray-300'"
        ></div>
        <span class="text-sm text-gray-600">
          {{ module.completed ? $t('training.statusCompleted') : $t('training.statusNotStarted') }}
        </span>
      </div>
      
      <button
        @click="$emit('start', module.id)"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        :disabled="module.completed"
        :class="{ 'opacity-50 cursor-not-allowed': module.completed }"
      >
        {{ module.completed ? $t('training.completed') : $t('training.start') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import DifficultyBadge from './DifficultyBadge.vue'

interface Module {
  id: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  completed: boolean
  icon: string
}

defineProps<{
  module: Module
}>()

defineEmits<{
  start: [moduleId: string]
}>()
</script>
