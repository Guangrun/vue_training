<template>
  <div class="space-y-4">
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="$t('pages.components.examples.search.placeholder')"
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </div>
    </div>

    <div class="flex items-center space-x-2">
      <span class="text-sm text-gray-600">{{ $t('pages.components.examples.search.statusLabel') }}</span>
      <span 
        class="px-2 py-1 text-xs rounded-full"
        :class="searchStatus.class"
      >
        {{ searchStatus.text }}
      </span>
    </div>

    <div v-if="searchResults.length > 0" class="space-y-2">
      <h4 class="font-medium text-gray-900">{{ $t('pages.components.examples.search.resultsLabel') }}</h4>
      <div 
        v-for="(result, index) in searchResults" 
        :key="index"
        class="p-3 bg-gray-50 rounded-md"
      >
        {{ result }}
      </div>
    </div>

    <div v-else-if="searchQuery && !isSearching" class="text-gray-500 text-sm">
      {{ $t('pages.components.examples.search.noResults') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const searchQuery = ref('')
const searchResults = ref<string[]>([])
const isSearching = ref(false)

const searchStatus = computed(() => {
  if (isSearching.value) {
    return {
      text: t('pages.components.examples.search.state.searching') as string,
      class: 'bg-yellow-100 text-yellow-800'
    }
  } else if (searchQuery.value) {
    return {
      text: t('pages.components.examples.search.state.done') as string,
      class: 'bg-green-100 text-green-800'
    }
  } else {
    return {
      text: t('pages.components.examples.search.state.waiting') as string,
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
    `${newQuery} - ${t('pages.components.examples.search.mock.resultSuffix')} 1`,
    `${newQuery} - ${t('pages.components.examples.search.mock.resultSuffix')} 2`,
    `${newQuery} - ${t('pages.components.examples.search.mock.resultSuffix')} 3`
  ]
  
  isSearching.value = false
})
</script>
