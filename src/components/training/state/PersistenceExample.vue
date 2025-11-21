<template>
  <div class="space-y-6">
    <div class="text-center p-4 bg-gray-50 rounded-lg">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">主题设置</h3>
      <div class="flex items-center justify-center space-x-4">
        <span class="text-sm text-gray-600">当前主题:</span>
        <span 
          class="px-3 py-1 rounded-full text-sm font-medium"
          :class="themeStore.isDark ? 'bg-gray-800 text-white' : 'bg-blue-100 text-blue-800'"
        >
          {{ themeStore.isDark ? '深色' : '浅色' }}
        </span>
      </div>
    </div>

    <div class="flex justify-center space-x-4">
      <button
        @click="themeStore.toggleTheme"
        class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        切换主题
      </button>
      
      <button
        @click="resetTheme"
        class="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
      >
        重置主题
      </button>
    </div>

    <div class="p-4 border rounded-lg" :class="themeStore.themeClass">
      <h4 class="font-medium mb-3">主题预览区域</h4>
      <p class="text-sm mb-3">这是一个主题预览区域，会随主题变化而改变外观。</p>
      
      <div class="space-y-2">
        <div class="flex items-center space-x-2">
          <input type="checkbox" class="rounded">
          <span class="text-sm">示例复选框</span>
        </div>
        
        <div class="flex space-x-2">
          <button class="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
            主要按钮
          </button>
          <button class="px-3 py-2 border rounded text-sm hover:bg-gray-50">
            次要按钮
          </button>
        </div>
      </div>
    </div>

    <div class="p-4 bg-white border rounded-lg">
      <h4 class="font-medium text-gray-900 mb-3">颜色设置</h4>
      
      <div class="flex items-center space-x-4">
        <label class="text-sm text-gray-600">主色调:</label>
        <input
          v-model="primaryColor"
          type="color"
          class="w-12 h-8 rounded border cursor-pointer"
        >
        <input
          v-model="primaryColor"
          type="text"
          class="flex-1 px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <button
          @click="applyColor"
          class="px-4 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          应用
        </button>
      </div>
      
      <div class="mt-3 flex space-x-2">
        <button
          v-for="color in presetColors"
          :key="color"
          @click="primaryColor = color"
          class="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-400"
          :style="{ backgroundColor: color }"
          :title="color"
        ></button>
      </div>
    </div>

    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h4 class="font-medium text-yellow-900 mb-2">持久化信息</h4>
      <div class="text-sm text-yellow-800 space-y-1">
        <p>主题设置会自动保存到本地存储</p>
        <p>刷新页面后设置会保留</p>
        <p>当前存储的键值:</p>
        <code class="text-xs bg-yellow-100 px-2 py-1 rounded">theme-store</code>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        @click="clearStorage"
        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        清除存储
      </button>
      
      <button
        @click="showStorageInfo = !showStorageInfo"
        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        {{ showStorageInfo ? '隐藏' : '显示' }}存储信息
      </button>
    </div>

    <div v-if="showStorageInfo" class="p-4 bg-gray-100 rounded-lg">
      <h4 class="font-medium text-gray-900 mb-2">存储详情</h4>
      <div class="text-sm text-gray-700 space-y-1">
        <p>深色模式: {{ themeStore.isDark }}</p>
        <p>主色调: {{ themeStore.primaryColor }}</p>
        <p>存储状态: {{ hasStorage ? '已存储' : '未存储' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useThemeStore } from '@/stores/training'

const themeStore = useThemeStore()
const primaryColor = ref(themeStore.primaryColor)
const showStorageInfo = ref(false)
const hasStorage = ref(false)

const presetColors = [
  '#3b82f6', // blue-500
  '#ef4444', // red-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#06b6d4', // cyan-500
  '#84cc16'  // lime-500
]

const resetTheme = () => {
  themeStore.isDark = false
  themeStore.setPrimaryColor('#3b82f6')
  primaryColor.value = '#3b82f6'
}

const applyColor = () => {
  themeStore.setPrimaryColor(primaryColor.value)
}

const clearStorage = () => {
  localStorage.removeItem('theme-store')
  hasStorage.value = false
  alert('主题存储已清除，刷新页面后将恢复默认设置')
}

onMounted(() => {
  hasStorage.value = localStorage.getItem('theme-store') !== null
})
</script>