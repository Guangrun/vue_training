<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('admin.settings.title') }}</h2>
    
    <div class="space-y-6">
      <div class="bg-white border rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">{{ $t('admin.settings.basic.title') }}</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('admin.settings.basic.siteTitle') }}</label>
            <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" :value="$t('admin.settings.basic.siteTitleValue')">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('admin.settings.basic.siteDesc') }}</label>
            <textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">{{ $t('admin.settings.basic.siteDescValue') }}</textarea>
          </div>
        </div>
      </div>
      
      <div class="bg-white border rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">{{ $t('admin.settings.advanced.title') }}</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-medium text-gray-900">{{ $t('admin.settings.advanced.debug.title') }}</h4>
              <p class="text-sm text-gray-500">{{ $t('admin.settings.advanced.debug.desc') }}</p>
            </div>
            <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
            </button>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-medium text-gray-900">{{ $t('admin.settings.advanced.cache.title') }}</h4>
              <p class="text-sm text-gray-500">{{ $t('admin.settings.advanced.cache.desc') }}</p>
            </div>
            <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
              <span class="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
            </button>
          </div>
        </div>
      </div>
      
      <div class="flex justify-end space-x-3">
        <button class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          {{ $t('admin.settings.actions.reset') }}
        </button>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          {{ $t('admin.settings.actions.save') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 系统设置组件
</script>
