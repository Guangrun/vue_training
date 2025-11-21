<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ $t('pages.state.title') }}</h1>
      <p class="text-gray-600">{{ $t('pages.state.subtitle') }}</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8">
      <!-- 基础状态管理 -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.state.basic.title') }}</h2>
        <StateBasics />
      </div>

      <!-- Getters和Actions -->
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.state.gettersActions.title') }}</h2>
        <GettersActions />
      </div>
    </div>

    <!-- 模块化状态 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.state.modules.title') }}</h2>
      <ModuleExample />
    </div>

    <!-- 状态持久化 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('pages.state.persistence.title') }}</h2>
      <PersistenceExample />
    </div>

    <!-- 页面设计与资源 -->
    <div class="bg-white rounded-lg shadow-sm border p-6 mt-8">
      <h2 class="text-xl font-semibold text-gray-900 mb-3">{{ $t('pages.state.design.title') }}</h2>
      <p class="text-gray-600 mb-4">{{ $t('pages.state.design.description') }}</p>
      <ul class="text-sm text-gray-700 list-disc pl-5 space-y-1">
        <li>{{ $t('pages.state.design.points.boundaries') }}</li>
        <li>{{ $t('pages.state.design.points.typing') }}</li>
        <li>{{ $t('pages.state.design.points.purity') }}</li>
        <li>{{ $t('pages.state.design.points.async') }}</li>
        <li>{{ $t('pages.state.design.points.persistence') }}</li>
      </ul>
      <div class="mt-4 space-x-3">
        <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800">{{ $t('pages.state.design.links.piniaDocs') }}</a>
        <a href="https://vuejs.org/guide/extras/reactivity-in-depth.html" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800">{{ $t('pages.state.design.links.vueReactivity') }}</a>
        <a href="https://vuejs.org/guide/scaling-up/state-management.html" target="_blank" rel="noopener" class="text-blue-600 hover:text-blue-800">{{ $t('pages.state.design.links.statePatterns') }}</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StateBasics from '@/components/training/state/StateBasics.vue'
import GettersActions from '@/components/training/state/GettersActions.vue'
import ModuleExample from '@/components/training/state/ModuleExample.vue'
import PersistenceExample from '@/components/training/state/PersistenceExample.vue'
</script>
