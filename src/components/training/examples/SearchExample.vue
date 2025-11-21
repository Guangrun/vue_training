<template>
  <div class="space-y-4">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索内容..."
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
    </div>

    <div class="flex items-center space-x-2">
      <span class="text-sm text-gray-600">搜索状态:</span>
      <span 
        class="px-2 py-1 text-xs rounded-full"
        :class="searchStatus.class"
      >
        {{ searchStatus.text }}
      </span>
    </div>

    <div v-if="searchResults.length > 0" class="space-y-2">
      <h4 class="font-medium text-gray-900">搜索结果:</h4>
      <div 
        v-for="(result, index) in searchResults" 
        :key="index"
        class="p-3 bg-gray-50 rounded-md"
      >
        {{ result }}
      </div>
    </div>

    <div v-else-if="searchQuery && !isSearching" class="text-gray-500 text-sm">
      未找到相关结果
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const searchQuery = ref('')
const searchResults = ref<string[]>([])
const isSearching = ref(false)

const searchStatus = computed(() => {
  if (isSearching.value) {
    return {
      text: '搜索中...',
      class: 'bg-yellow-100 text-yellow-800'
    }
  } else if (searchQuery.value) {
    return {
      text: '搜索完成',
      class: 'bg-green-100 text-green-800'
    }
  } else {
    return {
      text: '等待输入',
      class: 'bg-gray-100 text-gray-800'
    }
  }
})

// 模拟搜索功能
watch(searchQuery, async (newQuery) => {
  if (!newQuery) {
    searchResults.value = []
    return
  }

  isSearching.value = true
  
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 模拟搜索结果
  searchResults.value = [
    `${newQuery} - 相关结果 1`,
    `${newQuery} - 相关结果 2`,
    `${newQuery} - 相关结果 3`
  ]
  
  isSearching.value = false
})
</script>