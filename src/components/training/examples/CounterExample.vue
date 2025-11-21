<template>
  <div class="p-4 bg-gray-50 rounded-lg">
    <div class="flex items-center space-x-4">
      <button
        @click="decrement"
        class="w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
        :disabled="count <= 0"
        :class="{ 'opacity-50 cursor-not-allowed': count <= 0 }"
      >
        -
      </button>
      
      <div class="text-center">
        <div class="text-2xl font-bold text-gray-900">{{ count }}</div>
        <div class="text-sm text-gray-600">Double: {{ doubleCount }}</div>
      </div>
      
      <button
        @click="increment"
        class="w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
      >
        +
      </button>
    </div>
    
    <div class="mt-4 text-center">
      <button
        @click="reset"
        class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
      >
        重置
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

const increment = () => {
  count.value++
}

const decrement = () => {
  if (count.value > 0) {
    count.value--
  }
}

const reset = () => {
  count.value = 0
}
</script>