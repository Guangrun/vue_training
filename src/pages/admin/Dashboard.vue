<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('admin.dashboard.title') }}</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-blue-100 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-blue-900">{{ $t('admin.dashboard.cards.totalUsers') }}</h3>
        <p class="text-2xl font-bold text-blue-600">1,234</p>
      </div>
      <div class="bg-green-100 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-green-900">{{ $t('admin.dashboard.cards.activeUsers') }}</h3>
        <p class="text-2xl font-bold text-green-600">856</p>
      </div>
      <div class="bg-yellow-100 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-yellow-900">{{ $t('admin.dashboard.cards.visitsToday') }}</h3>
        <p class="text-2xl font-bold text-yellow-600">432</p>
      </div>
    </div>
    
    <div class="mt-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">{{ $t('admin.dashboard.recent.title') }}</h3>
      <div class="space-y-2">
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
          <span class="text-sm text-gray-600">{{ $t('admin.dashboard.recent.login') }}</span>
          <span class="text-xs text-gray-500">{{ $t('admin.dashboard.recent.minutes2') }}</span>
        </div>
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
          <span class="text-sm text-gray-600">{{ $t('admin.dashboard.recent.createTask') }}</span>
          <span class="text-xs text-gray-500">{{ $t('admin.dashboard.recent.minutes5') }}</span>
        </div>
        <div class="flex items-center justify-between p-3 bg-gray-50 rounded">
          <span class="text-sm text-gray-600">{{ $t('admin.dashboard.recent.dataUpdate') }}</span>
          <span class="text-xs text-gray-500">{{ $t('admin.dashboard.recent.minutes10') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 管理仪表板组件
</script>
