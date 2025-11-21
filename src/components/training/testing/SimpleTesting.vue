<template>
  <div class="space-y-4">
    <div class="p-4 bg-blue-50 rounded-lg">
      <h3 class="text-lg font-semibold text-blue-900 mb-2">简单测试演示</h3>
      <p class="text-sm text-blue-800">学习Vue.js测试基础知识</p>
    </div>

    <div class="bg-white border rounded-lg p-4">
      <h4 class="font-medium text-gray-900 mb-2">计算器</h4>
      <div class="space-y-2">
        <div class="flex space-x-2">
          <input v-model.number="a" type="number" class="w-20 px-2 py-1 border rounded">
          <span class="self-center">+</span>
          <input v-model.number="b" type="number" class="w-20 px-2 py-1 border rounded">
          <span class="self-center">=</span>
          <span class="self-center font-bold">{{ result }}</span>
        </div>
        <button @click="add" class="px-4 py-2 bg-blue-600 text-white rounded">计算</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const a = ref(0)
const b = ref(0)
const result = computed(() => a.value + b.value)

const add = () => {
  // 简单的加法逻辑
}
</script>